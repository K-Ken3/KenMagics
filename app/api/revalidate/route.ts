import { NextResponse } from 'next/server';
import { revalidatePortfolio } from '@/lib/revalidate';

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ error: 'Revalidation is not configured.' }, { status: 503 });

  const supplied = request.headers.get('x-revalidate-secret');
  if (supplied !== secret) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  revalidatePortfolio();
  return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
}
