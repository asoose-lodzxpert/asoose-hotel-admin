export type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude: number;
  longitude: number;
};

export type Documents = {
  businessLicenseFile: string;
  idDocumentFile: string;
  propertyOwnershipDocFile: string;
};

export type OwnerProfile = {
  id: string;
  userId: string;
  fullName: string;
  userEmail: string;
  userPhone: string;
  businessName: string;
  businessDescription: string;
  businessPhone: string;
  businessEmail: string;
  address: Address;
  documents: Documents;
  customCommissionPercent: number;
  verificationStatus: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type DashboardStats = {
  totalProperties: number;
  publishedProperties: number;
  upcomingCheckIns: number;
  currentGuests: number;
  earningsThisMonth: number;
  pendingPayoutBalance: number;
  availableBalance: number;
};

export type EarningsBalance = {
  pendingBalance: number;
  lockedBalance: number;
  availableForPayout: number;
  minPayoutAmount: number;
};

export type WalletTransaction = {
  id: string;
  type: "CREDIT" | "DEBIT" | "TRANSFER_IN" | "TRANSFER_OUT" | "REFUND" | "PAYOUT" | "REVERSAL" | "FEE" | "BONUS" | "CASHBACK";
  channel: string;
  status: string;
  amount: number;
  description: string;
  referenceType: string;
  referenceId: string;
  createdAt: string;
};

export type Payout = {
  id: string;
  amount: number;
  feeAmount: number;
  netAmount: number;
  status: string;
  bankAccountId: string;
  providerReference: string | null;
  failureReason: string | null;
  processedAt: string | null;
  completedAt: string | null;
  createdAt: string;
};

export type BankAccount = {
  id: string;
  accountNumber: string;
  accountName: string;
  bankCode: string;
  bankName: string;
  isVerified: boolean;
  isDefault: boolean;
  createdAt: string;
};

export type SupportedBank = {
  name: string;
  code: string;
};

export type VerifiedBankAccount = {
  accountNumber: string;
  accountName: string;
  bankCode: string;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type City = {
  id: string;
  name: string;
  state: string;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
};

export type PropertyType = {
  id: string;
  code: string;
  name: string;
  description: string;
  icon: string | null;
  sortOrder: number;
  isActive: boolean;
};

export type RoomType = {
  id: string;
  propertyId: string;
  name: string;
  description: string;
  pricePerNight: number;
  quantity: number;
  maxGuests: number;
  images: string[];
  image: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Property = {
  id: string;
  propertyTypeId: string;
  propertyType: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  city: City & { isActive?: boolean; createdAt?: string; updatedAt?: string };
  images: string[];
  image: string | null;
  amenities: string[];
  checkInTime: string;
  checkOutTime: string;
  rating: number;
  totalReviews: number;
  status: string;
  roomTypes: RoomType[];
  createdAt: string;
  updatedAt: string;
};

export type PropertyPayload = {
  propertyTypeId: string;
  name: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  cityId: string;
  images: string[];
  amenities: string[];
  checkInTime: string;
  checkOutTime: string;
};

export type RoomTypePayload = {
  name: string;
  description: string;
  pricePerNight: number;
  quantity: number;
  maxGuests: number;
  images: string[];
};

export type BookingStatus = "PENDING_PAYMENT" | "CONFIRMED" | "CHECKED_IN" | "CHECKED_OUT" | "CANCELLED" | string;

export type Booking = {
  id: string;
  bookingNumber: string;
  customerId: string;
  propertyId: string;
  propertyName: string;
  propertyImage: string | null;
  roomTypeId: string;
  roomTypeName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  unitsBooked: number;
  guests: number;
  pricePerNight: number;
  subtotal: number;
  serviceFee: number;
  total: number;
  status: BookingStatus;
  paymentMethod: string | null;
  paymentStatus: string;
  specialRequests: string | null;
  cancellationReason: string | null;
  cancelledAt: string | null;
  cancelledBy: string | null;
  checkedInAt: string | null;
  checkedOutAt: string | null;
  createdAt: string;
  updatedAt: string;
  customer?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  property?: {
    id: string;
    name: string;
    image: string | null;
    address: string;
    city: { id: string; name: string };
  };
};
