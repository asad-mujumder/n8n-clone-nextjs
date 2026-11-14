import 'server-only';

import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from '@/server/clients/prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const [firstName, lastName] = user.name.split(' ');
          return {
            data: {
              ...user,
              firstName,
              lastName,
            },
          };
        },
      },
    },
  },
  user: {
    additionalFields: {
      firstName: {
        type: 'string',
        required: false,
        input: false,
      },
      lastName: {
        type: 'string',
        required: false,
        input: false,
      },
      role: {
        type: ['USER', 'ADMIN'],
        required: false,
        input: false,
        defaultValue: 'USER',
      },
    },
  },
  session: {
    expiresIn: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60, // 1 day
  },
  advanced: {
    database: {
      generateId: 'uuid',
      joins: true,
    },
  },
});

export type Auth = typeof auth;
export type AuthFullSession = typeof auth.$Infer.Session;
export type AuthUser = AuthFullSession['user'];
export type AuthSession = AuthFullSession['session'];
