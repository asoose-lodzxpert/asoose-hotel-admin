import { apiBaseUrl, forwardJson, getAccessToken, routeError } from "@/lib/server-api";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) return Response.json({ success: false, message: "Choose a file to upload." }, { status: 400 });
    if (!file.type.startsWith("image/")) return Response.json({ success: false, message: "Only image uploads are supported here." }, { status: 400 });
    if (file.size > 10 * 1024 * 1024) return Response.json({ success: false, message: "Images must be smaller than 10MB." }, { status: 400 });
    if (!apiBaseUrl) {
      const bytes = Buffer.from(await file.arrayBuffer()).toString("base64");
      return Response.json({ success: true, message: "Preview upload complete", data: { url: `data:${file.type};base64,${bytes}` } });
    }
    const token = await getAccessToken();
    if (!token) return Response.json({ success: false, message: "Not authenticated" }, { status: 401 });
    const upstreamForm = new FormData(); upstreamForm.append("file", file);
    const response = await fetch(`${apiBaseUrl}/api/v1/uploads?category=general`, { method: "POST", headers: { Authorization: `Bearer ${token}`, Accept: "application/json" }, body: upstreamForm, signal: AbortSignal.timeout(30_000) });
    return forwardJson(response);
  } catch (error) { return routeError(error); }
}
