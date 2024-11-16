import { NextRequest, NextResponse } from 'next/server'
// 1. Specify protected and public routes
// TODO: REVISIT WHICH ROUTES ARE PUBLIC VS. PRIVATE
const protectedRoutes = ['/exercises/noteAddition', 
                        '/exercises/completeMeasure',
                        '/exercises/typeRhythm',
                        '/exercises/notationIdentification']
const publicRoutes = ['/login', '/signup', '/']
 
export default async function middleware(req: NextRequest) {
  console.log("Middleware is running...");

  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
 
  // 3. Get the username from the cookie
  const username = req.cookies.get('username')?.value
  console.log(`Middleware active: Path = ${path}, Username = ${username}`);

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && (username==null || username==undefined)) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
 
  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    username !=null &&
    username != undefined &&
    !req.nextUrl.pathname.startsWith('/exercises')
  ) {
    return NextResponse.redirect(new URL('/exercises', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}