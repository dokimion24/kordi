import { cookies } from "next/headers";
import ky from "ky";
import type { NextResponse } from "next/server";
import { API_BASE_URL } from "@/shared/config/api";
import { AUTH_COOKIES, COOKIE_OPTIONS, TOKEN_TTL } from "@/shared/config/auth";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * Exchanges the refresh-token cookie for a fresh token pair against the
 * Spring API. Returns null when there is no refresh token or reissue fails.
 */
export async function reissueTokens(): Promise<AuthTokens | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(AUTH_COOKIES.REFRESH_TOKEN)?.value;
  if (!refreshToken) return null;

  try {
    const res = await ky
      .post(`${API_BASE_URL}/api/auth/reissue`, {
        headers: { Authorization: `Bearer ${refreshToken}` },
      })
      .json<{ data: AuthTokens }>();
    return res.data;
  } catch {
    return null;
  }
}

export function setAuthCookies(response: NextResponse, tokens: AuthTokens) {
  response.cookies.set(AUTH_COOKIES.ACCESS_TOKEN, tokens.accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: TOKEN_TTL.ACCESS_TOKEN,
  });
  response.cookies.set(AUTH_COOKIES.REFRESH_TOKEN, tokens.refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: TOKEN_TTL.REFRESH_TOKEN,
  });
}
