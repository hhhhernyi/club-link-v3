import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const S = {
  bg:       'var(--bg)',
  surface:  'var(--surface)',
  border:   'var(--border)',
  accent:   'var(--accent)',
  accentGlow: 'var(--accent-glow)',
  danger:   'var(--danger)',
  text:     'var(--text)',
  textDim:  'var(--text-dim)',
  fontHead: "'Dela Gothic One', system-ui, sans-serif",
  fontBody: "'DM Sans', system-ui, sans-serif",
  radius:   '12px',
  radiusLg: '20px',
};

export default function ContactPage() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    const mailtoSubject = encodeURIComponent(subject.trim() || 'Club Link Feedback');
    const mailtoBody    = encodeURIComponent(message.trim());
    window.location.href = `mailto:hyileenet@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
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

          <button
            onClick={handleSend}
            disabled={!message.trim()}
            style={{
              background: message.trim() ? S.accent : S.border,
              color: message.trim() ? '#000' : S.textDim,
              fontFamily: S.fontHead, fontSize: '1rem',
              padding: '14px 0', borderRadius: S.radius,
              border: 'none', cursor: message.trim() ? 'pointer' : 'not-allowed',
              boxShadow: message.trim() ? `0 0 24px ${S.accentGlow}` : 'none',
              transition: '200ms',
              width: '100%',
            }}
            onMouseEnter={e => { if (message.trim()) e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Send via Email
          </button>

          <p style={{ fontFamily: S.fontBody, fontSize: '0.78rem', color: S.textDim, textAlign: 'center', lineHeight: 1.4 }}>
            This opens your email client with the message pre-filled.
          </p>
        </div>
      </div>
    </div>
  );
}
