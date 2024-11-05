import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function TetherLogo({ className }: { className?: string }) {
  return (
    <Avatar className={className}>
      <AvatarImage
        src="https://cdn.worldvectorlogo.com/logos/tether.svg"
        alt="tether"
      />
      <AvatarFallback>Tether</AvatarFallback>
    </Avatar>
  );
}

export function EtherLogo({ className }: { className?: string }) {
  return (
    <Avatar className={className}>
      <AvatarImage
        src="https://cdn.worldvectorlogo.com/logos/ethereum-eth.svg"
        alt="tether"
      />
      <AvatarFallback>Ether</AvatarFallback>
    </Avatar>
  );
}
