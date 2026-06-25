'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'user';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

type PublicUser = Omit<AuthUser, 'password'>;

interface AuthStore {
  users: AuthUser[];
  currentUser: PublicUser | null;
  login: (email: string, password: string) => { success: boolean; message: string };
  register: (name: string, email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
}

export const ADMIN_EMAIL = 'admin@ek-immobilier.fr';
export const ADMIN_PASSWORD = 'EK-Admin-2026!';

const adminUser: AuthUser = {
  id: 'admin-ek',
  name: 'Administrateur E&K',
  email: ADMIN_EMAIL,
  password: ADMIN_PASSWORD,
  role: 'admin',
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();
const withoutPassword = (user: AuthUser): PublicUser => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      users: [adminUser],
      currentUser: null,
      login: (email, password) => {
        const normalizedEmail = normalizeEmail(email);
        const user = get().users.find(
          (candidate) =>
            normalizeEmail(candidate.email) === normalizedEmail && candidate.password === password
        );

        if (!user) {
          return { success: false, message: 'Email ou mot de passe incorrect.' };
        }

        set({ currentUser: withoutPassword(user) });
        return { success: true, message: 'Connexion réussie.' };
      },
      register: (name, email, password) => {
        const normalizedEmail = normalizeEmail(email);
        if (get().users.some((user) => normalizeEmail(user.email) === normalizedEmail)) {
          return { success: false, message: 'Un compte existe déjà avec cet email.' };
        }

        const user: AuthUser = {
          id: `user-${Date.now()}`,
          name: name.trim(),
          email: normalizedEmail,
          password,
          role: 'user',
        };

        set((state) => ({
          users: [...state.users, user],
          currentUser: withoutPassword(user),
        }));
        return { success: true, message: 'Compte créé avec succès.' };
      },
      logout: () => set({ currentUser: null }),
    }),
    {
      name: 'ek-auth',
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<AuthStore>;
        const users = persisted.users ?? [];
        const hasAdmin = users.some((user) => user.email === ADMIN_EMAIL);

        return {
          ...currentState,
          ...persisted,
          users: hasAdmin ? users : [adminUser, ...users],
        };
      },
    }
  )
);
