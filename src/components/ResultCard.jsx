import { Download } from 'lucide-react';

export default function ResultCard({ title, thumbnail, downloadUrl }) {
  return (
    <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="relative aspect-video w-full md:col-span-1">
          {thumbnail ? (
            <img src={thumbnail} alt={title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-black/30 text-white/60">No thumbnail</div>
          )}
        </div>
        <div className="md:col-span-2 p-6">
          <h3 className="line-clamp-2 text-lg font-semibold text-white">{title || 'TikTok Video'}</h3>
          <p className="mt-1 text-sm text-white/60">No watermark • MP4</p>
          <div className="mt-4">
            <a
              href={downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-medium text-black transition hover:opacity-90"
              download
            >
              <Download className="h-4 w-4" />
              Download Video
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
