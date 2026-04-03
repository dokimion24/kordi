import ky from "ky";
import { API_BASE_URL } from "@/shared/config/api";

/**
 * Client-side API client (browser)
 * For public endpoints that don't need auth cookies
 */
export const publicApiClient = ky.create({
  prefixUrl: API_BASE_URL,
});
