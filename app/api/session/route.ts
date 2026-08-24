import { cookies } from "next/headers";
import { demoUser } from "@/lib/demo-data";
import { apiBaseUrl, DEMO_COOKIE, forwardJson, routeError, TOKEN_COOKIE, upstream } from "@/lib/server-api";

export async function GET() {
  try {
    const cookieStore = await cookies();
    if (!apiBaseUrl) {
      const active = cookieStore.has(DEMO_COOKIE);
      return Response.json({ success: active, data: active ? { user: demoUser } : null }, { status: active ? 200 : 401 });
    }
    if (!cookieStore.has(TOKEN_COOKIE)) {
      return Response.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }
    const response = await upstream("/api/v1/property-owners/me");
    if (!response.ok) return forwardJson(response);
    const body = await response.json();
    const [firstName = "Owner", ...rest] = String(body.data.fullName ?? "Owner").split(" ");
    return Response.json({
      success: true,
      data: { user: { id: body.data.userId, email: body.data.userEmail, firstName, lastName: rest.join(" "), phone: body.data.userPhone, role: "PROPERTY_OWNER", avatar: null } },
    });
  } catch (error) {
    return routeError(error);
  }
}
