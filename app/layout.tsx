import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import { MenubarDemo } from "@/components/root/ServerRootLayouts";
import { Providers } from "./providers";
import { ThemeSwitcher } from "@/components/root/ClientRootLayouts";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ScrollArea } from "@/components/ui/scroll-area";

const inter1 = Lora({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter1.className}  antialiased overflow-y-hidden ${GeistSans.className} ${GeistMono.className}`}
      >
        <Providers>
          <MenubarDemo />
          <ScrollArea className="h-[90vh] w-screen p-8">{children}</ScrollArea>
          <ThemeSwitcher />
        </Providers>
      </body>
    </html>
  );
}
