import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const locales = ['fr', 'en'];
const defaultLocale = 'fr';

const protectedRoutes = ['/crm', '/finance', '/projets', '/analytics', '/ai'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname) ||
    pathname === '/access-denied'
  ) {
    return;
  }

  // Si la locale est déjà dans l'URL, ne rien faire
  if (locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)) {
    return;
  }

  // Protection des routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const token = req.cookies.get('authToken');
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/access-denied';
      return NextResponse.redirect(url);
    }
    // Autorisé : ne pas injecter la locale
    return NextResponse.next();
  }

  // Sinon, rediriger vers la locale par défaut
  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|static|.*\..*).*)'],
};
