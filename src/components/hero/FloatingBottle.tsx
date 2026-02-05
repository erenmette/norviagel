'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function FloatingBottle() {
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();

  // Only show on homepage
  const isHome = pathname === '/' || pathname === '/nl' || pathname === '/en';

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  if (!isHome) return null;

  // Diagonal movement: starts top-left area, moves to bottom-right
  // Active between scroll 200-900px, then fades out
  const startScroll = 200;
  const endScroll = 900;
  const fadeStart = 750;

  const progress = Math.max(0, Math.min((scrollY - startScroll) / (endScroll - startScroll), 1));
  const opacity = scrollY < startScroll ? 0
    : scrollY > fadeStart ? Math.max(0, 1 - (scrollY - fadeStart) / 200)
    : Math.min((scrollY - startScroll) / 100, 1);

  const xStart = 15; // % from left
  const xEnd = 70;
  const yStart = 30; // vh
  const yEnd = 70;

  const x = xStart + (xEnd - xStart) * progress;
  const y = yStart + (yEnd - yStart) * progress;
  const rotate = -10 + progress * 20;
  const scale = 0.6 + Math.sin(progress * Math.PI) * 0.15;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-20"
      style={{ opacity }}
    >
      <div
        className="absolute"
        style={{
          left: `${x}%`,
          top: `${y}vh`,
          transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div className="absolute inset-0 -m-6 rounded-full bg-accent/8 blur-2xl" />
        <Image
          src="/images/bottle.png"
          alt="Norvia Gel Glove"
          width={180}
          height={240}
          className="relative select-none opacity-40"
          style={{ filter: 'drop-shadow(0 8px 24px rgba(0,163,255,0.15))' }}
          priority
          draggable={false}
        />
      </div>
    </div>
  );
}
