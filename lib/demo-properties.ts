import type { City, Property, PropertyPayload, PropertyType, RoomTypePayload } from "./types";

export const demoCities: City[] = [
  { id: "50eaacb3-c0ef-4db8-95d6-f1368c3c68ed", name: "Abuja", state: "Abuja", country: "Nigeria", latitude: 9.0765, longitude: 7.3986 },
  { id: "0b322a41-03e3-4fdd-bca0-5deec47271c0", name: "Karu", state: "Nassarawa", country: "Nigeria", latitude: 9.009, longitude: 7.57 },
  { id: "3eecb7a3-085c-4a75-b5e0-a511557345e6", name: "Maiduguri", state: "Borno", country: "Nigeria", latitude: 11.832873398087084, longitude: 13.13813899577069 },
];

export const demoPropertyTypes: PropertyType[] = [
  { id: "8ec8b400-3243-425e-a0e0-f64e317a4976", code: "APARTMENT", name: "Apartment", description: "A standalone apartment unit", icon: null, sortOrder: 1, isActive: true },
  { id: "be0e6343-c526-4520-a016-51b57850e0f5", code: "HOTEL", name: "Hotel", description: "Multi-room hotel with several room types", icon: null, sortOrder: 2, isActive: true },
  { id: "319d515b-8900-4171-98d0-f537c5c95a13", code: "VILLA", name: "Villa", description: "A private villa or house", icon: null, sortOrder: 3, isActive: true },
  { id: "8567c285-dcf8-4603-9bfd-71bf5928549b", code: "SINGLE_ROOM", name: "Single Room", description: "A single bookable room", icon: null, sortOrder: 5, isActive: true },
];

type DemoStore = { properties: Property[] };
const globalStore = globalThis as typeof globalThis & { __asooseDemoStore?: DemoStore };

export const demoStore = globalStore.__asooseDemoStore ??= { properties: [] };

export function createDemoProperty(payload: PropertyPayload): Property {
  const now = new Date().toISOString();
  const type = demoPropertyTypes.find((item) => item.id === payload.propertyTypeId);
  const city = demoCities.find((item) => item.id === payload.cityId) ?? demoCities[0];
  const property: Property = {
    id: crypto.randomUUID(), propertyTypeId: payload.propertyTypeId, propertyType: type?.code ?? "PROPERTY",
    name: payload.name, slug: payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    description: payload.description, address: payload.address, lat: payload.lat, lng: payload.lng, city,
    images: payload.images, image: payload.images[0] ?? null, amenities: payload.amenities,
    checkInTime: payload.checkInTime, checkOutTime: payload.checkOutTime, rating: 0, totalReviews: 0,
    status: "DRAFT", roomTypes: [], createdAt: now, updatedAt: now,
  };
  demoStore.properties.unshift(property);
  return property;
}

export function updateDemoProperty(id: string, payload: PropertyPayload) {
  const property = demoStore.properties.find((item) => item.id === id);
  if (!property) return null;
  const type = demoPropertyTypes.find((item) => item.id === payload.propertyTypeId);
  const city = demoCities.find((item) => item.id === payload.cityId) ?? property.city;
  Object.assign(property, payload, { propertyType: type?.code ?? property.propertyType, city, image: payload.images[0] ?? null, updatedAt: new Date().toISOString() });
  return property;
}

export function createDemoRoom(propertyId: string, payload: RoomTypePayload) {
  const property = demoStore.properties.find((item) => item.id === propertyId);
  if (!property) return null;
  const now = new Date().toISOString();
  const room = { id: crypto.randomUUID(), propertyId, ...payload, image: payload.images[0] ?? null, isActive: true, createdAt: now, updatedAt: now };
  property.roomTypes.push(room); property.updatedAt = now;
  return room;
}
