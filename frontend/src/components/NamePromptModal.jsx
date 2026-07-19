import { useState } from 'react';

function NamePromptModal({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (value.trim()) onSubmit(value);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: 'color-mix(in srgb, var(--bg) 85%, transparent)', backdropFilter: 'blur(6px)' }}
    >
      <div className="glass-card rounded-2xl p-6 w-full max-w-sm animate-pop-in">
        <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">
          Welcome to SyncPad
        </p>
        <h2 className="font-display text-xl font-semibold text-[var(--text)] mb-4">
          What should we call you?
        </h2>
        <input
          autoFocus
          className="input-glow w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-3.5 py-2.5
                     text-sm text-[var(--text)] placeholder:text-[var(--text-faint)] outline-none mb-4
                     focus:border-[var(--accent)]"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Your name"
          maxLength={24}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          className="btn-sheen w-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)]
                     text-[var(--accent-contrast)] font-semibold text-sm py-2.5 rounded-lg
                     transition-transform duration-150 active:scale-[0.97] hover:brightness-105
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          Continue →
        </button>
        <p className="text-[11px] text-[var(--text-faint)] mt-3 text-center">
          Shown to others while you're editing together. Saved on this device only.
        </p>
      </div>
    </div>
  );
}

export default NamePromptModal;