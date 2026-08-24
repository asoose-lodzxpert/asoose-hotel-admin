import { cookies } from "next/headers";
import { DEMO_COOKIE, TOKEN_COOKIE } from "@/lib/server-api";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE);
  cookieStore.delete(DEMO_COOKIE);
  return Response.json({ success: true, message: "Signed out" });
}
