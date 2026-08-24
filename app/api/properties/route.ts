import { createDemoProperty, demoStore } from "@/lib/demo-properties";
import { apiBaseUrl, forwardJson, routeError, upstream } from "@/lib/server-api";
import type { PropertyPayload } from "@/lib/types";

export async function GET(request: Request) {
  try {
    const query = new URL(request.url).searchParams;
    const page = Math.max(1, Number(query.get("page")) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.get("limit")) || 20));
    if (!apiBaseUrl) return Response.json({ success: true, message: "Preview properties", data: { properties: demoStore.properties.slice((page - 1) * limit, page * limit), pagination: { page, limit, total: demoStore.properties.length, totalPages: Math.ceil(demoStore.properties.length / limit) } } });
    return forwardJson(await upstream(`/api/v1/property-owners/me/properties?page=${page}&limit=${limit}`));
  } catch (error) { return routeError(error); }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json() as PropertyPayload;
    if (!payload.name || !payload.propertyTypeId || !payload.cityId || !payload.address || !Number.isFinite(payload.lat) || !Number.isFinite(payload.lng)) {
      return Response.json({ success: false, message: "Complete the required property and location fields." }, { status: 400 });
    }
    if (!apiBaseUrl) return Response.json({ success: true, message: "Property created successfully", data: createDemoProperty(payload) }, { status: 201 });
    return forwardJson(await upstream("/api/v1/property-owners/me/properties", { method: "POST", body: JSON.stringify(payload) }));
  } catch (error) { return routeError(error); }
}
