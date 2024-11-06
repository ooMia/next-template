import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import Image from "next/image";
import Link from "next/link";

export function TopStickMenuBar() {
  const SimpleRouteMenubarMenu = () => {
    const routes = ["Scan"];
    return routes.map((route) => (
      <MenubarMenu key={`MenubarMenu-${route}`}>
        <Link
          href={`/${route.toLowerCase()}`}
          className="p-2 text-black opacity-80 space-x-2 hover:text-accent hover:opacity-100 hover:bg-[#F1F1F1] rounded-[50px] text-center justify-center"
          style={{
            width: "152px",
            height: "51px",
            fontFamily: "'SF Pro Display'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "31px",
            alignItems: "center",
            textAlign: "center",
            color: "#131313",
          }}
          key={`Link-${route}`}
        >
          {route}
        </Link>
      </MenubarMenu>
    ));
  };
  return (
    <Menubar className="sticky flex top-[0] w-full border-0 mt-2 bg-white text-black rounded-none z-50 pt-6 pb-8 gap-[24px]">
      <Link href="/" className="pr-8 ml-6">
        <Image src="Logo.svg" alt="Logo" width={200} height={71} />
      </Link>
      {SimpleRouteMenubarMenu()}
      <Link
        href="https://gamza-net.gitbook.io/gamza.net"
        target="_blank"
        className="p-2 text-black opacity-80 space-x-2 hover:text-accent hover:opacity-100 hover:bg-[#F1F1F1] rounded-[50px] justify-center"
        style={{
          width: "152px",
          height: "51px",
          fontFamily: "'SF Pro Display'",
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: "31px",
          alignItems: "center",
          textAlign: "center",
          color: "#131313",
        }}
      >
        Docs
      </Link>
    </Menubar>
  );
}
