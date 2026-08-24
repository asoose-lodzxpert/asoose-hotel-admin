import { demoDashboard } from "@/lib/demo-data";
import { demoStore } from "@/lib/demo-properties";
import { demoBookingStore } from "@/lib/demo-bookings";
import { apiBaseUrl, forwardJson, routeError, upstream } from "@/lib/server-api";

export async function GET() {
  try {
    if (!apiBaseUrl) return Response.json({ success: true, message: "Preview dashboard", data: { ...demoDashboard, totalProperties: demoStore.properties.length, publishedProperties: demoStore.properties.filter((property) => property.status === "PUBLISHED").length, upcomingCheckIns: demoBookingStore.bookings.filter((booking) => booking.status !== "CHECKED_IN" && booking.status !== "CHECKED_OUT" && booking.status !== "CANCELLED").length, currentGuests: demoBookingStore.bookings.filter((booking) => booking.status === "CHECKED_IN").reduce((total, booking) => total + booking.guests, 0) } });
    return forwardJson(await upstream("/api/v1/property-owners/me/dashboard"));
  } catch (error) {
    return routeError(error);
  }
}
