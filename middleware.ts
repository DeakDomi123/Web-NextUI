import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('pb_token')?.value;
  const { pathname } = req.nextUrl;

  // Általános útvonalak, amelyeket nem ellenőriztetek
  const publicPaths = ['/authentication/login', '/authentication/register', '/api'];

  // Ha az útvonal publikus, engedjük tovább
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Ha van token akkor továbbítja a quiz oldara, ha nincsa akkor a login oldalra
  if (token) {
    if (pathname.startsWith('/quiz')) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/quiz', req.url));
  } else {
    if (pathname.startsWith('/quiz')) {
      return NextResponse.redirect(new URL('/authentication/login', req.url));
    }
    return NextResponse.redirect(new URL('/authentication/login', req.url));
  }
}

export const config = {
  matcher: '/((?!api|_next/static|favicon.ico).*)',
};
