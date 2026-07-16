import { NextResponse } from "next/server";
import { AUTH_COOKIES } from "@/shared/config/auth";
import {
  reissueTokens,
  setAuthCookies,
} from "@/shared/api/auth-tokens.server";

export async function POST() {
  const tokens = await reissueTokens();

  if (!tokens) {
    const response = NextResponse.json(
      { error: "Refresh failed" },
      { status: 401 },
    );
    response.cookies.delete(AUTH_COOKIES.ACCESS_TOKEN);
    response.cookies.delete(AUTH_COOKIES.REFRESH_TOKEN);
    return response;
  }

  const response = NextResponse.json({ success: true });
  setAuthCookies(response, tokens);
  return response;
}
