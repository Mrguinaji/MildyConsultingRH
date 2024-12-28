import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes protégées qui nécessitent une authentification
const protectedRoutes = ['/admin', '/api/admin']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Vérifier si la route est protégée
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute) {
    const basicAuth = request.headers.get('authorization')

    if (!basicAuth) {
      return new NextResponse(null, {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Administration"'
        }
      })
    }

    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    // Vérifier les identifiants d'administrateur
    if (user !== 'Guinaji' || pwd !== 'Guinaji@0') {
      return new NextResponse(null, {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Administration"'
        }
      })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ]
} 