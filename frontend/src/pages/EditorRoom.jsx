import { useParams, Link } from 'react-router-dom';
import useYjsDoc from '../hooks/useYJsDoc';
import CollaborativeEditor from '../components/CollaborativeEditor';
import PresenceBar from '../components/PresenceBar';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../hooks/useTheme';
import NameBadge from '../components/NameBadge';

function EditorRoom() {
  const { roomId } = useParams();
  const { ydoc, provider, status } = useYjsDoc(roomId);
  const { theme, toggleTheme } = useTheme();

  const statusConfig = {
    connected: { color: 'var(--success)', label: 'connected' },
    connecting: { color: 'var(--accent)', label: 'connecting' },
    disconnected: { color: 'var(--text-muted)', label: 'offline' },
  };
  const s = statusConfig[status] || statusConfig.disconnected;

  return (
    <div className="relative min-h-screen flex flex-col font-body">
      <div className="aurora-bg" />

      <div className="relative z-10 max-w-5xl w-full mx-auto px-6 py-6 flex flex-col gap-4 flex-1">

        <div className="flex items-center justify-between animate-fade-up">
          <Link
            to="/"
            className="font-display text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            ← SyncPad
          </Link>
          <div className="flex items-center gap-3">
            <NameBadge />
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>

        <div className="glass-card flex items-center justify-between gap-4 px-5 py-3 rounded-xl animate-fade-up stagger-1">
          <span className="font-mono text-xs text-[var(--text-muted)]">
            room / <strong className="text-[var(--text)] font-semibold">{roomId}</strong>
          </span>

          <div className="flex items-center gap-4">
            {provider && <PresenceBar provider={provider} />}
            <span
              className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full"
              style={{ color: s.color, backgroundColor: `color-mix(in srgb, ${s.color} 14%, transparent)` }}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${status === 'connected' ? 'pulse-glow' : ''}`}
                style={{ backgroundColor: s.color }}
              />
              {s.label}
            </span>
          </div>
        </div>

        <div className="flex-1 bg-[var(--bg-input)] border border-[var(--border)] rounded-xl overflow-hidden
                        shadow-2xl animate-fade-up stagger-2">
          {ydoc && provider && <CollaborativeEditor ydoc={ydoc} provider={provider} />}
        </div>
      </div>
    </div>
  );
}

export default EditorRoom;