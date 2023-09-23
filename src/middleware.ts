import api from "@/services/api";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token");
  const loginUrl = new URL("/login", request.url);

  if (!token) {
    if (request.nextUrl.pathname === "/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/"],
};
