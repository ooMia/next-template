import HerbicideHero from "@/components/Hero";

export default function Home() {
  return (
    <main
      className="flex flex-col items-center justify-center
        w-full h-full text-black"
    >
      <HerbicideHero />
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
