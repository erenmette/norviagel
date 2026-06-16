import { Link } from '@/i18n/navigation';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import type { BlogBlock } from '@/lib/blog';

export default function ArticleBody({
  blocks,
  ctaLabel,
}: {
  blocks: BlogBlock[];
  ctaLabel: string;
}) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2 key={i} className="text-2xl sm:text-3xl font-bold text-white mt-10 mb-1">
                {block.text}
              </h2>
            );
          case 'p':
            return (
              <p key={i} className="text-text-secondary leading-relaxed text-base sm:text-lg">
                {block.text}
              </p>
            );
          case 'ul':
            return (
              <ul key={i} className="space-y-3 py-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-text-secondary leading-relaxed">
                    <CheckCircle2 size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case 'faq':
            return (
              <div key={i} className="space-y-3 mt-8">
                {block.items.map((f, j) => (
                  <div key={j} className="glass rounded-2xl p-5 sm:p-6">
                    <p className="text-white font-semibold mb-2">{f.q}</p>
                    <p className="text-text-secondary leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            );
          case 'cta':
            return (
              <div
                key={i}
                className="glass glow-border rounded-2xl p-6 mt-10 flex flex-col sm:flex-row sm:items-center gap-4 justify-between"
              >
                <p className="text-white text-lg">{block.text}</p>
                <Link
                  href="/product"
                  className="btn-primary inline-flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {ctaLabel}
                  <ArrowRight size={18} />
                </Link>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
