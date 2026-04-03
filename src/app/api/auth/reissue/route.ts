import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import ky from "ky";
import { AUTH_COOKIES, COOKIE_OPTIONS, TOKEN_TTL } from "@/shared/config/auth";
import { API_BASE_URL } from "@/shared/config/api";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(AUTH_COOKIES.REFRESH_TOKEN)?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  try {
    const tokens = await ky
      .post(`${API_BASE_URL}/api/auth/reissue`, {
        headers: { Authorization: `Bearer ${refreshToken}` },
      })
      .json<{ accessToken: string; refreshToken: string }>();

    const response = NextResponse.json({ success: true });

    response.cookies.set(AUTH_COOKIES.ACCESS_TOKEN, tokens.accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: TOKEN_TTL.ACCESS_TOKEN,
    });

    response.cookies.set(AUTH_COOKIES.REFRESH_TOKEN, tokens.refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: TOKEN_TTL.REFRESH_TOKEN,
    });

    return response;
  } catch {
    const response = NextResponse.json(
      { error: "Refresh failed" },
      { status: 401 },
    );
    response.cookies.delete(AUTH_COOKIES.ACCESS_TOKEN);
    response.cookies.delete(AUTH_COOKIES.REFRESH_TOKEN);
    return response;
  }
}
