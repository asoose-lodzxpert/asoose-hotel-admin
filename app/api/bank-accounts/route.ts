import { apiBaseUrl, forwardJson, routeError, upstream } from "@/lib/server-api";

const previewAccount = {
  id: "preview-bank-account",
  accountNumber: "0123456789",
  accountName: "Asoose Preview Hotels Ltd",
  bankCode: "058",
  bankName: "GTBank",
  isVerified: true,
  isDefault: true,
  createdAt: "2026-07-01T12:00:00.000Z",
};

export async function GET() {
  try {
    if (!apiBaseUrl) return Response.json({ success: true, message: "Preview bank accounts", data: [previewAccount] });
    return forwardJson(await upstream("/api/v1/bank-accounts"));
  } catch (error) {
    return routeError(error);
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (!apiBaseUrl) return Response.json({ success: true, message: "Bank account saved successfully", data: { ...previewAccount, ...payload, id: crypto.randomUUID(), createdAt: new Date().toISOString() } }, { status: 201 });
    return forwardJson(await upstream("/api/v1/bank-accounts", { method: "POST", body: JSON.stringify(payload) }));
  } catch (error) {
    return routeError(error);
  }
}
