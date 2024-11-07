"use client";

// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "@/components/ui/hover-card";
// import {
//   AccessControl,
//   FunctionScope,
//   Variable,
// } from "@/types/response/api/result/static/CommonTypes";
// import { staticResponseOnPoolKey } from "@/utils/Constants";
// import { useMemo, useState } from "react";

// const response = staticResponseOnPoolKey;

// export default function ContractInformationSummaryPage() {
//   const fileScope = useMemo(() => {
//     return response.result.result.info.data;
//   }, [response]);
//   const contractScope = useMemo(() => {
//     return response.result.result.info.data.contract_scope;
//   }, [response]);
//   const functionScope = useMemo(() => {
//     return response.result.result.info.data.function_scopes;
//   }, [response]);

//   const [scope, setScope] = useState<"file" | "contract" | "function">(
//     "function"
//   );

//   return (
//     <div>
//       <h1 className='text-4xl'>head</h1>
//       {scope}
//       {scope === "function" && hoverCardFunctionScope({ props: functionScope[0] })}
//     </div>
//   );
// }

// function renderFunctionScopes({ props }: { props: FunctionScope[] }) {
//   return (
//     <div>
//       {props.map((prop, idx) => {
//         return (
//           <div key={idx}>
//             <div>{prop.body}</div>
//             <div>{prop.modifier}</div>
//             <div>{prop.name}</div>
//             <div>{prop.purity}</div>
//             <div>{prop.payable}</div>
//             <div>{prop.override}</div>
//             <div>{renderVariableScopes({ props: prop.parameters })}</div>
//             <div>{renderVariableScopes({ props: prop.returns })}</div>
//             <div>{renderVariableScopes({ props: prop.variable })}</div>
//             <div>{prop.visibility}</div>
//             <div>{renderAccessControls({ props: prop.access_control })}</div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// function renderVariableScopes({ props }: { props: Variable[] }) {
//   return (
//     <div>
//       {props.map((prop, idx) => {
//         return (
//           <div key={idx}>
//             <div>{prop.location}</div>
//             <div>{prop.mutability}</div>
//             <div>{prop.name}</div>
//             <div>{prop.scope}</div>
//             <div>{prop.signature}</div>
//             <div>{prop.type}</div>
//             <div>{prop.visibility}</div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// function renderAccessControls({ props }: { props: AccessControl[] }) {
//   return (
//     <div>
//       {props.map((prop, idx) => {
//         return (
//           <div key={idx}>
//             <div>{prop.logic}</div>
//             <div>{prop.method}</div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// function hoverCardVariableScope({ props }: { props: Variable }) {
//   return (
//     <HoverCard>
//       <HoverCardTrigger>{props?.name}</HoverCardTrigger>
//       <HoverCardContent>
//         <div>{props.location}</div>
//         <div>{props.mutability}</div>
//         <div>{props.scope}</div>
//         <div>{props.signature}</div>
//         <div>{props.type}</div>
//         <div>{props.visibility}</div>
//       </HoverCardContent>
//     </HoverCard>
//   );
// }

// function collapsibleVariableScopes({ props }: { props: Variable[] }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [firstProp, ...restProps] = props;
//   return (
//     <Collapsible
//       open={isOpen}
//       onOpenChange={setIsOpen}
//       className='w-[350px] space-y-2'
//     >
//       <div className='flex items-center justify-between space-x-4 px-4'>
//         <h4 className='text-sm font-semibold'>{props.length} variables</h4>
//         <CollapsibleTrigger asChild>
//           <Button variant='ghost' size='sm'>
//             <ChevronsUpDown className='h-4 w-4' />
//             <span className='sr-only'>Toggle</span>
//           </Button>
//         </CollapsibleTrigger>
//       </div>
//       <div>{hoverCardVariableScope({ props: firstProp })}</div>
//       <CollapsibleContent className='space-y-2'>
//         {restProps.map((prop, idx) => {
//           return <div key={idx}>{hoverCardVariableScope({ props: prop })}</div>;
//         })}
//       </CollapsibleContent>
//     </Collapsible>
//   );
// }

// function hoverCardAccessControl({ props }: { props: AccessControl }) {
//   return (
//     <HoverCard>
//       <HoverCardTrigger>{props.method}</HoverCardTrigger>
//       <HoverCardContent>
//         <div>{props.logic}</div>
//         <div>{props.method}</div>
//       </HoverCardContent>
//     </HoverCard>
//   );
// }

// function collapsibleAccessControls({ props }: { props: AccessControl[] }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [firstProp, ...restProps] = props;
//   return (
//     <Collapsible
//       open={isOpen}
//       onOpenChange={setIsOpen}
//       className='w-[350px] space-y-2'
//     >
//       <div className='flex items-center justify-between space-x-4 px-4'>
//         <h4 className='text-sm font-semibold'>{props.length} access controls</h4>
//         <CollapsibleTrigger asChild>
//           <Button variant='ghost' size='sm'>
//             <ChevronsUpDown className='h-4 w-4' />
//             <span className='sr-only'>Toggle</span>
//           </Button>
//         </CollapsibleTrigger>
//       </div>
//       <div>{hoverCardAccessControl({ props: firstProp })}</div>
//       <CollapsibleContent className='space-y-2'>
//         {restProps.map((prop, idx) => {
//           return <div key={idx}>{hoverCardAccessControl({ props: prop })}</div>;
//         })}
//       </CollapsibleContent>
//     </Collapsible>
//   );
// }

// function hoverCardFunctionScope({ props }: { props: FunctionScope }) {
//   return (
//     <HoverCard>
//       <HoverCardTrigger>{props.name}</HoverCardTrigger>
//       <HoverCardContent>
//         <div>{props.body}</div>
//         <div>{props.modifier}</div>
//         <div>{props.name}</div>
//         <div>{props.purity}</div>
//         <div>{props.payable}</div>
//         <div>{props.override}</div>
//         <div>{props.visibility}</div>
//         <div>{collapsibleVariableScopes({ props: props.parameters })}</div>
//         <div>{collapsibleVariableScopes({ props: props.returns })}</div>
//         <div>{collapsibleVariableScopes({ props: props.variable })}</div>
//         <div>{collapsibleAccessControls({ props: props.access_control })}</div>
//       </HoverCardContent>
//     </HoverCard>
//   );
// }

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { ChevronsUpDown } from "lucide-react";
// import { Button } from "@/components/ui/button";

export default function ContractInformationSummaryPage() {
  return <div>{/* @todo contract summary */}</div>;
}
