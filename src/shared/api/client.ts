import ky, { type KyInstance } from "ky";
import { cookies } from "next/headers";
import { AUTH_COOKIES } from "@/shared/config/auth";
import { API_BASE_URL } from "@/shared/config/api";

/**
 * Server-side API client (RSC, Route Handlers, Server Actions)
 * Reads httpOnly cookies and forwards as Bearer token
 */
export const apiClient: KyInstance = ky.create({
  prefixUrl: API_BASE_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        // Respect an explicitly provided Authorization header (e.g. retry
        // with a freshly reissued token) — only fill from the cookie if absent
        if (request.headers.has("Authorization")) return;
        const cookieStore = await cookies();
        const accessToken = cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN)?.value;
        if (accessToken) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      },
    ],
  },
});
