import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Clock } from 'lucide-react';
import { getAllPosts, getPostContent } from '@/lib/blog';

const BASE_URL = 'https://norviaeu.com';

type Props = { params: Promise<{ locale: string }> };

const UI = {
  nl: {
    eyebrow: 'Norvia Kennisbank',
    title: 'Blog over handbescherming',
    subtitle: 'Praktische tips over een vloeibare handschoen, vuile handen voorkomen, verf van je handen verwijderen en het beschermen van je huid op het werk.',
    readTime: 'min lezen',
    metaTitle: 'Blog: handbescherming en vloeibare handschoen | Norvia Gel Glove',
    metaDescription: 'Lees praktische tips over handbescherming, een vloeibare handschoen, vuile handen voorkomen en verf van je handen verwijderen voor monteurs, schilders en kappers.',
  },
  en: {
    eyebrow: 'Norvia Knowledge Base',
    title: 'Blog about hand protection',
    subtitle: 'Practical tips about a liquid glove, preventing dirty hands, removing paint from your skin and protecting your hands at work.',
    readTime: 'min read',
    metaTitle: 'Blog: hand protection and liquid glove | Norvia Gel Glove',
    metaDescription: 'Read practical tips about hand protection, a liquid glove, preventing dirty hands and removing paint from your hands for mechanics, painters and hairdressers.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const ui = locale === 'en' ? UI.en : UI.nl;
  const canonical = `${BASE_URL}/${locale}/blog`;
  return {
    title: ui.metaTitle,
    description: ui.metaDescription,
    alternates: {
      canonical,
      languages: {
        nl: `${BASE_URL}/nl/blog`,
        en: `${BASE_URL}/en/blog`,
        'x-default': `${BASE_URL}/nl/blog`,
      },
    },
    openGraph: {
      title: ui.metaTitle,
      description: ui.metaDescription,
      url: canonical,
      siteName: 'Norvia Gel Glove',
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: 'website',
    },
  };
}

function formatDate(date: string, locale: string) {
  return new Date(date).toLocaleDateString(locale === 'en' ? 'en-GB' : 'nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ui = locale === 'en' ? UI.en : UI.nl;
  const posts = getAllPosts();

  return (
    <div className="pt-28 sm:pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-accent font-medium text-sm uppercase tracking-wider">{ui.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-3">{ui.title}</h1>
          <p className="text-text-secondary text-lg mt-4 leading-relaxed">{ui.subtitle}</p>
        </div>

        {/* Posts grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {posts.map((post) => {
            const c = getPostContent(post, locale);
            const tag = locale === 'en' ? post.tag.en : post.tag.nl;
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group glass rounded-2xl overflow-hidden border border-border hover:border-accent/40 transition-all duration-300 flex flex-col card-hover"
              >
                <div className="relative h-44 bg-gradient-to-br from-accent/10 to-transparent flex items-center justify-center overflow-hidden">
                  <Image
                    src={post.image}
                    alt={c.title}
                    width={200}
                    height={200}
                    className="h-36 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 text-xs font-semibold text-accent bg-primary-dark/80 backdrop-blur px-3 py-1 rounded-full border border-accent/20">
                    {tag}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="text-lg font-bold text-white group-hover:text-accent transition-colors leading-snug">
                    {c.title}
                  </h2>
                  <p className="text-text-muted text-sm mt-2 leading-relaxed flex-1">{c.excerpt}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <span className="text-xs text-text-muted flex items-center gap-1.5">
                      <Clock size={13} /> {c.readMinutes} {ui.readTime}
                    </span>
                    <span className="text-accent text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      {formatDate(post.date, locale)}
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
