import { apiBaseUrl, forwardJson, routeError, upstream } from "@/lib/server-api";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    if (!apiBaseUrl) return Response.json({
      success: true,
      message: "Payout requested successfully",
      data: {
        id: crypto.randomUUID(), amount: payload.amount, feeAmount: 0, netAmount: payload.amount,
        status: "PENDING", bankAccountId: payload.bankAccountId ?? "preview-default-account",
        providerReference: null, failureReason: null, processedAt: null, completedAt: null,
        createdAt: new Date().toISOString(),
      },
    }, { status: 201 });
    return forwardJson(await upstream("/api/v1/payouts/me/request", { method: "POST", body: JSON.stringify(payload) }));
  } catch (error) {
    return routeError(error);
  }
}
