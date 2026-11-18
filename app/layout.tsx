import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShipYard — Everyday essentials, elevated",
  description: "Explore a handpicked catalog of sneakers, audio, wearables, and tech essentials.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
