// "use client";

// import AnalysisResponseType, {
//   With20,
//   Erc20Data,
//   With6909,
//   Erc6909Data,
//   Data,
//   BaseData,
//   Swap,
// } from "@/types/AnalysisResponse";
// import { rawResponse } from "./response";
// import { MethodStringType, AssetKeyType, AssetType } from "@/types/Mapper";
// import { useState } from "react";
// export default function Page() {
//   const data: Data = rawResponse.result.data;

//   const [method, setMethod] = useState<MethodStringType>("swap");
//   const [assetType, setAssetType] = useState<AssetKeyType>("with_20");
//   const [isSwapExactIn, setIsSwapExactIn] = useState<AssetType>("erc20");
//   const [isSwapExactOut, setIsSwapExactOut] = useState<AssetType>("erc20");

//   return (
//     <div>
//       <DeltaERCs data={data} method={method} />
//       {/* {assetType === "with_20" && (
//         <DeltaERC20 props={data.with_20} method={method} />
//       )}
//       {assetType === "with_6909" && (
//         <DeltaERC6909 props={data.with_6909} method={method} />
//       )} */}
//     </div>
//   );
// }

// function DeltaERCs({ data, method }: { data: Data; method: MethodStringType }) {
//   if (method === "donate") return null;
//   if (method === "swap") {
//     const data20: Swap[] = data.with_20[method];
//     const data6909: Swap[] = data.with_6909[method];
//     return (
//       <div>
//         DeltaERCs
//         {data20.map((data) => {
//           return <DeltaERC20 data={data} method={method} key={

//           }/>;
//         })}
//         {data6909.map((data) => {
//           return <DeltaERC6909 data={data} method={method} />;
//         })}
//       </div>
//     );
//   }

//   const data20: Erc20Data = data.with_20[method];
//   const data6909: Erc6909Data = data.with_6909[method];

//   return (
//     <div>
//       DeltaERCs
//       <DeltaERC20 data={data20} method={method} />
//       <DeltaERC6909 data={data6909} method={method} />
//     </div>
//   );
// }

// function DeltaERC20({
//   data,
//   method,
// }: {
//   data: Erc20Data;
//   method: MethodStringType;
// }) {
//   return (
//     <div>
//       ERC20Delta
//       <p>{data.managerAmount0delta}</p>
//       <p>{data.managerAmount1delta}</p>
//       <p>{data.hookAmount0delta}</p>
//       <p>{data.hookAmount1delta}</p>
//       <p>{data.userAmount0delta}</p>
//       <p>{data.userAmount1delta}</p>
//     </div>
//   );
// }

// function DeltaERC6909({
//   data,
//   method,
// }: {
//   data: Erc6909Data;
//   method: MethodStringType;
// }) {
//   if (method === "donate") return null;

//   return (
//     <div>
//       ERC6909Delta
//       <p>{data.hook6909Amount0delta}</p>
//       <p>{data.hook6909Amount1delta}</p>
//       <p>{data.user6909Amount0delta}</p>
//       <p>{data.user6909Amount1delta}</p>
//     </div>
//   );
// }
