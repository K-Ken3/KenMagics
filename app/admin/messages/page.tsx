import { deleteMessage, updateMessage } from '../actions';
import { createClient } from '@/lib/supabase/server';

export const metadata = { title: 'Messages — Admin' };

export default async function AdminMessages() {
  const supabase = await createClient();
  const { data } = supabase
    ? await supabase.from('messages').select('*').order('created_at', { ascending: false }).limit(200)
    : { data: null };

  return (
    <section className="admin-page">
      <header className="admin-head">
        <p className="label">Inbox</p>
        <h1 className="serif">Messages</h1>
      </header>
      {data?.length ? (
        <ul className="admin-messages">
          {data.map((message) => (
            <li key={message.id} className={message.status === 'new' ? 'admin-message--new' : undefined}>
              <div className="admin-message__head">
                <strong>{message.name}</strong>
                <span className="label">{new Date(message.created_at).toLocaleString()}</span>
                <span className="admin-badge label">{message.status}</span>
                {message.is_spam ? <span className="admin-badge label">spam</span> : null}
              </div>
              <a href={`mailto:${message.email}`}>{message.email}</a>
              <p className="label">{message.service} · {message.budget || 'No budget given'}</p>
              <p className="admin-message__body">{message.message}</p>
              <div className="admin-message__actions">
                <form action={updateMessage}>
                  <input type="hidden" name="id" value={message.id} />
                  <input type="hidden" name="status" value="read" />
                  <button type="submit">Mark read</button>
                </form>
                <form action={updateMessage}>
                  <input type="hidden" name="id" value={message.id} />
                  <input type="hidden" name="status" value="archived" />
                  <button type="submit">Archive</button>
                </form>
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={message.id} />
                  <button type="submit" className="admin-danger">Delete</button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="admin-empty">No messages yet.</p>
      )}
    </section>
  );
}
