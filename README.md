# Asoose property owner dashboard

A polished owner workspace for managing property performance, bookings, earnings, and business profile data.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set `ASOOSE_API_BASE_URL` to the backend host (without `/api/v1`). The frontend uses Next.js route handlers as a backend-for-frontend and stores the returned access token in a secure HTTP-only cookie. If the variable is omitted, the app enters preview mode and accepts any non-empty email/password while serving the provided sample dashboard and profile responses.

Set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` to a browser-restricted Google Maps key. Enable the Maps JavaScript API and Geocoding API in Google Cloud for property address search and pin selection.

## Connected endpoints

- `POST /api/v1/auth/login`
- `GET /api/v1/property-owners/me`
- `PATCH /api/v1/property-owners/me`
- `GET /api/v1/property-owners/me/dashboard`
- `GET|POST /api/v1/property-owners/me/properties`
- `GET|PATCH /api/v1/property-owners/me/properties/:propertyId`
- `POST /api/v1/property-owners/me/properties/:propertyId/room-types`
- `PATCH|DELETE /api/v1/property-owners/me/properties/:propertyId/room-types/:roomTypeId`
- `GET /api/v1/locations/active`
- `GET /api/v1/property-types`
- `POST /api/v1/uploads?category=general`
- `GET /api/v1/property-owners/me/bookings`
- `GET /api/v1/property-owners/me/bookings/:bookingId`
- `PATCH /api/v1/property-owners/me/bookings/:bookingId/check-in`
- `PATCH /api/v1/property-owners/me/bookings/:bookingId/check-out`

Run `npm run lint` and `npm run build` before deployment.
# asoose-hotel-admin
# asoose-hotel-admin
