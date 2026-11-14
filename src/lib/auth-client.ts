import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';
import type { Auth } from '@/server/auth';

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  // baseURL: process.env.NEXT_PUBLIC_SERVER_URL!,
  plugins: [inferAdditionalFields<Auth>()],
});

export const { signUp, signIn, signOut, useSession, updateUser } = authClient;

export type AuthFullSession = typeof authClient.$Infer.Session;
export type AuthUser = AuthFullSession['user'];
export type AuthSession = AuthFullSession['session'];
