import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { MemberDataLogin } from './app/models/member-data-login.model';

// Interface cho decoded token

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token');
    const { pathname } = req.nextUrl;
    const allowedPaths = [
        "/api/login",
        "/api/register",
        "/api/member",
    ];
    
    if (allowedPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }
    if (!token) {
        if (req.nextUrl.pathname.startsWith('/api')) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        return NextResponse.redirect(new URL('/login', req.url));
    }
    try {
        const decoded = jwtDecode<MemberDataLogin>(token.value);
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set('x-user-data', JSON.stringify(decoded));
        const response = NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
        return response;
    } catch (error) {
        if (req.nextUrl.pathname.startsWith('/api')) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: [
        '/((?!login|register|public|_next/static|_next/image|favicon.ico|globe.svg|window.svg|file.svg).*)',
    ],
};