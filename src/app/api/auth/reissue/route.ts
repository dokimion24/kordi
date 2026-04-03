import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIES, COOKIE_OPTIONS } from "@/shared/config/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(AUTH_COOKIES.REFRESH_TOKEN)?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  const res = await fetch(`${BASE_URL}/api/auth/reissue`, {
    method: "POST",
    headers: { Authorization: `Bearer ${refreshToken}` },
  });

  if (!res.ok) {
    const response = NextResponse.json(
      { error: "Refresh failed" },
      { status: 401 },
    );
    response.cookies.delete(AUTH_COOKIES.ACCESS_TOKEN);
    response.cookies.delete(AUTH_COOKIES.REFRESH_TOKEN);
    return response;
  }

  const data = await res.json();
  const tokens = data.data;

  const response = NextResponse.json({ success: true });

  response.cookies.set(AUTH_COOKIES.ACCESS_TOKEN, tokens.accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: 30 * 60,
  });

  response.cookies.set(AUTH_COOKIES.REFRESH_TOKEN, tokens.refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: 14 * 24 * 60 * 60,
  });

  return response;
}
