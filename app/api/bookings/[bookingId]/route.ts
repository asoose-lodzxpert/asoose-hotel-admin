import { demoBookingStore } from "@/lib/demo-bookings";
import { apiBaseUrl, forwardJson, routeError, upstream } from "@/lib/server-api";

export async function GET(_request: Request, { params }: { params: Promise<{ bookingId: string }> }) {
  try {
    const { bookingId } = await params;
    if (!apiBaseUrl) {
      const booking = demoBookingStore.bookings.find((item) => item.id === bookingId);
      return booking ? Response.json({ success: true, message: "Preview booking", data: booking }) : Response.json({ success: false, message: "Booking not found" }, { status: 404 });
    }
    return forwardJson(await upstream(`/api/v1/property-owners/me/bookings/${encodeURIComponent(bookingId)}`));
  } catch (error) { return routeError(error); }
}
