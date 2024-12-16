// authentication/AuthContext.tsx

'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import pb from './PocketBaseClient';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  username: string;
  email: string;
  profile_picture?: string;
  role: boolean;
  created: string;
  updated: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: { username?: string; profile_picture?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
pb.autoCancellation(false);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      if (pb.authStore.isValid) {
        try {
          const authData = await pb.collection('users').authRefresh();
          setUser(authData.record as unknown as User);
        } catch (error) {
          console.error('Hiba a felhasználó frissítésekor:', error);
          setUser(null);
          logout();
        }
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      // Süti tárolása
      document.cookie = `pb_token=${authData.token}; path=/; max-age=3600; SameSite=Strict; Secure`;
      setUser(authData.record as unknown as User);
      router.push('/quiz');
    } catch (error) {
      console.error('Bejelentkezési hiba:', error);
      throw new Error('Hibás felhasználónév vagy jelszó');
    }
  };

  const logout = () => {
    pb.authStore.clear();
    document.cookie = 'pb_token=; path=/; max-age=0; SameSite=Strict; Secure';
    setUser(null);
    router.push('/authentication/login');
  };

  const updateProfile = async (updates: { username?: string; profile_picture?: string }) => {
    if (!user) throw new Error('Nincs bejelentkezett felhasználó');

    try {
      const updatedData: any = {};
      if (updates.username) {
        updatedData.username = updates.username;
      }
      if (updates.profile_picture) {
        updatedData.profile_picture = updates.profile_picture;
      }
      const updatedUser = await pb.collection('users').update(user.id, updatedData);
      setUser(updatedUser as unknown as User);
    } catch (error) {
      console.error('Profil frissítési hiba:', error);
      throw new Error('Hiba történt a profil frissítésekor');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
