import type { Metadata } from "next";
import { Mountains_of_Christmas } from "next/font/google";
import "./globals.css";

const christmas = Mountains_of_Christmas({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Digital Advent Calendar",
  description: "A magical Christmas countdown experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={christmas.className}>{children}</body>
    </html>
  );
}