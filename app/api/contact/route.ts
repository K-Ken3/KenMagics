import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import { getAnonKey, getSupabaseUrl, hasPublicSupabaseEnv } from '@/lib/supabase/env';

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  service: z.string().min(1).max(160),
  budget: z.string().max(80).optional().default(''),
  message: z.string().min(10).max(5000),
  company: z.string().max(200).optional().default(''),
});

const MAX_PER_TEN_MINUTES = 3;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please check the form fields.' }, { status: 400 });
  }
  const { company, ...data } = parsed.data;

  // Honeypot: bots fill the hidden field; real users never see it.
  if (company.trim()) return NextResponse.json({ ok: true });

  if (!hasPublicSupabaseEnv) {
    return NextResponse.json({ error: 'Contact form is not configured yet. Email the address above.' }, { status: 503 });
  }

  const supabase = createClient(getSupabaseUrl(), getAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const forwarded = request.headers.get('x-forwarded-for') ?? 'unknown';
  const ipHash = createHash('sha256').update(forwarded.split(',')[0].trim()).digest('hex');

  const { data: recent, error: countError } = await supabase.rpc('recent_message_count', { p_ip_hash: ipHash });
  if (countError) {
    console.error('[contact] rate-limit lookup failed:', countError.message);
  } else if (Number(recent ?? 0) >= MAX_PER_TEN_MINUTES) {
    return NextResponse.json({ error: 'Too many messages. Please try again in ten minutes.' }, { status: 429 });
  }

  const { error } = await supabase.rpc('submit_message', {
    p_name: data.name,
    p_email: data.email,
    p_service: data.service,
    p_budget: data.budget,
    p_message: data.message,
    p_company: company,
    p_ip_hash: ipHash,
  });
  if (error) {
    console.error('[contact] insert failed:', error.message);
    return NextResponse.json({ error: 'Could not save your message. Please email the address above.' }, { status: 500 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (resendKey && to) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL ?? 'KenDesigns <onboarding@resend.dev>',
        to,
        replyTo: data.email,
        subject: `New portfolio message — ${data.service}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Service: ${data.service}`,
          `Budget: ${data.budget || 'not specified'}`,
          '',
          data.message,
        ].join('\n'),
      });
    } catch (caught) {
      console.error('[contact] notification failed:', caught);
    }
  }

  return NextResponse.json({ ok: true });
}
