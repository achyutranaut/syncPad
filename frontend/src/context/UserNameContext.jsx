import { createContext, useContext } from 'react';
import { useUserName } from '../hooks/useUserName';

const UserNameContext = createContext(null);

export function UserNameProvider({ children }) {
  const value = useUserName();
  return (
    <UserNameContext.Provider value={value}>
      {children}
    </UserNameContext.Provider>
  );
}

export function useUserNameContext() {
  const ctx = useContext(UserNameContext);
  if (!ctx) {
    throw new Error('useUserNameContext must be used within a UserNameProvider');
  }
  return ctx;
}
