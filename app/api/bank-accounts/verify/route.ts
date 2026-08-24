import { apiBaseUrl, forwardJson, routeError, upstream } from "@/lib/server-api";

export async function GET(request: Request) {
  try {
    const incoming = new URL(request.url).searchParams;
    const accountNumber = incoming.get("accountNumber") || "";
    const bankCode = incoming.get("bankCode") || "";
    if (!apiBaseUrl) return Response.json({ success: true, message: "Preview account verified", data: { accountNumber, accountName: "ASOOSE PREVIEW HOTELS LTD", bankCode } });
    const query = new URLSearchParams({ accountNumber, bankCode });
    return forwardJson(await upstream(`/api/v1/bank-accounts/verify?${query}`));
  } catch (error) {
    return routeError(error);
  }
}
