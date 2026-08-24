import { apiBaseUrl, forwardJson, routeError, upstream } from "@/lib/server-api";

export async function GET(request: Request) {
  try {
    const incoming = new URL(request.url).searchParams;
    const query = new URLSearchParams({
      page: incoming.get("page") || "1",
      limit: incoming.get("limit") || "20",
    });
    if (!apiBaseUrl) return Response.json({
      success: true,
      message: "Preview wallet transactions",
      data: { transactions: [], pagination: { page: Number(query.get("page")), limit: Number(query.get("limit")), total: 0, totalPages: 1 } },
    });
    return forwardJson(await upstream(`/api/v1/wallet/me/transactions?${query}`));
  } catch (error) {
    return routeError(error);
  }
}
