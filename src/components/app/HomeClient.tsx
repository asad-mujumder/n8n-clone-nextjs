'use client';

import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';

const HomeClient = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.getProfile.queryOptions());

  return (
    <p className="text-lg font-bold text-red-600 dark:text-red-400">
      {data != null ? data.firstName + ' ' + data.lastName : 'No User Found'}
    </p>
  );
};

export default HomeClient;
