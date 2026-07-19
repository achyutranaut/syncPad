import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useOwnerId } from '../hooks/useOwnerId';
import ThemeToggle from '../components/ThemeToggle';
import NameBadge from '../components/NameBadge';

function Dashboard() {
  const [docs, setDocs] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const ownerId = useOwnerId();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/docs?ownerId=${ownerId}`)
      .then((res) => res.json())
      .then(setDocs)
      .catch((err) => console.error('Failed to load docs:', err));
  }, [ownerId]);

  const handleCreate = () => {
    const roomId = newRoomName.trim() || crypto.randomUUID().slice(0, 8);
    navigate(`/doc/${roomId}`);
  };

  return (
    <div className="relative min-h-screen text-[var(--text)] font-body">
      <div className="aurora-bg" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">

        <div className="flex justify-end items-center gap-3 pt-6">
          <NameBadge />
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        <div className="pt-12 pb-16 relative">

          <svg
            viewBox="0 0 600 90"
            className="w-full max-w-md h-auto mb-8 opacity-90 animate-fade-up"
            fill="none"
          >
            <path
              className="braid-path braid-path-1"
              d="M0,45 C60,10 90,80 150,45 C210,10 240,80 300,45"
              stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round"
            />
            <path
              className="braid-path braid-path-2"
              d="M0,45 C60,80 90,10 150,45 C210,80 240,10 300,45"
              stroke="var(--violet)" strokeWidth="2.5" strokeLinecap="round"
            />
            <path
              className="braid-path braid-path-3"
              d="M300,45 L600,45"
              stroke="var(--text)" strokeWidth="2.5" strokeLinecap="round"
            />
            <circle className="braid-dot" cx="300" cy="45" r="4" fill="var(--text)" />
          </svg>

          <h1 className="animate-fade-up stagger-1 font-display text-6xl font-medium tracking-tight text-[var(--text)] leading-none mb-4">
            SyncPad
            <span className="blink-cursor inline-block w-2 h-12 bg-[var(--accent)] ml-2 align-middle" />
          </h1>
          <p className="animate-fade-up stagger-2 text-[var(--text-secondary)] text-lg max-w-md leading-relaxed">
            Mutliple users, one document, zero conflicts — CRDTs merge every
            keystroke into a single consistent truth, live.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 pb-24">

          <div className="md:sticky md:top-24 md:self-start animate-fade-up stagger-3">
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-3">
              Start a session
            </p>
            <div className="glass-card rounded-2xl p-5">
              <input
                className="input-glow w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-3.5 py-2.5
                           text-sm text-[var(--text)] placeholder:text-[var(--text-faint)] outline-none mb-3
                           focus:border-[var(--accent)]"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                placeholder="room-name (optional)"
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              />
              <button
                onClick={handleCreate}
                className="btn-sheen w-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)]
                           text-[var(--accent-contrast)] font-semibold text-sm py-2.5 rounded-lg
                           transition-transform duration-150 active:scale-[0.97] hover:brightness-105"
              >
                Create document
              </button>
            </div>
          </div>
          
          <div className="animate-fade-up stagger-4">
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-3">
              Recent documents · {docs.length}
            </p>

            {docs.length === 0 ? (
              <div className="border border-dashed border-[var(--border)] rounded-2xl py-16 text-center">
                <p className="text-[var(--text-faint)] text-sm">
                  Nothing yet. Start a session on the left.
                </p>
              </div>
            ) : (
              <ul className="flex flex-col gap-2">
                {docs.map((doc, i) => (
                  <li
                    key={doc.docName}
                    className="doc-item"
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    <Link
                      to={`/doc/${doc.docName}`}
                      className="glass-card group flex items-center justify-between px-5 py-4 rounded-xl"
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--violet)]" />
                        <span className="font-medium text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                          {doc.docName}
                        </span>
                      </span>
                      <span className="font-mono text-[11px] text-[var(--text-faint)]">
                        {new Date(doc.updatedAt).toLocaleString(undefined, {
                          month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                        })}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;