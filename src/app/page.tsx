import front from "@/public/front.jpeg";
import Image from "next/image";

export default function RootPage() {
  const title = <div id="title">Fluent React</div>;
  const bookImageFront = (
    <Image
      src={front}
      alt="book cover"
      fill
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
    />
  );
  const bookImageBack = (
    <Image
      src="https://image.yes24.com/goods/140186612/back/XL"
      alt="book cover"
      fill
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
    />
  );
  return (
    <main>
      {title}
      <div className="flex gap-4 w-full">
        <div className="relative w-1/2 aspect-[3/4]">{bookImageFront}</div>
        <div className="relative w-1/2 aspect-[3/4]">{bookImageBack}</div>
      </div>
    </main>
  );
}
