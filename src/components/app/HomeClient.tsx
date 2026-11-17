'use client';

import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const HomeClient = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const { mutate, isPending } = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: (data) => {
        // queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
        toast.success(data.message, { position: 'top-center' });
      },
      onError: (error) => {
        toast.error(error.message, { position: 'top-center' });
      },
    })
  );

  return (
    <>
      <Button size="lg" disabled={isPending} onClick={() => mutate()}>
        Add Workflow
      </Button>
      <div
        className="flex flex-col items-center gap-4 text-lg font-bold
          text-red-600 dark:text-red-400"
      >
        {/* {data != null ? data.firstName + ' ' + data.lastName : 'No User Found'} */}
        {data != null &&
          data.length > 0 &&
          data.map((w) => <p key={w.id}>{w.name}</p>)}
      </div>
    </>
  );
};

export default HomeClient;
