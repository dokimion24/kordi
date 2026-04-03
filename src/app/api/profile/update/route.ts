import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import ky from "ky";
import { AUTH_COOKIES } from "@/shared/config/auth";
import { API_BASE_URL } from "@/shared/config/api";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN)?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  try {
    const data = await ky
      .patch(`${API_BASE_URL}/api/users/me/profile`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        json: body,
      })
      .json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
}
