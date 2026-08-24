import { apiBaseUrl, forwardJson, routeError, upstream } from "@/lib/server-api";

export async function GET() {
  try {
    if (!apiBaseUrl) return Response.json({ success: true, message: "Preview supported banks", data: [
      { name: "Access Bank", code: "044" },
      { name: "GTBank", code: "058" },
      { name: "Zenith Bank", code: "057" },
    ] });
    return forwardJson(await upstream("/api/v1/bank-accounts/banks"));
  } catch (error) {
    return routeError(error);
  }
}
