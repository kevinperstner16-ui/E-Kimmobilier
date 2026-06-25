'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'user';

export type AuthLog = {
  id: string;
  type: 'login' | 'register' | 'logout' | 'password_reset' | 'password_reset_request' | 'role_update';
  email: string;
  message: string;
  createdAt: string;
};

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
  logs: AuthLog[];
  currentUser: PublicUser | null;
  login: (email: string, password: string) => { success: boolean; message: string };
  register: (name: string, email: string, password: string) => { success: boolean; message: string };
  requestPasswordReset: (userId: string) => {
    success: boolean;
    message: string;
    user?: AuthUser;
  };
  updatePassword: (email: string, password: string) => { success: boolean; message: string };
  setUserRole: (userId: string, role: UserRole) => { success: boolean; message: string };
  clearLogs: () => void;
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

export const PRIMARY_ADMIN_ID = adminUser.id;

const normalizeEmail = (email: string) => email.trim().toLowerCase();
const withoutPassword = (user: AuthUser): PublicUser => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const createLog = (type: AuthLog['type'], email: string, message: string): AuthLog => ({
  id: `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  type,
  email,
  message,
  createdAt: new Date().toISOString(),
});

const pushLog = (logs: AuthLog[], log: AuthLog) => [log, ...(logs ?? [])].slice(0, 200);

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      users: [adminUser],
      logs: [],
      currentUser: null,
      login: (email, password) => {
        const normalizedEmail = normalizeEmail(email);
        const user = get().users.find(
          (candidate) =>
            normalizeEmail(candidate.email) === normalizedEmail && candidate.password === password
        );

        if (!user) {
          set((state) => ({
            logs: pushLog(
              state.logs,
              createLog('login', normalizedEmail, 'Tentative de connexion refusée.')
            ),
          }));
          return { success: false, message: 'Email ou mot de passe incorrect.' };
        }

        set((state) => ({
          currentUser: withoutPassword(user),
          logs: pushLog(state.logs, createLog('login', user.email, 'Connexion réussie.')),
        }));
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
          logs: pushLog(state.logs, createLog('register', user.email, `Compte créé pour ${user.name}.`)),
        }));
        return { success: true, message: 'Compte créé avec succès.' };
      },
      requestPasswordReset: (userId) => {
        const user = get().users.find((candidate) => candidate.id === userId);

        if (!user) {
          return { success: false, message: 'Compte introuvable.' };
        }

        set((state) => ({
          logs: pushLog(
            state.logs,
            createLog('password_reset_request', user.email, `Lien de reset préparé pour ${user.name}.`)
          ),
        }));

        return {
          success: true,
          message: 'Lien de reset préparé.',
          user,
        };
      },
      updatePassword: (email, password) => {
        const normalizedEmail = normalizeEmail(email);
        const user = get().users.find((candidate) => normalizeEmail(candidate.email) === normalizedEmail);

        if (!user) {
          return { success: false, message: 'Compte introuvable.' };
        }

        set((state) => ({
          users: state.users.map((candidate) =>
            normalizeEmail(candidate.email) === normalizedEmail ? { ...candidate, password } : candidate
          ),
          currentUser:
            state.currentUser && normalizeEmail(state.currentUser.email) === normalizedEmail
              ? withoutPassword({ ...user, password })
              : state.currentUser,
          logs: pushLog(
            state.logs,
            createLog('password_reset', user.email, `Mot de passe modifié par ${user.name}.`)
          ),
        }));

        return { success: true, message: 'Mot de passe modifié avec succès.' };
      },
      setUserRole: (userId, role) => {
        const user = get().users.find((candidate) => candidate.id === userId);

        if (!user) {
          return { success: false, message: 'Compte introuvable.' };
        }

        if (user.id === PRIMARY_ADMIN_ID) {
          return { success: false, message: 'Le compte admin principal garde toujours toutes les permissions.' };
        }

        set((state) => ({
          users: state.users.map((candidate) =>
            candidate.id === userId ? { ...candidate, role } : candidate
          ),
          currentUser:
            state.currentUser?.id === userId ? { ...state.currentUser, role } : state.currentUser,
          logs: pushLog(
            state.logs,
            createLog('role_update', user.email, `${user.name} est maintenant ${role}.`)
          ),
        }));

        return { success: true, message: 'Rôle mis à jour.' };
      },
      clearLogs: () => set({ logs: [] }),
      logout: () => {
        const user = get().currentUser;
        set((state) => ({
          currentUser: null,
          logs: user ? pushLog(state.logs, createLog('logout', user.email, 'Déconnexion.')) : state.logs,
        }));
      },
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
          logs: persisted.logs ?? [],
        };
      },
    }
  )
);
