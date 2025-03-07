import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fluent React",
  description:
    "Practicing the concepts and exercises from the book 'Fluent React'",
  keywords: ["React", "Fluent React", "Frontend"],
  authors: [{ name: "ooMia", url: "https://github.com/ooMia" }],
  openGraph: {
    images: ["https://oomia.github.io/fluent-react/front.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menubar = (
    <div id="menubar" className="sticky top-0 z-10 overflow-x-auto">
      <div className="flex gap-4 p-4">
        <Link href="/">Home</Link>
        <Link href="/jsx">
          Chapter2
          <br />
          JSX
        </Link>
        <Link href="/virtual-dom">
          Chapter3
          <br />
          VirtualDOM
        </Link>
        <Link href="/reconciliation">
          Chapter4
          <br />
          Reconciliation
        </Link>
        <Link href="/patterns">
          Chapter5
          <br />
          Patterns
        </Link>
        <Link href="/ssr">
          Chapter6
          <br />
          SSR
        </Link>
        <Link href="/concurrency">
          Chapter7
          <br />
          Concurrency
        </Link>
        <Link href="/framework">
          Chapter8
          <br />
          Framework
        </Link>
        <Link href="/rsc">
          Chapter9
          <br />
          RSC
        </Link>
      </div>
    </div>
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {menubar}
        <div className="flex flex-col items-center">
          <div className="w-full p-4 max-w-4xl">{children}</div>
        </div>
      </body>
    </html>
  );
}
