import { demoCities } from "@/lib/demo-properties";
import { apiBaseUrl, forwardJson, routeError, upstream } from "@/lib/server-api";

export async function GET() {
  try {
    if (!apiBaseUrl) return Response.json({ success: true, message: "Preview cities", data: demoCities });
    return forwardJson(await upstream("/api/v1/locations/active"));
  } catch (error) { return routeError(error); }
}
