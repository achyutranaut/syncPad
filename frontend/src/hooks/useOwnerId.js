import { useState } from 'react';

const STORAGE_KEY = 'syncpad-owner-id';

export function useOwnerId() {
  const [ownerId] = useState(() => {
    let id = sessionStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  });

  return ownerId;
}

export default useOwnerId;
