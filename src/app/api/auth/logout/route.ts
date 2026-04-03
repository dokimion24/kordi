import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import ky from "ky";
import { AUTH_COOKIES } from "@/shared/config/auth";
import { API_BASE_URL } from "@/shared/config/api";
import { ROUTES } from "@/shared/config/routes";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN)?.value;

  if (accessToken) {
    await ky
      .delete(`${API_BASE_URL}/api/auth/logout`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .catch(() => {});
  }

  const response = NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  response.cookies.delete(AUTH_COOKIES.ACCESS_TOKEN);
  response.cookies.delete(AUTH_COOKIES.REFRESH_TOKEN);
  return response;
}
