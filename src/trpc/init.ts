import { cache } from 'react';
import { initTRPC, TRPCError } from '@trpc/server';
import SuperJSON from 'superjson';
import { getSession } from '@/server/auth/session';

export const createTRPCContext = cache(async () => {
  return {};
});

const t = initTRPC.create({
  transformer: SuperJSON,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const session = await getSession();
  if (!session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Unauthorized',
    });
  }
  return next({ ctx: { ...ctx, auth: session } });
});
