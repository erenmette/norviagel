'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function FloatingBottle() {
  const [scrollY, setScrollY] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      // Fade out between 1200-1600px scroll
      if (y < 1200) setOpacity(1);
      else if (y > 1600) setOpacity(0);
      else setOpacity(1 - (y - 1200) / 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cap the downward movement so the bottle stops
  const maxTravel = 600;
  const travel = Math.min(scrollY * 0.35, maxTravel);
  const rotate = Math.sin(scrollY * 0.002) * 8;
  const scale = Math.max(1 - scrollY * 0.0002, 0.7);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 right-0 w-full h-screen pointer-events-none z-30"
      style={{ opacity }}
    >
      <div
        className="absolute right-[5%] sm:right-[10%] lg:right-[15%]"
        style={{
          top: `calc(50vh - 180px + ${travel}px)`,
          transform: `rotate(${rotate}deg) scale(${scale})`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Glow behind bottle */}
        <div className="absolute inset-0 -m-8 rounded-full bg-accent/10 blur-3xl" />
        <Image
          src="/images/bottle.png"
          alt="Norvia Gel Glove"
          width={280}
          height={380}
          className="relative drop-shadow-[0_0_30px_rgba(0,163,255,0.3)] select-none"
          style={{ filter: 'drop-shadow(0 10px 40px rgba(0,163,255,0.2))' }}
          priority
          draggable={false}
        />
      </div>
    </div>
  );
}
