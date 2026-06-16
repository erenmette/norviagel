import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, Clock, ChevronRight } from 'lucide-react';
import { getAllPosts, getPost, getPostContent } from '@/lib/blog';
import ArticleBody from '@/components/blog/ArticleBody';
import { ArticleJsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/ArticleJsonLd';

const BASE_URL = 'https://norviaeu.com';

type Props = { params: Promise<{ locale: string; slug: string }> };

const UI = {
  nl: { blog: 'Blog', home: 'Home', back: 'Terug naar blog', readTime: 'min lezen', cta: 'Bekijk product', more: 'Meer artikelen', b2bLine: 'Bestel je voor een team of bedrijf?', b2bLink: 'Bekijk onze B2B-pagina' },
  en: { blog: 'Blog', home: 'Home', back: 'Back to blog', readTime: 'min read', cta: 'View product', more: 'More articles', b2bLine: 'Ordering for a team or company?', b2bLink: 'See our B2B page' },
};

export function generateStaticParams() {
  return getAllPosts().flatMap((p) => [
    { locale: 'nl', slug: p.slug },
    { locale: 'en', slug: p.slug },
  ]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const c = getPostContent(post, locale);
  const canonical = `${BASE_URL}/${locale}/blog/${slug}`;
  const image = `${BASE_URL}${post.image}`;
  return {
    title: c.metaTitle,
    description: c.description,
    keywords: c.keywords,
    alternates: {
      canonical,
      languages: {
        nl: `${BASE_URL}/nl/blog/${slug}`,
        en: `${BASE_URL}/en/blog/${slug}`,
        'x-default': `${BASE_URL}/nl/blog/${slug}`,
      },
    },
    openGraph: {
      title: c.metaTitle,
      description: c.description,
      url: canonical,
      siteName: 'Norvia Gel Glove',
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: 'article',
      publishedTime: post.date,
      images: [{ url: image }],
    },
    twitter: { card: 'summary_large_image', title: c.metaTitle, description: c.description, images: [image] },
  };
}

function formatDate(date: string, locale: string) {
  return new Date(date).toLocaleDateString(locale === 'en' ? 'en-GB' : 'nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(slug);
  if (!post) notFound();

  const c = getPostContent(post, locale);
  const ui = locale === 'en' ? UI.en : UI.nl;
  const tag = locale === 'en' ? post.tag.en : post.tag.nl;
  const faqBlock = c.blocks.find((b) => b.type === 'faq');
  const faqItems = faqBlock && faqBlock.type === 'faq' ? faqBlock.items : [];
  const canonical = `${BASE_URL}/${locale}/blog/${slug}`;
  const others = getAllPosts().filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <article className="pt-28 sm:pt-32 pb-20">
      <ArticleJsonLd
        headline={c.title}
        description={c.description}
        image={`${BASE_URL}${post.image}`}
        datePublished={post.date}
        url={canonical}
      />
      {faqItems.length > 0 && <FaqJsonLd items={faqItems} />}
      <BreadcrumbJsonLd
        items={[
          { name: ui.home, url: `${BASE_URL}/${locale}` },
          { name: ui.blog, url: `${BASE_URL}/${locale}/blog` },
          { name: c.title, url: canonical },
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-6 flex-wrap">
          <Link href="/" className="hover:text-accent transition-colors">{ui.home}</Link>
          <ChevronRight size={13} />
          <Link href="/blog" className="hover:text-accent transition-colors">{ui.blog}</Link>
          <ChevronRight size={13} />
          <span className="text-text-secondary truncate max-w-[200px]">{c.title}</span>
        </nav>

        {/* Header */}
        <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
          {tag}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mt-4 leading-tight">{c.title}</h1>
        <div className="flex items-center gap-4 text-sm text-text-muted mt-4">
          <span>{formatDate(post.date, locale)}</span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} /> {c.readMinutes} {ui.readTime}
          </span>
        </div>

        {/* Hero image */}
        <div className="relative h-56 sm:h-72 mt-8 rounded-2xl glass glow-border overflow-hidden flex items-center justify-center bg-gradient-to-br from-accent/10 to-transparent">
          <Image src={post.image} alt={c.title} width={280} height={280} className="h-44 sm:h-56 w-auto object-contain" priority />
        </div>

        {/* Body */}
        <div className="mt-10">
          <ArticleBody blocks={c.blocks} ctaLabel={ui.cta} />
        </div>

        {/* B2B note */}
        <p className="mt-6 text-sm text-text-muted">
          {ui.b2bLine}{' '}
          <Link href="/b2b" className="text-accent hover:underline">{ui.b2bLink}</Link>
        </p>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/blog" className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all font-medium">
            <ArrowLeft size={18} /> {ui.back}
          </Link>
        </div>

        {/* Related */}
        {others.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-white mb-5">{ui.more}</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {others.map((p) => {
                const oc = getPostContent(p, locale);
                return (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group glass rounded-xl p-4 border border-border hover:border-accent/40 transition-colors"
                  >
                    <p className="text-xs text-accent font-medium">{locale === 'en' ? p.tag.en : p.tag.nl}</p>
                    <p className="text-sm font-semibold text-white mt-1 group-hover:text-accent transition-colors leading-snug">
                      {oc.title}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
