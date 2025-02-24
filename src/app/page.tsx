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
      sizes="33vw"
      style={{ objectFit: "contain" }}
    />
  );
  const bookImageBack = (
    <Image
      src="https://image.yes24.com/goods/140186612/back/XL"
      alt="book cover"
      fill
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
      sizes="33vw"
      style={{ objectFit: "contain" }}
    />
  );
  return (
    <main>
      {title}
      <div className="flex max-w-[50vw]">
        <div className="relative h-[50vh] w-[50vw]">{bookImageFront}</div>
        <div className="relative h-[50vh] w-[50vw]">{bookImageBack}</div>
      </div>
    </main>
  );
}
