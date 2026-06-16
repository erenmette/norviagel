'use client';

import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Play, X, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

type VideoItem = {
  src: string;
  poster: string;
  duration: string;
};

// 6 product demo videos, web-optimized (1080p, faststart). Posters keep the grid light.
const VIDEOS: VideoItem[] = [
  { src: '/videos/norvia-1.mp4', poster: '/videos/norvia-1.jpg', duration: '0:44' },
  { src: '/videos/norvia-2.mp4', poster: '/videos/norvia-2.jpg', duration: '0:39' },
  { src: '/videos/norvia-3.mp4', poster: '/videos/norvia-3.jpg', duration: '0:52' },
  { src: '/videos/norvia-4.mp4', poster: '/videos/norvia-4.jpg', duration: '0:50' },
  { src: '/videos/norvia-5.mp4', poster: '/videos/norvia-5.jpg', duration: '1:26' },
  { src: '/videos/norvia-6.mp4', poster: '/videos/norvia-6.jpg', duration: '0:44' },
];

export default function VideoShowcase() {
  const t = useTranslations('videos');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [muted, setMuted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  const go = useCallback(
    (dir: number) => {
      setOpenIndex((prev) => {
        if (prev === null) return prev;
        return (prev + dir + VIDEOS.length) % VIDEOS.length;
      });
    },
    []
  );

  // Keyboard controls + body scroll lock while the lightbox is open
  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };

    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, close, go]);

  // Horizontal scroll-by for the desktop arrow buttons
  const scrollByCards = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  // Desktop-only hover preview: lazily load + play the hovered card muted
  const handleHover = (video: HTMLVideoElement | null, play: boolean) => {
    if (!video || window.matchMedia('(hover: none)').matches) return;
    if (play) {
      if (!video.src) video.src = video.dataset.src || '';
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <section id="videos" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-60" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] gradient-radial opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollAnimationWrapper className="text-center max-w-2xl mx-auto mb-12">
          <span className="section-badge mb-4">{t('badge')}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-6 leading-tight">
            {t('title')}
          </h2>
          <p className="text-lg text-text-secondary mt-4">{t('subtitle')}</p>
        </ScrollAnimationWrapper>

        {/* Carousel */}
        <div className="relative">
          {/* Desktop arrows */}
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            aria-label={t('prev')}
            className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full glass border border-accent/30 items-center justify-center text-white hover:glow transition-all"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            aria-label={t('next')}
            className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full glass border border-accent/30 items-center justify-center text-white hover:glow transition-all"
          >
            <ChevronRight size={22} />
          </button>

          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-primary to-transparent z-10 hidden sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-primary to-transparent z-10 hidden sm:block" />

          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none' }}
          >
            {VIDEOS.map((video, i) => (
              <ScrollAnimationWrapper
                key={video.src}
                delay={i * 80}
                className="snap-start shrink-0"
              >
                <button
                  type="button"
                  onClick={() => {
                    setMuted(false);
                    setOpenIndex(i);
                  }}
                  onMouseEnter={(e) =>
                    handleHover(e.currentTarget.querySelector('video'), true)
                  }
                  onMouseLeave={(e) =>
                    handleHover(e.currentTarget.querySelector('video'), false)
                  }
                  className="group relative block w-[58vw] sm:w-[230px] md:w-[240px] aspect-[9/16] rounded-2xl overflow-hidden glass border border-border card-hover focus:outline-none focus:ring-2 focus:ring-accent"
                  aria-label={`${t('playLabel')} ${i + 1}`}
                >
                  {/* Poster */}
                  <Image
                    src={video.poster}
                    alt={`Norvia Gel Glove demo ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 62vw, 240px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover preview video (desktop, lazy) */}
                  <video
                    data-src={video.src}
                    poster={video.poster}
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-accent/90 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:glow transition-all duration-300">
                      <Play size={24} className="text-white ml-0.5" fill="white" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <span className="absolute bottom-3 right-3 text-[11px] font-medium text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md">
                    {video.duration}
                  </span>

                  {/* Index badge */}
                  <span className="absolute top-3 left-3 text-[11px] font-bold text-accent bg-primary-dark/70 backdrop-blur-sm px-2 py-1 rounded-md uppercase tracking-wider">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </button>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>

        {/* Mobile hint */}
        <p className="text-center text-xs text-text-muted mt-4 lg:hidden">
          {t('swipeHint')}
        </p>
      </div>

      {/* Lightbox modal */}
      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-primary-dark/90 backdrop-blur-md p-4 animate-[fadeIn_0.2s_ease]"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label={t('close')}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 rounded-full glass border border-border flex items-center justify-center text-white hover:text-accent hover:border-accent/50 transition-colors"
          >
            <X size={22} />
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label={t('prev')}
            className="absolute left-2 sm:left-6 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full glass border border-border flex items-center justify-center text-white hover:text-accent hover:border-accent/50 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label={t('next')}
            className="absolute right-2 sm:right-6 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full glass border border-border flex items-center justify-center text-white hover:text-accent hover:border-accent/50 transition-colors"
          >
            <ChevronRight size={24} />
          </button>

          {/* Player */}
          <div
            className="relative w-full max-w-[min(420px,90vw)] aspect-[9/16] rounded-2xl overflow-hidden glow-border bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={modalVideoRef}
              key={VIDEOS[openIndex].src}
              src={VIDEOS[openIndex].src}
              poster={VIDEOS[openIndex].poster}
              autoPlay
              controls
              playsInline
              muted={muted}
              preload="auto"
              className="w-full h-full object-contain bg-black"
            />

            {/* Mute toggle */}
            <button
              type="button"
              onClick={() => {
                setMuted((m) => {
                  const next = !m;
                  if (modalVideoRef.current) modalVideoRef.current.muted = next;
                  return next;
                });
              }}
              aria-label={muted ? t('unmute') : t('mute')}
              className="absolute top-3 left-3 z-10 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:text-accent transition-colors"
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>

          {/* Counter dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {VIDEOS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex(i);
                }}
                aria-label={`${t('playLabel')} ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === openIndex ? 'w-6 bg-accent' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
