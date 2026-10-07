import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';
import HomeClient from '@/components/app/HomeClient';

export default async function Home() {
  prefetch(trpc.getUsers.queryOptions()); // prefetch

  return (
    <HydrateClient>
      <div className="flex flex-1 flex-col">
        <main className="flex-1">
          <div
            className="flex h-screen w-screen flex-col items-center
              justify-center gap-2"
          >
            <h1 className="text-2xl text-primary md:text-5xl">Hello n8n</h1>
            <p className="text-sm text-slate-700 dark:text-slate-400">
              Your own ai automation tool
            </p>
            <ErrorBoundary
              fallback={
                <div className="text-red-600 dark:text-red-400">
                  something went wrong
                </div>
              }
            >
              <Suspense fallback={<div>Loading...</div>}>
                <HomeClient />
              </Suspense>
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </HydrateClient>
  );
}
