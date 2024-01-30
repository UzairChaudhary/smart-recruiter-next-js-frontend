import { NextResponse } from 'next/server'
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const path = request.nextUrl.pathname
    //const isPublicPath = path==='/login'||path==='/signup' || path==='/verifyemail'
    const token = request.cookies.get("token")?.value || null
    // if (isPublicPath && token){
    //     return NextResponse.redirect(new URL('/',request.nextUrl))
    // }
    //console.log("request token: ", token)
    
    if (path.includes('/apply') && token===null){
        //console.log(path)
        
        //console.log(token)
        return NextResponse.redirect(new URL(
            '/',
            request.nextUrl
        ))

    }
}
 
// See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     '/apply/:path',
//   ]
// }