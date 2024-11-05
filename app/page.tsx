"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ScanInputFormPage from "./scan/page";

export default function RootPage() {
  return (
    <>
      <header
        style={{
          fontFamily: "GeistSans",
          fontWeight: 800,
          fontSize: "50px",
        }}
        className="flex flex-col items-center justify-center w-full"
      >
        <span className="bg-none text-primary p-4">
          Scan for{" "}
          <span
            style={{
              background:
                "radial-gradient(89.67% 159.84% at 76.02% 19.88%, #EB487F 0%, #D29FB8 34%, #F71097 75%, #ED6AC4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fill: "transparent",
            }}
            className="select-none w-max-[1/2]"
          >
            Uniswap V4 - Hook
          </span>
        </span>
      </header>
      <ScanInputFormPage />
      <main
        className="flex flex-col items-center justify-center
        w-full text-black"
      >
        <div className="flex p-4 m-4 gap-4">
          <SimpleCustomizableLinkCard
            className="bg-blue-200 w-[400px] h-[500px]"
            href="/scan"
            title="Scan"
            description="Assessing Uniswap V4 Hook Vulnerabilities is now streamlined-ensure your custom hooks are secure."
          />
          <SimpleCustomizableLinkCard
            className="bg-primary-400 w-[400px] h-[500px]"
            href="/docs"
            title="Docs"
            description="Let's study the vulnerability audit methods using Herbicide and the security best practices for Uniswap V4."
          >
            <Image
              src="uni.svg"
              width={300}
              height={300}
              alt="Unicorn reading a book"
            />
          </SimpleCustomizableLinkCard>
        </div>
      </main>
    </>
  );
}

function SimpleCustomizableLinkCard({
  className,
  href,
  title,
  description,
  children,
}: Readonly<{
  className: string;
  href: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}>) {
  return (
    <a href={href}>
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription> {description} </CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </a>
  );
}
