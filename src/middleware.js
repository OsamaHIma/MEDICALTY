import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
// import { parseISO } from "date-fns";
const roles = {
  hospital: { permissions: ["hospital"] },
  medical_center: { permissions: ["medical_center"] },
  doctor: { permissions: ["doctor"] },
  physiotherapist: { permissions: ["physiotherapist"] },
  social_researcher: { permissions: ["social_researcher"] },
  pharmacy: { permissions: ["pharmacy"] },
  lab: { permissions: ["lab"] },
  admin: {
    permissions: [
      "hospital",
      "medical_center",
      "doctor",
      "physiotherapist",
      "social_researcher",
      "pharmacy",
      "lab",
    ],
  },
};

const allowedPaths = {
  hospital: ["/dashboard/*"],
  medical_center: [
    "/dashboard/",
    "/dashboard/data/patients",
    "/dashboard/data/appointments",
    "/dashboard/data/reports",
    "/dashboard/data/invoices",
    "/dashboard/data/expenses",
    "/dashboard/data/products",
    "/dashboard/data/expertise",
    "/dashboard/data/schedule",
    "/dashboard/data/messages",
    "/dashboard/patient-evaluations",
  ],
  doctor: [
    "/dashboard/add-new-patient",
    "/dashboard/patients/receive-request",
    "/dashboard/add-new-report",
    "/dashboard/add-new-invoice",
    "/dashboard/add-new-expense",
    "/dashboard/add-new-request",
    "/dashboard/add-new-product",
    "/dashboard/add-new-service",
    "/dashboard/expertise",
    "/dashboard/schedule",
    "/dashboard/messages",
    "/dashboard/patient-evaluations",
  ],
  physiotherapist: [
    "/dashboard/patients/dashboard/add",
    "/dashboard/patients/dashboard/receive-request",
    "/dashboard/reports",
    "/dashboard/invoices",
    "/dashboard/expenses",
    "/dashboard/new-request",
    "/dashboard/products",
    "/dashboard/expertise",
    "/dashboard/schedule",
    "/dashboard/messages",
    "/dashboard/patient-evaluations",
  ],
  social_researcher: [
    "/dashboard/add-new-patient",
    "/dashboard/patients/receive-request",
    "/dashboard/reports",
    "/dashboard/invoices",
    "/dashboard/expenses",
    "/dashboard/patients/dashboard/new-request",
    "/dashboard/products",
    "/dashboard/expertise",
    "/dashboard/schedule",
    "/dashboard/messages",
    "/dashboard/patient-evaluations",
  ],
  pharmacy: [
    "/dashboard/add-new-patient",
    "/dashboard/patients/receive-request",
    "/dashboard/add-new-report",
    "/dashboard/add-new-invoice",
    "/dashboard/add-new-expense",
    "/dashboard/add-new-request",
    "/dashboard/add-new-product",
    "/dashboard/add-new-service",
    "/dashboard/add-new-lab",
    "/dashboard/schedule",
    "/dashboard/messages",
    "/dashboard/add-new-insurance-company",
  ],
  lab: [
    "/dashboard/add-new-patient",
    "/dashboard/patients/receive-request",
    "/dashboard/reports",
    "/dashboard/invoices",
    "/dashboard/expenses",
    "/dashboard/patients/new-request",
    "/dashboard/products",
    "/dashboard/expertise",
    "/dashboard/schedule",
    "/dashboard/messages",
    "/dashboard/patient-evaluations",
  ],
};
const checkPermissions = (userRole, pathname) => {
  if (!roles[userRole]) {
    return false;
  }
  if (userRole === "hospital" || "pharmacy" || "admin" || "center") {
    return true;
  }
  const userPermissions = roles[userRole].permissions;
  if (!userPermissions) {
    return false;
  }
  if (userPermissions.includes("admin")) {
    return true;
  }
  const allowedPathsForUserRole = allowedPaths[userRole];
  const userHasAccess = allowedPathsForUserRole.includes(
    pathname.replace(/\/+$/, "")
  );

  return userHasAccess;
};

export async function middleware(req) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl.pathname;

  // Check if the user already has access to the requested resource
  if (session) {
    const userRole = session.user.userRole;

    const hasAccess = checkPermissions(userRole, pathname);

    if (hasAccess) {
      return NextResponse.next();
    }
  }

  // Redirect the user if they are not logged in
  if (!session) {
    if (pathname === "/" || pathname.includes("/dashboard")) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // Check if the token is about to expire and send a refresh request if needed
  // if (session) {
  //   const userRole = session.user.userRole;
  //   const expires = session.expires;
  //   const expirationDate = parseISO(expires);
  //   const currentTime = new Date();
  //   const timeDiff = expirationDate.getTime() - currentTime.getTime();
  //   const refreshThreshold = 5 * 60 * 1000; // 5 minutes in milliseconds
  //   if (timeDiff < refreshThreshold) {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASE_API_URL}/${userRole}/refresh`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           token: session.user.token,
  //         }),
  //       }
  //     );

  //     const data = await response.json();

  //     if (data.token) {
  //       session.user.token = data.token;
  //       session.expires = data.expires;
  //     } else {
  //       // Handle the refresh error
  //       console.error("Refresh error:", data.error);
  //     }
  //   }
  // }

  // Redirect the user if they do not have access to the requested resource
  if (session) {
    const userRole = session.user.userRole;
    const hasAccess = checkPermissions(userRole, pathname);
    if (!hasAccess) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // Skip the redirection logic if the current URL is the login page
  if (session && (pathname.includes("/auth") || pathname === "/")) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/auth/login", "/dashboard"],
};
