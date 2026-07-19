import { useState } from 'react';
import NamePromptModal from './NamePromptModal';
import { useUserNameContext } from '../context/UserNameContext';

function NameBadge() {
  const { name, setName } = useUserNameContext();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsEditing(true)}
        title="Change your name"
        className="font-mono text-[11px] text-[var(--text-muted)] hover:text-[var(--text)]
                   transition-colors px-2.5 py-1.5 rounded-lg border border-[var(--border)]
                   hover:border-[var(--accent)] flex items-center gap-1.5"
      >
        {name}
        <span aria-hidden="true" className="opacity-60">✎</span>
      </button>

      {isEditing && (
        <NamePromptModal
          initialValue={name}
          onSubmit={(newName) => {
            setName(newName);
            setIsEditing(false);
          }}
          onClose={() => setIsEditing(false)}
        />
      )}
    </>
  );
}

export default NameBadge;