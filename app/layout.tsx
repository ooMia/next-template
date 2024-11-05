import { ThemeSwitcher } from "@/components/root/ClientRootLayouts";
import { TopStickMenuBar } from "@/components/root/ServerRootLayouts";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

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
        className={`antialiased  ${GeistSans.className} ${GeistMono.className}`}
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
