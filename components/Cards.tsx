import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function TestLogPreviewCard({
  title,
  description,
  content,
  footer,
}: Readonly<{
  title: string;
  description: string;
  content: string;
  footer?: string;
}>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle> {title} </CardTitle>
        <CardDescription> {description} </CardDescription>
      </CardHeader>
      <CardContent>
        <p> {content} </p>
      </CardContent>
      <CardFooter>
        {footer && <p className="text-xs"> {footer} </p>}
        <Button>Click me</Button>
      </CardFooter>
    </Card>
  );
}

export function GasConsumptionCard(
  method: string,
  withHook: number,
  withoutHook: number,
) {
  return (
    <Card>
      <CardHeader>
        <CardTitle> {method} </CardTitle>
        <CardDescription>
          this is the description of the gas consumption card.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {withHook}
        {withoutHook}
        {
          withHook - withoutHook // difference between withHook and withoutHook
        }
      </CardContent>
      <CardFooter>
        <p className="text-xs">
          This is the footer of the gas consumption card.
        </p>
        <Button>Click me</Button>
      </CardFooter>
    </Card>
  );
}
