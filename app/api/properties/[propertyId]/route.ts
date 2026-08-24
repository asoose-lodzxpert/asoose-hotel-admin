import { demoStore, updateDemoProperty } from "@/lib/demo-properties";
import { apiBaseUrl, forwardJson, routeError, upstream } from "@/lib/server-api";
import type { PropertyPayload } from "@/lib/types";

export async function GET(_request: Request, { params }: { params: Promise<{ propertyId: string }> }) {
  try {
    const { propertyId } = await params;
    if (!apiBaseUrl) {
      const property = demoStore.properties.find((item) => item.id === propertyId);
      return property ? Response.json({ success: true, message: "Preview property", data: property }) : Response.json({ success: false, message: "Property not found" }, { status: 404 });
    }
    return forwardJson(await upstream(`/api/v1/property-owners/me/properties/${encodeURIComponent(propertyId)}`));
  } catch (error) { return routeError(error); }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ propertyId: string }> }) {
  try {
    const { propertyId } = await params;
    const payload = await request.json() as PropertyPayload;
    if (!apiBaseUrl) {
      const property = updateDemoProperty(propertyId, payload);
      return property ? Response.json({ success: true, message: "Property updated successfully", data: property }) : Response.json({ success: false, message: "Property not found" }, { status: 404 });
    }
    return forwardJson(await upstream(`/api/v1/property-owners/me/properties/${encodeURIComponent(propertyId)}`, { method: "PATCH", body: JSON.stringify(payload) }));
  } catch (error) { return routeError(error); }
}
