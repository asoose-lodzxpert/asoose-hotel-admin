import { apiBaseUrl, forwardJson, routeError, upstream } from "@/lib/server-api";

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128;

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => null);
    const { currentPassword, newPassword } = payload ?? {};

    if (typeof currentPassword !== "string" || typeof newPassword !== "string") {
      return Response.json({ success: false, message: "Current and new passwords are required." }, { status: 400 });
    }

    if (currentPassword.length < PASSWORD_MIN_LENGTH || currentPassword.length > PASSWORD_MAX_LENGTH) {
      return Response.json({ success: false, message: "Current password must be between 8 and 128 characters." }, { status: 400 });
    }

    if (newPassword.length < PASSWORD_MIN_LENGTH || newPassword.length > PASSWORD_MAX_LENGTH) {
      return Response.json({ success: false, message: "New password must be between 8 and 128 characters." }, { status: 400 });
    }

    if (!/[a-z]/.test(newPassword) || !/[A-Z]/.test(newPassword) || !/\d/.test(newPassword)) {
      return Response.json({ success: false, message: "New password must include an uppercase letter, a lowercase letter, and a number." }, { status: 400 });
    }

    if (newPassword === currentPassword) {
      return Response.json({ success: false, message: "New password must be different from your current password." }, { status: 400 });
    }

    if (!apiBaseUrl) {
      return Response.json({ success: true, message: "Password changed successfully.", data: null });
    }

    const response = await upstream("/api/v1/users/me/change-password", {
      method: "POST",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    if (response.status === 204) {
      return Response.json({ success: true, message: "Password changed successfully.", data: null });
    }
    return forwardJson(response);
  } catch (error) {
    return routeError(error);
  }
}
