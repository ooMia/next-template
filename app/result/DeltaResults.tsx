// "use client";

// import { Data } from "@/types/AnalysisResponse";
// import MapperType, { AssetType, MethodStringType } from "@/types/Mapper";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";

// const _mapper: MapperType = {
//   addLiquidity: {
//     exactIn: {
//       erc20: true,
//       erc6909: true,
//     },
//   },
//   removeLiquidity: {
//     exactOut: {
//       erc20: true,
//       erc6909: true,
//     },
//   },
//   donate: {
//     exactIn: {
//       erc20: true,
//       erc6909: false,
//     },
//   },
//   swap: {
//     exactIn: {
//       erc20: {
//         erc20: true,
//         erc6909: true,
//       },
//       erc6909: {
//         erc20: true,
//         erc6909: false,
//       },
//     },
//     exactOut: {
//       erc20: {
//         erc20: true,
//         erc6909: true,
//       },
//       erc6909: {
//         erc20: true,
//         erc6909: false,
//       },
//     },
//   },
// };

// export default function DeltaResults({ data }: { data: Data }) {
//   const [method, setMethod] = useState<MethodStringType>("swap");
//   const [isExactIn, setIsExactIn] = useState<AssetType>("erc20");
//   const [isExactOut, setIsExactOut] = useState<AssetType>("erc20");

//   function isValid(
//     method: MethodStringType,
//     exactIn: AssetType,
//     exactOut: AssetType,
//   ): boolean {
//     if (method === "swap") {
//       const m = _mapper[method];
//       if (exactIn && exactOut) {
//         return m.exactIn[exactIn][exactOut];
//       }
//       return false;
//     }

//     const m = _mapper[method];
//     if (exactIn && m.exactIn) {
//       return m.exactIn[exactIn];
//     }
//     if (exactOut && m.exactOut) {
//       return m.exactOut[exactOut];
//     }
//     return false;
//   }

//   return (
//     <div className="border">
//       <h1>Delta Results</h1>

//       <div className="flex space-x-4">
//         {
//           // setter button group
//           Object.keys(_mapper).map((key) => (
//             <Button
//               onClick={() => setMethod(key as MethodStringType)}
//               key={key}
//             >
//               {key}
//             </Button>
//           ))
//         }
//       </div>

//       <div className="flex space-x-4 text-[30px]">
//         <p>{method}</p>
//         {_mapper[method].exactIn && <p>{isExactIn}</p>}
//         {_mapper[method].exactOut && <p>{isExactOut}</p>}
//       </div>

//       {_mapper[method].exactIn && (
//         <div className="flex space-x-4">
//           exactIn
//           {
//             // exactIn button group
//             ["erc20", "erc6909"].map((key) => (
//               <Button
//                 id="terms"
//                 onClick={() => setIsExactIn(key as AssetType)}
//                 key={`${key}-exactIn`}
//               >
//                 {key}
//               </Button>
//             ))
//           }
//         </div>
//       )}

//       <div className="flex space-x-4">
//         exactOut
//         {
//           // exactIn button group
//           ["erc20", "erc6909"].map((key) => (
//             <Button
//               id="terms"
//               onClick={() => setIsExactOut(key as AssetType)}
//               key={`${key}-exactOut`}
//             >
//               {key}
//             </Button>
//           ))
//         }
//       </div>

//       <h1 className="text-[30px]">
//         {isValid(method, isExactIn, isExactOut) ? "true" : "false"}
//       </h1>
//     </div>
//   );
// }

// // export function ButtonWithLabel(
// //   buttonContent: string,
// //   labelContent: string,
// //   onClick: () => void
// // ) {
// //   const key = buttonContent + labelContent;
// //   return (
// //     <div key={`${key}-container-1`}>
// //       <div className='flex items-center space-x-2' key={`${key}-container-2`}>
// //         <Button id='terms' onClick={onClick}>
// //           {buttonContent}
// //           key={`${key}-button`}
// //         </Button>
// //         <Label htmlFor='terms' key={`${key}-label`}>
// //           {labelContent}
// //         </Label>
// //       </div>
// //     </div>
// //   );
// // }

// // buttons with label

// /**
//   {_mapper[method].exactIn && (
//   <div className='flex space-x-4'>
//     {
//       // exactIn button group
//       ["erc20", "erc6909"].map((key) => (
//         <div
//           className='flex flex-col space-x-2'
//           key={`${key}-container-2`}
//         >
//           <Label htmlFor='terms' key={`${key}-label`}>
//             exactIn
//           </Label>
//           <Button
//             id='terms'
//             onClick={() => setIsExactIn(key as AssetType)}
//           >
//             {key}
//           </Button>
//         </div>
//       ))
//     }
//   </div>
// )}
//  */
