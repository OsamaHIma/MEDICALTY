import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { parseISO } from "date-fns";
// import { parseISO } from "date-fns";
const roles = {
  hospital: { permissions: ["hospital"] },
  medical_center: { permissions: ["medical_center"] },
  doctor: { permissions: ["doctor"] },
  physiotherapist: { permissions: ["doctor"] },
  social_researcher: { permissions: ["doctor"] },
  pharmacy: { permissions: ["pharmacy"] },
  lab: { permissions: ["lab"] },
  insuranceCompany: { permissions: ["insuranceCompany"] },
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
  doctor: [
    "/dashboard/add-new-report",
    "/dashboard",
    "/dashboard/account",
    "/dashboard/add-new-patient",
    "/dashboard/add-new-invoice",
    "/dashboard/add-new-expense",
    "/dashboard/add-new-request",
    "/dashboard/add-new-product",
    "/dashboard/add-new-service",
    "/dashboard/expertise",
    // "/dashboard/schedule",
    "/dashboard/calendar",
    "/dashboard/add-new-lab",
    "/dashboard/messages",
    "/dashboard/patient-evaluations",
  ],
  pharmacy: [
    "/dashboard/add-new-patient",
    "/dashboard/data/labs/all",
    "/dashboard",
    "/dashboard/account",
    "/dashboard/calendar",
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
    "/dashboard",
    "/dashboard/account",
    "/dashboard/calendar",
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
  insuranceCompany: [
    "/dashboard/add-new-employee",
    "/dashboard",
    "/dashboard/account",
    "/dashboard/calendar",
    "/dashboard/add-new-patient",
    "/dashboard/add-new-client",
    "/dashboard/add-new-section",
    "/dashboard/add-new-pharmacy",
    "/dashboard/add-new-invoice",
    "/dashboard/add-new-product",
    "/dashboard/data/employees",
    "/dashboard/expenses",
  ],
};
const checkPermissions = (userRole, pathname) => {
  if (!roles[userRole]) {
    return false;
  }

  if (
    userRole === "hospital" ||
    userRole === "admin" ||
    userRole === "medical_center"
  ) {
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
    // Redirect the user to the first allowed path for their role or the URL they came from
    else {
      const allowedPathsForUserRole = allowedPaths[userRole];
      const redirectPath = allowedPathsForUserRole[0];

      return NextResponse.redirect(new URL(redirectPath, req.url));
    }
  }

  // Redirect the user if they are not logged in
  if (!session) {
    if (pathname === "/" || pathname.includes("/dashboard")) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // Skip the redirection logic if the current URL is the login page
  if (session && (pathname.includes("/auth") || pathname === "/")) {
    return NextResponse.next();
  }

  // Check if the token is about to expire and send a refresh request if needed

  if (session) {
    const userRole = session.user.userRole;
    const expires = session.expires;
    const expirationDate = parseISO(expires);
    const currentTime = new Date();
    const timeDiff = expirationDate.getTime() - currentTime.getTime();
    const refreshThreshold = 5 * 60 * 1000; // 5 minutes in milliseconds
    if (timeDiff < refreshThreshold) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/${userRole}/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: session.user.token,
          }),
        }
      );

      const data = await response.json();

      if (data.token) {
        session.user.token = data.token;
        session.expires = data.expires;
      } else {
        // Handle the refresh error
        console.error("Refresh error:", data.error);
      }
    }
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/auth/login", "/dashboard"],
};
