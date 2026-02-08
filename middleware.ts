import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './src/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Get the country from Vercel's geo header
  const country = request.headers.get('x-vercel-ip-country') || '';

  // Check if user is from Netherlands or Belgium
  const isDutchRegion = ['NL', 'BE'].includes(country.toUpperCase());

  // Get the pathname to check if a locale is already specified
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = /^\/(nl|en)(\/|$)/.test(pathname);

  // If no locale is specified in the URL and user is outside NL/BE,
  // redirect to English version
  if (!pathnameHasLocale && !isDutchRegion && country !== '') {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    return NextResponse.redirect(url);
  }

  // Otherwise, use the default next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(nl|en)/:path*'],
};
