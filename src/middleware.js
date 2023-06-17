// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// export async function middleware(req) {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("token")) {
//     const pathname = req.nextUrl.pathname;
//     if (pathname === "/" || pathname.includes("/dashboard")) {
//       return NextResponse.redirect(new URL("/auth/login", req.url));
//     }
//     return NextResponse.next();
//   }

//   const token = authHeader.split(" ")[1];
//   try {
//     // Verify the JWT token using your secret key
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

//     // Attach the user object to the request for future use
//     req.user = decodedToken.user;

//     // Allow the request to proceed to the next middleware or route handler
//     return NextResponse.next();
//   } catch (err) {
//     // If the token is invalid or has expired, redirect to the login page
//     const pathname = req.nextUrl.pathname;
//     if (pathname === "/" || pathname.includes("/dashboard")) {
//       return NextResponse.redirect(new URL("/auth/login", req.url));
//     }
//     return NextResponse.next();
//   }
// }

// export const config = {
//   matcher: ["/", "/dashboard/:path*", "/auth/login", "/dashboard"],
// };

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl.pathname;
  if (!session) {
    if (pathname === "/" || pathname.includes("/dashboard")) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }
  if (session) {
    if (pathname.includes("/auth") || pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }
}
export const config = {
  matcher: ["/", "/dashboard/:path*", "/auth/login", "/dashboard"],
};