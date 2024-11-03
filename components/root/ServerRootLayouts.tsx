import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import Image from "next/image";
import Link from "next/link";
export function MenubarDemo() {
  const SimpleRouteMenubarMenu = () => {
    const routes = [/*"Overview",*/ "Scan", /*"Docs",*/ "Result", "Dev"];
    return routes.map((route) => (
      <MenubarMenu key={`MenubarMenu-${route}`}>
        <Link
          href={`/${route.toLowerCase()}`}
          className="text-white space-x-2 p-2 opacity-80 hover:opacity-100 hover:text-accent"
          key={`Link-${route}`}
        >
          {route}
        </Link>
      </MenubarMenu>
    ));
  };
  return (
    <Menubar className="flex space-x-4 p-4 sticky w-full top-0 bg-primary rounded-[0px] border-0">
      <Link href="/" className="pr-8">
        <Image src="Logo.svg" alt="Logo" width={100} height={37} />
      </Link>
      {SimpleRouteMenubarMenu()}
    </Menubar>
  );
}
