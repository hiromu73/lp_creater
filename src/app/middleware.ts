
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // 現在のパスを取得
    const path = req.nextUrl.pathname;

    // 未認証の場合は/auth/signinにリダイレクト
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
    return NextResponse.next();
  },

  {
    pages: {
      signIn: "/auth/signin",
    },
  }
);

// 保護したいパスを指定
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - auth (auth routes)
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/",  // ルートパスを保護
    "/((?!auth/signin|api|_next/static|_next/image|favicon.ico).*)",
  ],
};
