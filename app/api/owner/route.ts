import { demoProfile } from "@/lib/demo-data";
import { apiBaseUrl, forwardJson, routeError, upstream } from "@/lib/server-api";

export async function GET() {
  try {
    if (!apiBaseUrl) return Response.json({ success: true, message: "Preview profile", data: demoProfile });
    return forwardJson(await upstream("/api/v1/property-owners/me"));
  } catch (error) {
    return routeError(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const payload = await request.json();
    if (!apiBaseUrl) {
      return Response.json({ success: true, message: "Profile updated successfully", data: { ...demoProfile, ...payload, updatedAt: new Date().toISOString() } });
    }
    return forwardJson(await upstream("/api/v1/property-owners/me", { method: "PATCH", body: JSON.stringify(payload) }));
  } catch (error) {
    return routeError(error);
  }
}
