import type { Metadata } from "next";

import { TopStickMenuBar } from "@/components/root/ServerRootLayouts";
import { ThemeSwitcher } from "@/components/root/ClientRootLayouts";

import "./globals.css";
import { Providers } from "./providers";

import localFont from "next/font/local";

const GeistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  display: "swap",
});
const GeistSans = localFont({
  src: "../fonts/GeistVF.woff",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Herbicide",
  description:
    "Step into the Future of DeFi: Unlock the Power of UniSwap V4 Hooks with Herbicide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased ${GeistSans.className} ${GeistMono.className}`}
      >
        <Providers>
          <TopStickMenuBar />
          {children}
          <ThemeSwitcher />
        </Providers>
      </body>
    </html>
  );
}
