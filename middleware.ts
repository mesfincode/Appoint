import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse, NextRequest } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/'])

export default clerkMiddleware((auth, req) => {
  console.log("ssssssss: ",req.nextUrl.pathname)
  if(req.nextUrl.pathname.startsWith("/api")){
    return;
  }
  if (!isPublicRoute(req)) auth().protect();
  const { userId } = auth();
  console.log(userId)
  if (userId && isPublicRoute(req)) return NextResponse.redirect(new URL('/home',req.url));

});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};