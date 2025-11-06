import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import UrlForm from './components/UrlForm';
import Loader from './components/Loader';
import ResultCard from './components/ResultCard';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let raf;
    if (loading) {
      const start = performance.now();
      const tick = (t) => {
        const elapsed = t - start;
        // Simulated progress curve: fast to 70%, then slow
        const pct = Math.min(98, 100 * (1 - Math.exp(-elapsed / 1200)));
        setProgress(pct);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }
    return () => raf && cancelAnimationFrame(raf);
  }, [loading]);

  const handleSubmit = async (url) => {
    setError('');
    setResult(null);
    setLoading(true);
    setProgress(0);
    try {
      const res = await fetch(`${BACKEND_URL}/api/tiktok?url=${encodeURIComponent(url)}`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || 'Failed to fetch download link');
      }
      const data = await res.json();
      setResult({
        title: data.title,
        thumbnail: data.thumbnail_url,
        downloadUrl: data.download_url,
      });
      setProgress(100);
    } catch (e) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white">
      <Hero />

      <div className="relative z-10 mx-auto -mt-20 w-full max-w-5xl px-6">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur">
          <UrlForm onSubmit={handleSubmit} loading={loading} />
          {loading && <Loader progress={progress} />}
          {error && (
            <p className="mx-auto mt-4 max-w-2xl rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
              {error}
            </p>
          )}
        </div>

        {result && (
          <ResultCard
            title={result.title}
            thumbnail={result.thumbnail}
            downloadUrl={result.downloadUrl}
          />
        )}

        <footer className="mx-auto mt-16 max-w-5xl px-2 pb-12 text-center text-xs text-white/50">
          This tool uses a public API to fetch video metadata and a no-watermark link. Please respect content rights.
        </footer>
      </div>
    </div>
  );
}
