import ky from "ky";
import { cookies } from "next/headers";
import { AUTH_COOKIES } from "@/shared/config/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export const apiClient = ky.create({
  prefixUrl: BASE_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN)?.value;
        if (accessToken) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      },
    ],
  },
});
