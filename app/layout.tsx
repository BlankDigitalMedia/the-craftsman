import type { Metadata } from "next";
import { Courier_Prime, Crimson_Pro, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const crimsonPro = Crimson_Pro({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const inter = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "The Craftsman",
  description: "A digital book exploring Japanese philosophy and craftsmanship",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${courierPrime.variable} ${crimsonPro.variable} ${inter.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
