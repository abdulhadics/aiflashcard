import { NextResponse } from 'next/server';
import { clerkMiddleware } from '@clerk/nextjs';

export default clerkMiddleware({
  // Optional configurations can be added here
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
