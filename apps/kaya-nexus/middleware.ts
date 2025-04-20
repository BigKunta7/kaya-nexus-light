import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const locales = ['fr', 'en'];
const defaultLocale = 'fr';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Si la locale est déjà dans l'URL, ne rien faire
  if (locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)) {
    return;
  }

  // Sinon, rediriger vers la locale par défaut
  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|static|.*\..*).*)'],
};
