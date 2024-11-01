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
          className="text-background text-sm space-x-2 p-2"
          key={`Link-${route}`}
        >
          {route}
        </Link>
      </MenubarMenu>
    ));
  };
  return (
    <Menubar className="sticky top-0 bg-primary rounded ">
      <Link href="/">
        <Image src="Logo.svg" alt="Logo" width={100} height={37} />
      </Link>
      {SimpleRouteMenubarMenu()}
    </Menubar>
  );
}
