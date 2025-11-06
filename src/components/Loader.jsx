export default function Loader({ progress = 0 }) {
  const pct = Math.min(100, Math.round(progress));
  return (
    <div className="mt-6 sm:mt-8 w-full">
      <div className="mx-auto max-w-3xl rounded-lg border border-white/10 bg-white/5 p-4">
        <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-white/80">
          <span>Preparing your download</span>
          <span>{pct}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded bg-white/10">
          <div className="h-full bg-white transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}
