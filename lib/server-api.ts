import { cookies } from "next/headers";

export const TOKEN_COOKIE = "asoose_access_token";
export const DEMO_COOKIE = "asoose_demo_session";

export const apiBaseUrl = process.env.ASOOSE_API_BASE_URL?.replace(/\/$/, "");

export async function getAccessToken() {
  return (await cookies()).get(TOKEN_COOKIE)?.value;
}

export async function upstream(path: string, init: RequestInit = {}) {
  if (!apiBaseUrl) throw new Error("ASOOSE_API_BASE_URL is not configured");

  const token = await getAccessToken();
  return fetch(`${apiBaseUrl}${path}`, {
    ...init,
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });
}

export async function forwardJson(response: Response) {
  const body = await response.json().catch(() => ({
    success: false,
    message: "The server returned an invalid response.",
  }));
  return Response.json(body, { status: response.status });
}

export function routeError(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected server error";
  return Response.json({ success: false, message }, { status: 502 });
}
