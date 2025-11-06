import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[56vh] md:h-[68vh] lg:h-[78vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/igThmltzmqv5hkWo/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* Soft gradient so scene stays interactive */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow">
          TikTok Downloader
        </h1>
        <p className="mt-4 max-w-2xl md:max-w-3xl text-sm md:text-lg lg:text-xl text-white/90">
          Save TikTok videos in high quality without the watermark. Paste a link below and download in seconds.
        </p>
      </div>
    </section>
  );
}
