import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const S = {
  bg:         'var(--bg)',
  surface:    'var(--surface)',
  border:     'var(--border)',
  accent:     'var(--accent)',
  accentGlow: 'var(--accent-glow)',
  danger:     'var(--danger)',
  text:       'var(--text)',
  textDim:    'var(--text-dim)',
  fontHead:   "'Dela Gothic One', system-ui, sans-serif",
  fontBody:   "'DM Sans', system-ui, sans-serif",
  radius:     '12px',
  radiusLg:   '20px',
};

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string;

export default function ContactPage() {
  const navigate = useNavigate();
  const [subject,  setSubject]  = useState('');
  const [message,  setMessage]  = useState('');
  const [sending,  setSending]  = useState(false);
  const [sent,     setSent]     = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  const handleSend = async () => {
    if (!message.trim() || sending) return;
    if (!WEB3FORMS_KEY) {
      setError('Contact form not configured (missing API key).');
      return;
    }
    setSending(true);
    setError(null);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject:    subject.trim() || 'Club Link Feedback',
          message:    message.trim(),
          name:       'Club Link User',
          botcheck:   false,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        setError(data.message ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Failed to send. Check your connection and try again.');
    } finally {
      setSending(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: S.surface,
    border: `1px solid ${S.border}`,
    borderRadius: S.radius,
    color: S.text,
    fontFamily: S.fontBody,
    fontSize: '0.95rem',
    padding: '12px 14px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: '150ms',
  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (sent) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: '100vh', background: S.bg,
        padding: '2rem 1.5rem', gap: 24, textAlign: 'center',
        animation: 'fadeIn 0.3s ease',
      }}>
        <span style={{ fontSize: '3.5rem' }}>✅</span>
        <h2 style={{ fontFamily: S.fontHead, fontSize: '2rem', color: S.text }}>
          Message Sent!
        </h2>
        <p style={{ fontFamily: S.fontBody, fontSize: '0.95rem', color: S.textDim, maxWidth: 300, lineHeight: 1.5 }}>
          Thanks for the feedback — I'll read it and get back to you if needed.
        </p>
        <button
          onClick={() => navigate('/')}
          style={{
            background: S.accent, color: '#000', fontFamily: S.fontHead,
            fontSize: '1rem', padding: '14px 40px', borderRadius: S.radius,
            border: 'none', cursor: 'pointer', boxShadow: `0 0 24px ${S.accentGlow}`,
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Back to Home
        </button>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      minHeight: '100vh', background: S.bg, padding: '1.5rem',
      animation: 'fadeIn 0.3s ease',
    }}>
      <div style={{ width: '100%', maxWidth: 500, marginBottom: 20 }}>
        <button
          onClick={() => navigate('/')}
          style={{ background: 'none', border: 'none', color: S.textDim, fontFamily: S.fontBody, fontSize: '0.9rem', cursor: 'pointer', padding: 0 }}
          onMouseEnter={e => (e.currentTarget.style.color = S.text)}
          onMouseLeave={e => (e.currentTarget.style.color = S.textDim)}
        >
          ← Back
        </button>
      </div>

      <div style={{ width: '100%', maxWidth: 500, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: S.fontHead, fontSize: '2rem', color: S.text, marginBottom: 8 }}>
            Send Feedback
          </h1>
          <p style={{ fontFamily: S.fontBody, fontSize: '0.9rem', color: S.textDim, lineHeight: 1.5 }}>
            Found a bug? Have a suggestion? I'd love to hear from you.
          </p>
        </div>

        <div style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: S.radiusLg, padding: '24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontFamily: S.fontBody, fontSize: '0.8rem', fontWeight: 600, color: S.textDim, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Subject (optional)
            </label>
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="e.g. Bug report, Feature idea…"
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = S.accent)}
              onBlur={e => (e.currentTarget.style.borderColor = S.border)}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontFamily: S.fontBody, fontSize: '0.8rem', fontWeight: 600, color: S.textDim, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Message
            </label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Tell me what's on your mind…"
              rows={6}
              style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
              onFocus={e => (e.currentTarget.style.borderColor = S.accent)}
              onBlur={e => (e.currentTarget.style.borderColor = S.border)}
            />
          </div>

          {error && (
            <p style={{ fontFamily: S.fontBody, fontSize: '0.85rem', color: S.danger }}>{error}</p>
          )}

          <button
            onClick={handleSend}
            disabled={!message.trim() || sending}
            style={{
              background: message.trim() && !sending ? S.accent : S.border,
              color: message.trim() && !sending ? '#000' : S.textDim,
              fontFamily: S.fontHead, fontSize: '1rem',
              padding: '14px 0', borderRadius: S.radius,
              border: 'none', cursor: message.trim() && !sending ? 'pointer' : 'not-allowed',
              boxShadow: message.trim() && !sending ? `0 0 24px ${S.accentGlow}` : 'none',
              transition: '200ms', width: '100%',
            }}
            onMouseEnter={e => { if (message.trim() && !sending) e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {sending ? 'Sending…' : 'Send Message'}
          </button>
        </div>
      </div>
    </div>
  );
}
