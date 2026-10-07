import { createTRPCRouter, baseProcedure } from '../init';
import db from '@/lib/db';

export const appRouter = createTRPCRouter({
  getUsers: baseProcedure.query(() => {
    return db.user.findMany({ take: 10 });
  }),
});

export type AppRouter = typeof appRouter;
