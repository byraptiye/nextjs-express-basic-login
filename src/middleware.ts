import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { axiosService } from './services/axiox'
 
export async function middleware(request: NextRequest) {
    if(!request.cookies.has('piirJWT')){
        request.cookies.clear()
        return NextResponse.redirect(new URL('/', request.url))
    }else{
        const token = request.cookies.get('piirJWT')?.value
        if(!token){
            console.log('token yok')
            return NextResponse.redirect(new URL('/', request.url))
        }else{
            const tokenResult = await axiosService.post('/auth/jwt',{token})
            const { data } = tokenResult.data
            if(Object.keys(data).length === 0){
                return NextResponse.redirect(new URL('/', request.url))
            }else{
                return NextResponse.next()
            }
        }
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
}