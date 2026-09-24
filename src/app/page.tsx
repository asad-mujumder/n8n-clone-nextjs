export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1">
        <div
          className="flex h-screen w-screen flex-col items-center justify-center
            gap-2"
        >
          <h1 className="text-2xl text-primary md:text-5xl">Hello n8n</h1>
          <p className="text-sm text-slate-700 dark:text-slate-400">
            Your own ai automation tool
          </p>
        </div>
      </main>
    </div>
  );
}
