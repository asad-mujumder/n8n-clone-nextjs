import 'server-only';

import { cache } from 'react';
import { auth } from '.';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() })
);

export const isAuthenticated = async () => {
  const session = await getSession();
  if (session) return true;
  return false;
};

export const requireAuth = async () => {
  const session = await getSession();
  if (!session) redirect('/login');
  return session;
};

export const requireUnauth = async () => {
  const session = await getSession();
  if (session) redirect('/');
};
