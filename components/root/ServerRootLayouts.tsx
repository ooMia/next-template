import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import Image from "next/image";
import Link from "next/link";

export function TopStickMenuBar() {
  const SimpleRouteMenubarMenu = () => {
    const routes = [/*"Overview",*/ "Scan", /*"Docs",*/ "Result", "Dev"];
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
    <Menubar className="sticky top-0 flex w-full border-0 p-4 space-x-4 bg-primary rounded-[0px] z-50">
      <Link href="/" className="pr-8">
        <Image src="Logo.svg" alt="Logo" width={100} height={37} />
      </Link>
      {SimpleRouteMenubarMenu()}
    </Menubar>
  );
}
