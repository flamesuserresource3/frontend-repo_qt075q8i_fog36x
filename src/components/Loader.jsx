export default function Loader({ progress = 0 }) {
  return (
    <div className="mt-8 w-full">
      <div className="mx-auto max-w-2xl rounded-lg border border-white/10 bg-white/5 p-4">
        <div className="mb-2 flex items-center justify-between text-sm text-white/80">
          <span>Preparing your download</span>
          <span>{Math.min(100, Math.round(progress))}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded bg-white/10">
          <div
            className="h-full bg-white transition-all"
            style={{ width: `${Math.min(100, Math.round(progress))}%` }}
          />
        </div>
      </div>
    </div>
  );
}
