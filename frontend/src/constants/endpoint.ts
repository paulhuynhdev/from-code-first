export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ENDPOINT = {
  DEV: `${API_BASE_URL}`,
  TEST: `${API_BASE_URL}/test`,
} as const;

export const ROUTES = {
  APP_ROOT: "/",
  REGISTER: "/register",
} as const;
