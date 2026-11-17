import { inngest } from '@/server/inngest/client';
import { serve } from 'inngest/next';
import { createWorkflow } from '@/server/inngest/functions';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [createWorkflow],
});
