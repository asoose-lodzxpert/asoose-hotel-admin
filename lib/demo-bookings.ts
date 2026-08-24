import type { Booking } from "./types";

type DemoBookingStore = { bookings: Booking[] };
const globalStore = globalThis as typeof globalThis & { __asooseDemoBookings?: DemoBookingStore };

export const demoBookingStore = globalStore.__asooseDemoBookings ??= {
  bookings: [{
    id: "2ad216e9-1b8f-4606-925f-14aedb9f1e07",
    bookingNumber: "BKG-MSQ25COI-C63D0E",
    customerId: "c5c60e6b-9f8c-4e88-a730-5e95a15c1afc",
    propertyId: "441e9710-b8e5-4c98-8a41-11e24c9e4530",
    propertyName: "Lagos Grand Hotel",
    propertyImage: "https://res.cloudinary.com/dgwnjuvlx/image/upload/general/927b6b48-69e5-4ca1-a51e-1b86be4d02c6/3400e296-b7fb-40de-82fc-bffbb6210084",
    roomTypeId: "92c8f711-53f8-40b8-99f9-42d4ca982847",
    roomTypeName: "King Size",
    checkIn: "2026-08-15T00:00:00.000Z",
    checkOut: "2026-08-16T00:00:00.000Z",
    nights: 1, unitsBooked: 1, guests: 1, pricePerNight: 20000, subtotal: 20000, serviceFee: 1000, total: 21000,
    status: "PENDING_PAYMENT", paymentMethod: "CARD", paymentStatus: "PENDING", specialRequests: null,
    cancellationReason: null, cancelledAt: null, cancelledBy: null, checkedInAt: null, checkedOutAt: null,
    createdAt: "2026-08-12T12:20:45.051Z", updatedAt: "2026-08-12T12:20:45.051Z",
    customer: { id: "c5c60e6b-9f8c-4e88-a730-5e95a15c1afc", firstName: "User", lastName: "Yusuf", email: "6m5wwndfj2@privaterelay.appleid.com", phone: "8098982222" },
    property: { id: "441e9710-b8e5-4c98-8a41-11e24c9e4530", name: "Lagos Grand Hotel", image: "https://res.cloudinary.com/dgwnjuvlx/image/upload/general/927b6b48-69e5-4ca1-a51e-1b86be4d02c6/3400e296-b7fb-40de-82fc-bffbb6210084", address: "12 Adeola Odeku Street, Victoria Island, Lagos", city: { id: "3eecb7a3-085c-4a75-b5e0-a511557345e6", name: "Lagos" } },
  }],
};

export function transitionDemoBooking(id: string, action: "check-in" | "check-out") {
  const booking = demoBookingStore.bookings.find((item) => item.id === id);
  if (!booking) return null;
  const now = new Date().toISOString();
  if (action === "check-in") Object.assign(booking, { status: "CHECKED_IN", paymentStatus: "COMPLETED", checkedInAt: now, updatedAt: now });
  else Object.assign(booking, { status: "CHECKED_OUT", checkedOutAt: now, updatedAt: now });
  return booking;
}
