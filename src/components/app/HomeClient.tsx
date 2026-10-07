'use client';

import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';

const HomeClient = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.getUsers.queryOptions());

  return (
    <p className="text-lg font-bold text-red-600 dark:text-red-400">
      {data[0].firstName + ' ' + data[0].lastName}
    </p>
  );
};

export default HomeClient;
