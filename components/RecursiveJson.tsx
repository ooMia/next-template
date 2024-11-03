// "use client";

// import { Button } from "./ui/button";
// import { Badge } from "./ui/badge";
// import { useState } from "react";
// import { Skeleton } from "@/components/ui/skeleton";

// interface RecursiveJsonProps {
//   data: any;
//   depth: number;
// }

// const RecursiveJson: React.FC<RecursiveJsonProps> = ({ data, depth = 0 }) => {
//   const [collapsed, setCollapsed] = useState<boolean>(true);

//   const toggleCollapse = () => {
//     setCollapsed(!collapsed);
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(JSON.stringify(data, null, 2));
//   };

//   const renderValue = (value: any) => {
//     if (Array.isArray(value) && value.length === 0) {
//       return <span>[]</span>;
//     }
//     if (typeof value === "object" && value !== null) {
//       return <RecursiveJson data={value} depth={depth + 1} />;
//     }
//     return <span>{value}</span>;
//   };

//   return (
//     <div style={{ paddingLeft: depth * 20 }}>
//       {data !== null ? (
//         <div>
//           <Badge onClick={copyToClipboard}>Copy</Badge>
//           <Button className="collapse-button" onClick={toggleCollapse}>
//             {collapsed ? ">" : "v"}
//           </Button>
//         </div>
//       ) : null}

//       {!collapsed && (
//         <div>
//           {Object.entries(data).map(([key, value]) => (
//             <div key={key}>
//               <strong>{key}:</strong> {renderValue(value)}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecursiveJson;

// export function RecursiveSkeleton() {
//   return (
//     <div className="flex items-center space-x-4">
//       <Skeleton className="h-12 w-12 rounded-full" />
//       <div className="space-y-2">
//         <Skeleton className="h-4 w-[250px]" />
//         <Skeleton className="h-4 w-[200px]" />
//       </div>
//     </div>
//   );
// }
