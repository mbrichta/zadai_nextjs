import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale } from "./constants/locales";
import { i18nConfig } from "./i18n-config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Log the incoming request path right away
  console.log("[middleware] Incoming request:", pathname);

  // --- Example: check if path starts with /en (default locale) ---
  if (
    pathname.startsWith(`/${defaultLocale}/`) ||
    pathname === `/${defaultLocale}`
  ) {
    console.log(
      `[middleware] Detected default locale in path; rewriting to root`
    );
    return NextResponse.redirect(
      new URL(
        pathname.replace(
          `/${defaultLocale}`,
          pathname === `/${defaultLocale}` ? "/" : ""
        ),
        request.url
      )
    );
  }

  // --- Example: check if the pathname has any known locale at the start ---
  const pathnameIsMissingLocale = i18nConfig.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  console.log(
    "[middleware] pathnameIsMissingLocale =",
    pathnameIsMissingLocale
  );

  if (pathnameIsMissingLocale) {
    console.log(
      `[middleware] Missing locale, rewriting to /${defaultLocale}${pathname}`
    );
    return NextResponse.rewrite(
      new URL(
        `/${defaultLocale}${pathname}${request.nextUrl.search}`,
        request.url
      )
    );
  }

  // If none of the above conditions apply, just return NextResponse.next()
  console.log(
    "[middleware] No rewrites/redirects, letting request pass through"
  );
  return NextResponse.next();
}

export const config = {
  // Make sure your matcher is set correctly for the routes you want
  matcher: [
    // Example: skip internal paths like _next, or skip favicons, sw.js, etc.
    "/((?!_next|favicon.ico|sw.js|manifest.json|robots.txt).*)",
    "/",
  ],
};
