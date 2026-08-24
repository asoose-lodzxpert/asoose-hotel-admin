import type { DashboardStats, OwnerProfile, User } from "./types";

export const demoUser: User = {
  id: "927b6b48-69e5-4ca1-a51e-1b86be4d02c6",
  email: "loki.dwight@minafter.com",
  firstName: "ELIJAH",
  lastName: "UKAR",
  phone: "09032121212",
  role: "PROPERTY_OWNER",
  emailVerified: true,
  phoneVerified: false,
  avatar: null,
  createdAt: "2026-08-12T10:55:14.833Z",
  updatedAt: "2026-08-12T11:04:47.636Z",
};

export const demoProfile: OwnerProfile = {
  id: "a9850368-d57e-4292-91ad-346101386917",
  userId: demoUser.id,
  fullName: "ELIJAH UKAR",
  userEmail: demoUser.email,
  userPhone: demoUser.phone,
  businessName: "Enim quas eum maxime",
  businessDescription: "Commodo eiusmod et a",
  businessPhone: "Voluptatem quas rep",
  businessEmail: "nafaj@mailinator.com",
  address: {
    street: "Iure pariatur Ut li",
    city: "Rerum facere modi im",
    state: "Do voluptatem sit s",
    zipCode: "Lorem dolorum verita",
    country: "Earum ipsa do cupid",
    latitude: 26,
    longitude: 97,
  },
  documents: {
    businessLicenseFile: "",
    idDocumentFile: "",
    propertyOwnershipDocFile: "",
  },
  customCommissionPercent: 12.5,
  verificationStatus: "VERIFIED",
  isVerified: true,
  createdAt: "2026-08-12T10:55:16.014Z",
  updatedAt: "2026-08-12T11:00:36.620Z",
};

export const demoDashboard: DashboardStats = {
  totalProperties: 0,
  publishedProperties: 0,
  upcomingCheckIns: 0,
  currentGuests: 0,
  earningsThisMonth: 0,
  pendingPayoutBalance: 0,
  availableBalance: 0,
};
