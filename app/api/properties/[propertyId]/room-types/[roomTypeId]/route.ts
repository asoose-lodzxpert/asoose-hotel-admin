import { demoStore } from "@/lib/demo-properties";
import { apiBaseUrl, forwardJson, routeError, upstream } from "@/lib/server-api";
import type { RoomTypePayload } from "@/lib/types";

type Params = { params: Promise<{ propertyId: string; roomTypeId: string }> };

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { propertyId, roomTypeId } = await params;
    const payload = await request.json() as RoomTypePayload;
    if (!apiBaseUrl) {
      const room = demoStore.properties.find((item) => item.id === propertyId)?.roomTypes.find((item) => item.id === roomTypeId);
      if (!room) return Response.json({ success: false, message: "Room type not found" }, { status: 404 });
      Object.assign(room, payload, { image: payload.images[0] ?? null, updatedAt: new Date().toISOString() });
      return Response.json({ success: true, message: "Room type updated successfully", data: room });
    }
    return forwardJson(await upstream(`/api/v1/property-owners/me/properties/${encodeURIComponent(propertyId)}/room-types/${encodeURIComponent(roomTypeId)}`, { method: "PATCH", body: JSON.stringify(payload) }));
  } catch (error) { return routeError(error); }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { propertyId, roomTypeId } = await params;
    if (!apiBaseUrl) {
      const property = demoStore.properties.find((item) => item.id === propertyId);
      if (!property) return Response.json({ success: false, message: "Property not found" }, { status: 404 });
      const index = property.roomTypes.findIndex((item) => item.id === roomTypeId);
      if (index < 0) return Response.json({ success: false, message: "Room type not found" }, { status: 404 });
      property.roomTypes.splice(index, 1);
      return Response.json({ success: true, message: "Room type deleted successfully", data: null });
    }
    return forwardJson(await upstream(`/api/v1/property-owners/me/properties/${encodeURIComponent(propertyId)}/room-types/${encodeURIComponent(roomTypeId)}`, { method: "DELETE" }));
  } catch (error) { return routeError(error); }
}
