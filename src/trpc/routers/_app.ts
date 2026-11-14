import { createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/server/clients/prisma';

export const appRouter = createTRPCRouter({
  getProfile: protectedProcedure.query(({ ctx }) => {
    return prisma.user.findUnique({
      where: {
        id: ctx.auth.user.id,
      },
    });
  }),
});

export type AppRouter = typeof appRouter;
