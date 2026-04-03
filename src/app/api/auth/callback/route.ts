import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIES, COOKIE_OPTIONS, TOKEN_TTL } from "@/shared/config/auth";
import { ROUTES } from "@/shared/config/routes";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  const response = NextResponse.redirect(new URL(ROUTES.HOME, request.url));

  response.cookies.set(AUTH_COOKIES.ACCESS_TOKEN, accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: TOKEN_TTL.ACCESS_TOKEN,
  });

  response.cookies.set(AUTH_COOKIES.REFRESH_TOKEN, refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: TOKEN_TTL.REFRESH_TOKEN,
  });

  return response;
}
