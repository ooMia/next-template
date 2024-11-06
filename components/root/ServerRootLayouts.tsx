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
          className="p-2 text-white opacity-80 space-x-2 hover:text-accent hover:opacity-100"
          key={`Link-${route}`}
        >
          {route}
        </Link>
      </MenubarMenu>
    ));
  };
  return (
    <Menubar className="sticky top-0 flex w-full border-0 p-4 space-x-4 bg-primary rounded-none z-50 pt-6 pb-8">
      <Link href="/" className="pr-8">
        <Image src="Logo.svg" alt="Logo" width={100} height={37} />
      </Link>
      {SimpleRouteMenubarMenu()}
      <Link
        href="https://gamza-net.gitbook.io/gamza.net"
        target="_blank"
        className="p-2 text-white opacity-80 space-x-2 hover:bg-primary-800"
      >
        Docs
      </Link>
    </Menubar>
  );
}
