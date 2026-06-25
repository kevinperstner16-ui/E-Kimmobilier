import type { AuthLog, AuthUser, UserRole } from '@/lib/auth-store';
import { isSupabaseEnabled } from './config';
import { supabaseRest } from './rest-client';

type AuthUserRow = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
};

type AuthLogRow = {
  id: string;
  type: AuthLog['type'];
  email: string;
  message: string;
  created_at: string;
};

function eq(column: string, value: string) {
  return `${column}=eq.${encodeURIComponent(value)}`;
}

function userFromRow(row: AuthUserRow): AuthUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    password: row.password,
    role: row.role,
  };
}

function userToRow(user: AuthUser): AuthUserRow {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
    role: user.role,
  };
}

function logFromRow(row: AuthLogRow): AuthLog {
  return {
    id: row.id,
    type: row.type,
    email: row.email,
    message: row.message,
    createdAt: row.created_at,
  };
}

function logToRow(log: AuthLog): AuthLogRow {
  return {
    id: log.id,
    type: log.type,
    email: log.email,
    message: log.message,
    created_at: log.createdAt,
  };
}

export const authDatabase = {
  isEnabled: isSupabaseEnabled,

  async getUsers() {
    if (!isSupabaseEnabled()) return null;
    const rows = await supabaseRest<AuthUserRow[]>('auth_users', {
      query: '?select=*&order=created_at.asc',
    });
    return rows.map(userFromRow);
  },

  async upsertUser(user: AuthUser) {
    if (!isSupabaseEnabled()) return;
    await supabaseRest<AuthUserRow[]>('auth_users', {
      method: 'POST',
      query: '?on_conflict=id',
      body: userToRow(user),
      prefer: 'resolution=merge-duplicates,return=representation',
    });
  },

  async updateUser(id: string, user: Partial<AuthUser>) {
    if (!isSupabaseEnabled()) return;
    await supabaseRest<AuthUserRow[]>('auth_users', {
      method: 'PATCH',
      query: `?${eq('id', id)}`,
      body: user,
    });
  },

  async getLogs() {
    if (!isSupabaseEnabled()) return null;
    const rows = await supabaseRest<AuthLogRow[]>('auth_logs', {
      query: '?select=*&order=created_at.desc&limit=200',
    });
    return rows.map(logFromRow);
  },

  async addLog(log: AuthLog) {
    if (!isSupabaseEnabled()) return;
    await supabaseRest<AuthLogRow[]>('auth_logs', {
      method: 'POST',
      body: logToRow(log),
    });
  },

  async clearLogs() {
    if (!isSupabaseEnabled()) return;
    await supabaseRest<void>('auth_logs', {
      method: 'DELETE',
      query: '?id=not.is.null',
      prefer: 'return=minimal',
    });
  },
};
