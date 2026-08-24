import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asoose — Property owner dashboard",
  description: "Manage properties, bookings and payouts with Asoose.",
  icons: {
    icon: "/asoose.png",
    apple: "/asoose.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
