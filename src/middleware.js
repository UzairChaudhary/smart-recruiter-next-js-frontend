// middleware.js
import { NextResponse } from 'next/server';
import { hasCookie } from 'cookies-next';
import { toast } from 'react-hot-toast';

// Array of forbidden routes
const forbiddenRoutes = ["apply"];

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // Check if the path exactly matches any of the forbidden routes
  if (forbiddenRoutes.some(route => path.includes(`/${route}`)) && !hasCookie("token")) {
    toast.error("Please login");
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // Allow access if the user is logged in
  return NextResponse.next();
}
