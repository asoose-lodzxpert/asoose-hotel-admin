import { apiBaseUrl, forwardJson, routeError, upstream } from "@/lib/server-api";

export async function GET() {
  try {
    if (!apiBaseUrl) return Response.json({
      success: true,
      message: "Preview earnings balance",
      data: { pendingBalance: 0, lockedBalance: 0, availableForPayout: 0, minPayoutAmount: 1000 },
    });
    return forwardJson(await upstream("/api/v1/payouts/me/balance"));
  } catch (error) {
    return routeError(error);
  }
}
