import { inngest } from '@/server/inngest/client';
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
  getWorkflows: protectedProcedure.query(() => {
    return prisma.workflow.findMany({ take: 10 });
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: 'workflow/execution.created',
      data: {
        name: 'Best workflow',
      },
    });
    return { success: true, message: 'Job queued' };
  }),
});

export type AppRouter = typeof appRouter;
