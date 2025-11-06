import { useState } from 'react';
import { Download, Play } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function sanitizeFilename(name) {
  const base = (name || 'tiktok-video')
    .replace(/[^a-z0-9\-_.\s]/gi, '')
    .trim()
    .slice(0, 80) || 'tiktok-video';
  return base.toLowerCase().replace(/\s+/g, '-');
}

export default function ResultCard({ title, thumbnail, downloadUrl }) {
  const [showPreview, setShowPreview] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDirectDownload = async () => {
    try {
      setDownloading(true);
      const filename = `${sanitizeFilename(title)}.mp4`;
      const url = `${BACKEND_URL}/api/download?url=${encodeURIComponent(downloadUrl)}&filename=${encodeURIComponent(filename)}`;

      // Fetch as blob so we don't navigate away, then trigger a programmatic download
      const resp = await fetch(url, { method: 'GET' });
      if (!resp.ok) throw new Error('Failed to download file');
      const blob = await resp.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (e) {
      alert(e.message || 'Download failed');
    } finally {
      setDownloading(false);
    }
  };

  const previewSrc = `${BACKEND_URL}/api/stream?url=${encodeURIComponent(downloadUrl)}`;

  return (
    <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="relative aspect-video w-full lg:col-span-1">
          {thumbnail ? (
            <img src={thumbnail} alt={title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-black/30 text-white/60">No thumbnail</div>
          )}
        </div>
        <div className="lg:col-span-2 p-5 sm:p-6 lg:p-8">
          <h3 className="line-clamp-2 text-lg sm:text-xl font-semibold text-white">{title || 'TikTok Video'}</h3>
          <p className="mt-1 text-xs sm:text-sm text-white/60">No watermark • MP4</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() => setShowPreview(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 font-medium text-white ring-1 ring-white/20 transition hover:bg-white/20"
            >
              <Play className="h-4 w-4" />
              Preview
            </button>
            <button
              onClick={handleDirectDownload}
              disabled={downloading}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-medium text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Download className="h-4 w-4" />
              {downloading ? 'Saving…' : 'Save to device'}
            </button>
          </div>
        </div>
      </div>

      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-zinc-950 p-4 sm:p-6">
            <div className="flex items-center justify-between gap-2 pb-3">
              <h4 className="truncate pr-6 text-sm sm:text-base font-semibold text-white/90">Preview</h4>
              <button
                onClick={() => setShowPreview(false)}
                className="rounded-md border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/20"
              >
                Close
              </button>
            </div>
            <div className="relative">
              <video
                src={previewSrc}
                controls
                className="aspect-video w-full rounded-lg bg-black"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
