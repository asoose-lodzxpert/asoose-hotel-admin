import { createDemoRoom } from "@/lib/demo-properties";
import { apiBaseUrl, forwardJson, routeError, upstream } from "@/lib/server-api";
import type { RoomTypePayload } from "@/lib/types";

export async function POST(request: Request, { params }: { params: Promise<{ propertyId: string }> }) {
  try {
    const { propertyId } = await params;
    const payload = await request.json() as RoomTypePayload;
    if (!payload.name || payload.pricePerNight < 0 || payload.quantity < 1 || payload.maxGuests < 1) return Response.json({ success: false, message: "Complete all required room fields." }, { status: 400 });
    if (!apiBaseUrl) {
      const room = createDemoRoom(propertyId, payload);
      return room ? Response.json({ success: true, message: "Room type created successfully", data: room }, { status: 201 }) : Response.json({ success: false, message: "Property not found" }, { status: 404 });
    }
    return forwardJson(await upstream(`/api/v1/property-owners/me/properties/${encodeURIComponent(propertyId)}/room-types`, { method: "POST", body: JSON.stringify(payload) }));
  } catch (error) { return routeError(error); }
}
