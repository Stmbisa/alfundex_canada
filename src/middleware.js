// import NextAuth from "next-auth";
// import { authConfig } from "./lib/auth.config";

// export default NextAuth(authConfig).auth;

// export const config = {
//   matcher: ["/((?!api|static|.*\\..*|_next).*)"],
// };

// // FOR MORE INFORMATION CHECK: https://nextjs.org/docs/app/building-your-application/routing/middleware

// middleware.js

const { NextResponse } = require("next/server");

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req) {
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  if (req.nextUrl.locale === "default") {
    const locale = "en";
    return NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    );
  }
}
