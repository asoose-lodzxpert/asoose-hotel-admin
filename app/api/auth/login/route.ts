import { cookies } from "next/headers";
import { demoUser } from "@/lib/demo-data";
import { apiBaseUrl, DEMO_COOKIE, routeError, TOKEN_COOKIE } from "@/lib/server-api";

export async function POST(request: Request) {
  try {
    const credentials = await request.json();
    if (!credentials.email || !credentials.password) {
      return Response.json({ success: false, message: "Email and password are required." }, { status: 400 });
    }

    if (!apiBaseUrl) {
      (await cookies()).set(DEMO_COOKIE, "active", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return Response.json({ success: true, message: "Preview login successful", data: { user: demoUser } });
    }

    const response = await fetch(`${apiBaseUrl}/api/v1/auth/login`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    const body = await response.json().catch(() => null);
    if (!response.ok || !body?.success || !body.data?.accessToken) {
      return Response.json(body ?? { success: false, message: "Unable to sign in." }, { status: response.status });
    }

    (await cookies()).set(TOKEN_COOKIE, body.data.accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return Response.json({ ...body, data: { user: body.data.user } });
  } catch (error) {
    return routeError(error);
  }
}
