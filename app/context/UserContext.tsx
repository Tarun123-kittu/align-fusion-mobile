import React, { createContext, ReactNode, useContext, useState } from 'react';
import type { User, UserContextType } from '../types';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);
  const addXP = (amount: number) => {
    setUser((prev) => (prev ? { ...prev, xp: prev.xp + amount } : prev));
  };
  const addReward = (amount: number) => {
    setUser((prev) => (prev ? { ...prev, rewards: prev.rewards + amount } : prev));
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, addXP, addReward }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
}; 