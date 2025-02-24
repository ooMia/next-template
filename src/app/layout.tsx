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
    <div id="menubar" className="sticky top-0 w-full">
      <Link href="/">Home</Link>
      <Link href="/jsx">
        Chapter 2
        <br />
        JSX
      </Link>
      <Link href="/virtual-dom">
        Chapter 3
        <br />
        Virtual DOM
      </Link>
      <Link href="/reconciliation">
        Chapter 4
        <br />
        Reconciliation
      </Link>
      <Link href="/patterns">
        Chapter 5
        <br />
        Patterns
      </Link>
      <Link href="/ssr">
        Chapter 6
        <br />
        SSR
      </Link>
      <Link href="/concurrency">
        Chapter 7
        <br />
        Concurrency
      </Link>
      <Link href="/framework">
        Chapter 8
        <br />
        Framework
      </Link>
      <Link href="/rsc">
        Chapter 9
        <br />
        RSC
      </Link>
    </div>
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {menubar}
        {children}
      </body>
    </html>
  );
}
