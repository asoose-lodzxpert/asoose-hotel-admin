import { transitionDemoBooking } from "@/lib/demo-bookings";
import { apiBaseUrl, forwardJson, routeError, upstream } from "@/lib/server-api";

type Params = { params: Promise<{ bookingId: string; action: string }> };

export async function PATCH(_request: Request, { params }: Params) {
  try {
    const { bookingId, action } = await params;
    if (action !== "check-in" && action !== "check-out") return Response.json({ success: false, message: "Unsupported booking action" }, { status: 400 });
    if (!apiBaseUrl) {
      const booking = transitionDemoBooking(bookingId, action);
      return booking ? Response.json({ success: true, message: action === "check-in" ? "Guest checked in successfully" : "Guest checked out successfully", data: booking }) : Response.json({ success: false, message: "Booking not found" }, { status: 404 });
    }
    return forwardJson(await upstream(`/api/v1/property-owners/me/bookings/${encodeURIComponent(bookingId)}/${action}`, { method: "PATCH" }));
  } catch (error) { return routeError(error); }
}
