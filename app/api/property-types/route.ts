import { demoPropertyTypes } from "@/lib/demo-properties";
import { apiBaseUrl, forwardJson, routeError, upstream } from "@/lib/server-api";

export async function GET() {
  try {
    if (!apiBaseUrl) return Response.json({ success: true, message: "Preview property types", data: { propertyTypes: demoPropertyTypes } });
    return forwardJson(await upstream("/api/v1/property-types"));
  } catch (error) { return routeError(error); }
}
