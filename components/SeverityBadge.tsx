import { SeverityBadgeProp } from "@/types/Property";
import { Badge } from "@/components/ui/badge";

const SeverityBadge = ({ severity }: { severity: SeverityBadgeProp }) => {
  const getColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "red";
      case "medium":
        return "purple";
      case "low":
        return "yellow";
      case "info":
        return "green";
      default:
        return "gray";
    }
  };

  const color = getColor(severity);

  return (
    <Badge
      style={{
        backgroundColor: color,
        color: "white",
      }}
    >
      {severity.toUpperCase()}
    </Badge>
  );
};

export default SeverityBadge;
