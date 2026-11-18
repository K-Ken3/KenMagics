'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = createClient();
    if (!supabase) return;
    setStatus('sending');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    if (error) {
      setStatus('error');
      setMessage(error.message);
    } else {
      setStatus('sent');
      setMessage('Check your inbox for a magic link.');
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <label>
        <span className="label">Authorised email</span>
        <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
      </label>
      <button className="button" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending link…' : 'Send magic link'}
      </button>
      <p className="admin-note" role="status">{message}</p>
    </form>
  );
}
