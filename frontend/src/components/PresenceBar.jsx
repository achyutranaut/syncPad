import { useState, useEffect } from 'react';

function PresenceBar({ provider }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!provider) return;

    const updateUsers = () => {
      const states = provider.awareness.getStates();
      const userList = Array.from(states.values())
        .map((state) => state.user)
        .filter(Boolean);
      setUsers(userList);
    };

    provider.awareness.on('change', updateUsers);
    updateUsers();

    return () => {
      provider.awareness.off('change', updateUsers);
    };
  }, [provider]);

  return (
    <div className="flex items-center -space-x-2">
      {users.map((user, i) => (
        <div
          key={i}
          className="animate-pop-in group relative w-7 h-7 rounded-full flex items-center justify-center
                     font-mono text-[11px] font-bold text-[#090c14]
                     border-2 border-[var(--bg-elevated)] hover:z-20 hover:-translate-y-1
                     transition-transform cursor-default"
          style={{ backgroundColor: user?.color || '#888', animationDelay: `${i * 0.08}s` }}
        >
          {(user?.name || '?').charAt(0).toUpperCase()}

          <span
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-30
                       text-[var(--text)] text-[11px] font-sans font-medium
                       px-2 py-1 rounded-md whitespace-nowrap shadow-lg
                       opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
            }}
          >
            {user?.name || 'Anonymous'}
          </span>
        </div>
      ))}
    </div>
  );
}

export default PresenceBar;