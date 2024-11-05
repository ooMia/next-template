import Page from "@/app/scan/page";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main
      className="flex flex-col items-center justify-center
        w-full h-full text-black"
    >
      <header
        style={{
          fontFamily: "GeistSans",
          fontWeight: 800,
          fontSize: "50px",
        }}
      >
        <p
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
          Step into the Future of DeFi:
          <br /> Unlock the Power of
          <br /> UniSwap V4 Hooks with
        </p>
        <p className="bg-none text-primary">\&lt; Herbicide &gt;\</p>
        <Page />
      </header>
      <div className="flex p-4 m-4 gap-4">
        <SimpleCustomizableLinkCard
          className="bg-blue-200 w-[400px] h-[500px]"
          href="/scan"
          title="Scan"
          description="Assessing Uniswap V4 Hook Vulnerabilities is now  streamlined-ensure your custom hooks are secure."
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
      {/* <HerbicideHero /> */}
      {/*<ExampleContainer>*/}
      {/*  <ExampleContent>STEP 1</ExampleContent>*/}
      {/*  <ExampleContent>STEP 2</ExampleContent>*/}
      {/*  <ExampleContent>STEP 3</ExampleContent>*/}
      {/*  <ExampleContent>STEP 4</ExampleContent>*/}
      {/*  <ExampleContent>STEP 5</ExampleContent>*/}
      {/*</ExampleContainer>*/}
    </main>
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
//
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
//
// function ExampleContainer({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <Carousel className="w-full max-w-xs">
//       <CarouselContent>{children}</CarouselContent>
//       <CarouselPrevious className="dark:bg-foreground" />
//       <CarouselNext className="dark:bg-foreground" />
//     </Carousel>
//   );
// }
//
// function ExampleContent({ children }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <CarouselItem className="w-[100vh]">
//       <div className="p-1">
//         <Card>
//           <CardContent className="flex aspect-video items-center justify-center p-6">
//             {children}
//           </CardContent>
//         </Card>
//       </div>
//     </CarouselItem>
//   );
// }
