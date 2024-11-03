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
          className="select-none w-max-[1/2] "
        >
          Step into the Future of DeFi:
          <br /> Unlock the Power of
          <br /> Uniswap V4 Hooks with{" "}
        </p>
        <p className="bg-none text-primary">\&lt; Herbicide &gt;\</p>
      </header>
      {/* <HerbicideHero /> */}
      <PoolKeyForm />
      <ExampleContainer>
        <ExampleContent>STEP 1</ExampleContent>
        <ExampleContent>STEP 2</ExampleContent>
        <ExampleContent>STEP 3</ExampleContent>
        <ExampleContent>STEP 4</ExampleContent>
        <ExampleContent>STEP 5</ExampleContent>
      </ExampleContainer>
    </main>
  );
}

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import PoolKeyForm from "@/components/PoolKeyForm";

export function ExampleContainer({ children }: { children: React.ReactNode }) {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>{children}</CarouselContent>
      <CarouselPrevious className="dark:bg-foreground" />
      <CarouselNext className="dark:bg-foreground" />
    </Carousel>
  );
}

function ExampleContent({ children }: { children: React.ReactNode }) {
  return (
    <CarouselItem className="w-[100vh]">
      <div className="p-1">
        <Card>
          <CardContent className="flex aspect-video items-center justify-center p-6">
            {children}
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
}
