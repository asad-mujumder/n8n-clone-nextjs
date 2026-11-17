import { inngest } from './client';
import prisma from '../clients/prisma';

export const createWorkflow = inngest.createFunction(
  {
    id: 'create-workflow-func',
    triggers: { event: 'workflow/execution.created' },
    retries: 3,
  },
  async ({ event, step }) => {
    // Fetching Video
    await step.sleep('fetching-video', '2s');

    // Transcribing Video
    await step.sleep('transcribing-video', '2s');

    // Sending transcription to AI
    await step.sleep('sending-to-ai', '2s');

    await step.run('create-workflow', async () => {
      return prisma.workflow.create({
        data: { name: event.data.name },
      });
    });
  }
);
