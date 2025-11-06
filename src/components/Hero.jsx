import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/igThmltzmqv5hkWo/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background/80 pointer-events-none" />
      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow">TikTok Downloader</h1>
        <p className="mt-4 max-w-2xl text-base md:text-lg text-white/90">
          Save TikTok videos in high quality without the watermark. Paste a link below and download in seconds.
        </p>
      </div>
    </section>
  );
}
