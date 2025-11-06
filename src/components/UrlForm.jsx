import { useState } from 'react';

export default function UrlForm({ onSubmit, loading }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    onSubmit(url.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label htmlFor="tiktok-url" className="sr-only">TikTok URL</label>
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
        <input
          id="tiktok-url"
          type="url"
          required
          inputMode="url"
          placeholder="Paste TikTok link here..."
          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/60 outline-none ring-2 ring-transparent transition focus:ring-white/30"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto rounded-lg bg-white px-5 py-3 font-semibold text-black shadow-md transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Processing...' : 'Get link'}
        </button>
      </div>
    </form>
  );
}
