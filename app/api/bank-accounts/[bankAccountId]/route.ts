import { apiBaseUrl, forwardJson, routeError, upstream } from "@/lib/server-api";

export async function DELETE(_request: Request, { params }: { params: Promise<{ bankAccountId: string }> }) {
  try {
    const { bankAccountId } = await params;
    if (!apiBaseUrl) return Response.json({ success: true, message: "Bank account removed successfully", data: null });
    return forwardJson(await upstream(`/api/v1/bank-accounts/${encodeURIComponent(bankAccountId)}`, { method: "DELETE" }));
  } catch (error) {
    return routeError(error);
  }
}
