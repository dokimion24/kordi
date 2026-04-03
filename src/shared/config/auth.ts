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

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  PIANO: "/piano",
  CHORD_QUIZ: "/chord-quiz",
} as const;

export const PUBLIC_ROUTES = [ROUTES.HOME, ROUTES.LOGIN, ROUTES.PIANO] as const;
