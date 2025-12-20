import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Protected routes that require authentication
const protectedRoutes = ['/dashboard', '/builder'];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the route is protected
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    if (isProtectedRoute) {
        // Use process.env.NEXTAUTH_SECRET or a fallback for development
        // WARNING: In production, always ensure NEXTAUTH_SECRET is set in environment vars.
        const secret = process.env.NEXTAUTH_SECRET || 'development_secret_reforge_2025';
        
        const token = await getToken({
            req: request,
            secret: secret,
        });

        if (!token) {
            // Redirect to login if not authenticated
            const url = new URL('/auth/login', request.url);
            url.searchParams.set('callbackUrl', pathname);
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/builder/:path*'],
};
