import NextAuth, { Session } from "next-auth";
import authConfig from "./auth.config";
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "./routes";

const {auth}= NextAuth(authConfig)
import { NextRequest, NextResponse } from 'next/server';

export default auth(
	(req: NextRequest & { auth: Session | null }): Response | void => {
    console.log("ROUTE: ", req.nextUrl.pathname);
    // const {nextUrl} = req;
    // const isLoggedIn = !!req.auth;
    // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)

    // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    // const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    // if(isApiAuthRoute){
    //     return null;
    // }
    // if(isAuthRoute){
    //     if(isLoggedIn){
    //         return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl));
    //     }
    //     return null;
    // }
    // if(!isLoggedIn && !isPublicRoute){
    //     return Response.redirect(new URL("/auth/login",nextUrl))
    // }
    return NextResponse.next() ;
  // req.auth
})

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
        // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+\\.[\\w]+$|_next).*)",

    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)"
  ],
}