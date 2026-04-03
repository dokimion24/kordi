import { ROUTES } from "./routes";

export const AUTH_COOKIES = {
  ACCESS_TOKEN: "kordi_at",
  REFRESH_TOKEN: "kordi_rt",
} as const;

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export const TOKEN_TTL = {
  ACCESS_TOKEN: 30 * 60, // 30 minutes (seconds)
  REFRESH_TOKEN: 14 * 24 * 60 * 60, // 14 days (seconds)
} as const;

export const PUBLIC_ROUTES = [ROUTES.HOME, ROUTES.LOGIN, ROUTES.PIANO] as const;
