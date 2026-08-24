import { demoBookingStore } from "@/lib/demo-bookings";
import { apiBaseUrl, forwardJson, routeError, upstream } from "@/lib/server-api";

export async function GET(request: Request) {
  try {
    const query = new URL(request.url).searchParams;
    const page = Math.max(1, Number(query.get("page")) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.get("limit")) || 20));
    if (!apiBaseUrl) return Response.json({ success: true, message: "Preview bookings", data: { bookings: demoBookingStore.bookings.slice((page - 1) * limit, page * limit), pagination: { page, limit, total: demoBookingStore.bookings.length, totalPages: Math.ceil(demoBookingStore.bookings.length / limit) } } });
    return forwardJson(await upstream(`/api/v1/property-owners/me/bookings?page=${page}&limit=${limit}`));
  } catch (error) { return routeError(error); }
}
