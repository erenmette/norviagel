'use client';

import { useRef, useEffect, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
};

export default function ScrollAnimationWrapper({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const getTransform = () => {
      switch (direction) {
        case 'up': return 'translateY(60px)';
        case 'down': return 'translateY(-60px)';
        case 'left': return 'translateX(60px)';
        case 'right': return 'translateX(-60px)';
      }
    };

    el.style.opacity = '0';
    el.style.transform = getTransform();
    el.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translate(0)';
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
