import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'syncpad-username';

export function useUserName() {
  const [name, setNameState] = useState(() => sessionStorage.getItem(STORAGE_KEY));

  useEffect(() => {
    if (name) {
      sessionStorage.setItem(STORAGE_KEY, name);
    }
  }, [name]);

  const setName = useCallback((newName) => {
    const trimmed = newName.trim();
    if (trimmed) setNameState(trimmed);
  }, []);

  return { name, setName, hasName: Boolean(name) };
}