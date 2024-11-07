"use client";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { staticResponseOnPoolKey } from "@/utils/Constants";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ScrollableWindow from "@/components/ScorllableWindow";

const response = staticResponseOnPoolKey;
type Threat = {
  detail?:
    | {
        title: string;
        description: string;
        impact: string;
        recommendation: string;
      }
    | undefined;
  check?: string;
  name: string;
  description: string;
  markdown?: string;
  severity: string;
  type: string;
};

const object = response.result.result.threats.map((threat) => {
  return {
    name: threat.detector,
    description: threat.data.description,
    markdown: "",
    severity: threat.data.impact,
    check: "",
    type: "custom",
  };
});

let object2 = response.result.slither.detector.data.map((threat) => {
  return {
    name: response.result.slither.detector.detector,
    description: threat.description,
    markdown: threat.markdown,
    severity: threat.confidence,
    check: threat.check,
    type: "slither",
  };
});
const contractName = response.result.result.info.data.contract_scope.name;

object2 = object2.concat(object).filter((item) => {
  return JSON.stringify(item)
    .toLowerCase()
    .includes(contractName.toLowerCase());
});

const gasGriefThreat: Threat = {
  name: "Gas Grief",
  description:
    "Running the Swap function of the pool key consumes more than twice as much gas as No Hook.",
  severity: "Low",
  markdown: "",
  type: "custom",
};

const gasGriefThreatDetail: {
  title: string;
  description: string;
  impact: string;
  recommendation: string;
} = {
  title: "Gas Grief",
  description:
    "The 'Gas Grief' issue arises when transactions on the network require excessive gas fees due to poorly optimized or repetitive function calls. This can happen when functions, like transferring assets or verifying information, are not optimized for gas efficiency or are prone to executing multiple times unnecessarily. In smart contract environments, this inefficiency can create situations where the gas cost far exceeds the value of the transaction itself, making the transaction economically unfeasible for users.",
  impact:
    "When gas grief issues occur, they increase the transaction costs for end users, which can lead to users avoiding interactions with certain smart contracts or dApps. For an attacker, it could mean a potential vector to 'grief' or disrupt others by forcing them to spend disproportionately high gas fees on specific transactions. Over time, this can reduce trust in the platform or lead to increased abandonment of affected services.",
  recommendation:
    "Consider reviewing and optimizing the functions where gas grief may be occurring, particularly by reducing loops or heavy operations within commonly called functions. Additionally, consider implementing batching mechanisms or using layer-2 scaling solutions that can mitigate high gas fees by executing transactions off-chain, reducing the overall gas burden for users.",
};

const upgradeabilityThreat: Threat = {
  name: "Upgradeability",
  description:
    "The hook contract for that pool key has been identified as a proxy contract.",
  severity: "Medium",
  markdown: "",
  type: "custom",
};

const upgradeabilityThreatDetail: {
  title: string;
  description: string;
  impact: string;
  recommendation: string;
} = {
  title: "Upgradeability",
  description:
    "Upgradeability is a feature that allows smart contracts to be updated after deployment by redirecting function calls to a new contract version. While essential for adapting to new requirements or addressing bugs, upgradeability introduces risks, as it requires a mechanism to replace or change contract logic. This ability to modify a contract’s behavior post-deployment can expose the contract to potential vulnerabilities or exploit scenarios if not handled securely.",
  impact: `The upgradeability feature can lead to serious security threats. If the upgrade mechanism is poorly implemented or insufficiently protected, malicious actors could exploit it to introduce unauthorized code, alter contract behavior, or even take control of assets within the contract. Common issues include:
    - Unauthorized Upgrades: Weak access controls could allow unauthorized parties to perform upgrades, leading to full control over contract functionality and access to sensitive assets.
    - Storage Collisions: Upgrades may unintentionally overwrite important storage variables, leading to corruption of contract data or breaking functionality.
    - Backdoor Vulnerabilities: Upgradable contracts may unintentionally include hidden functions or weak upgrade permissions, enabling potential attackers to perform arbitrary upgrades at a later date.
    - User Trust: Frequent or unauthorized upgrades can erode user confidence, as users may fear losing funds or being subject to unexpected behavior changes.
    - These issues can lead to severe consequences, including loss of funds, contract takeover, and damage to the project's reputation.`,
  recommendation:
    "Special attention needs to be paid to whether the proxy contract can be changed without permission.",
};

const timeLockThreat: Threat = {
  name: "TimeLock",
  description:
    "This pool key does not appear to be a pool key that can be used at any time.",
  severity: "Medium",
  markdown: "",
  type: "custom",
};

const timeLockThreatDetail: {
  title: string;
  description: string;
  impact: string;
  recommendation: string;
} = {
  title: "TimeLock",
  description:
    "In some DEX scam cases, liquidity providers are prevented from reclaiming all their assets in the Liquidity Pool, or liquidity can only be added or removed at certain times or under certain conditions, leading to user inconvenience and potential loss. If Uniswap V4 Liquidity Pools become unusable after a certain time period, this can result in significant accessibility issues for users.",
  impact:
    "If liquidity becomes inaccessible after a certain time or point, users will face limitations in retrieving or managing their assets in the pool. This could lead to liquidity being 'locked' or unavailable, compromising users' ability to interact with the pool as needed. Such restrictions undermine the availability and reliability of the DEX, harming user trust and potentially resulting in financial loss for those affected.",
  recommendation:
    "To prevent scenarios where a Liquidity Pool becomes unusable after a set period, developers using hooks must carefully design and test to ensure continuous availability. Hook developers should monitor when and under what conditions the Liquidity Pool becomes inaccessible and address any potential access issues to ensure uninterrupted operation. Tracking and modifying problematic hook functions will help maintain liquidity availability and prevent accessibility issues.",
};

const reInitializeThreat: Threat = {
  name: "ReInitialize",
  description:
    "This pool key has no limitation on initialize, and storage management is found to be inadequate.",
  severity: "Medium",
  markdown: "",
  type: "custom",
};

const reInitializeThreatDetail: {
  title: string;
  description: string;
  impact: string;
  recommendation: string;
} = {
  title: "ReInitialize",
  description:
    "The reinitialize keyword is used in smart contract design to allow re-execution of initialization functions under controlled conditions. It is particularly relevant for another `poolKey`, where developers may need to add new initialization logic. the initialize function is typically called only once to set up the contract state.",
  impact: `- The ability to reinitialize can be beneficial, but it also introduces potential risks if not handled carefully.
    - Unintentional Resetting: Revitalizing can inadvertently reset critical parameters if access controls are not strict, potentially leading to loss of data, funds, or other unwanted changes in contract state.
    - Security Risks: If re-initialization functions are poorly secured, an attacker could potentially reinitialize the contract to exploit new or existing vulnerabilities, allowing them to take control or modify the contract’s functionality in unintended ways.
    - Compatibility Issues: Improper or excessive use of reinitialize can lead to storage clashes or inconsistencies, especially when upgrading complex contracts, leading to possible malfunctions or unexpected behavior.`,
  recommendation:
    "Carefully plan each initialize to avoid overlapping storage variables or conflicting logic, and only allow reinitialize functions for setting up newly added state variables rather than altering any previous initialization values. Conduct thorough testing and audits for each re-initialization to avoid any security risks and preserve data integrity.",
};

const onlyPoolManagerThreat: Threat = {
  name: "OnlyPoolManager",
  description:
    "In addition to the PoolManager, the hook contract can call hook function, which requires attention.",
  severity: "Medium",
  markdown: "",
  type: "custom",
};

const onlyPoolManagerThreatDetail: {
  title: string;
  description: string;
  impact: string;
  recommendation: string;
} = {
  title: "OnlyPoolManager",
  description:
    "In the context of access control, OnlyPoolManager acts as a critical safeguard, ensuring that only authorized entities (specifically, those with the Pool Manager role) can perform specific actions within a contract. When callback functions are involved, this restriction becomes even more essential. Callback functions allow one contract to call another function as part of a transaction flow, often executing actions based on external conditions or events. If these callbacks are not adequately restricted, they can be exploited by unauthorized parties, leading to unexpected or malicious behavior. The OnlyPoolManager modifier can prevent unauthorized callbacks by enforcing strict access checks.",
  impact: `Allowing unrestricted access to callback functions poses several security risks:
    - Unauthorized Invocation: If callback functions can be triggered by any address or contract, malicious actors could exploit these functions to manipulate the contract’s behavior. They could call functions in unintended ways, potentially draining funds, altering important parameters, or causing state inconsistencies.
    - Unexpected Reentrancy: Unrestricted callbacks can open up reentrancy risks, where an attacker repeatedly calls a callback to execute the same function multiple times before it finishes. This can lead to unexpected changes in contract state or even asset theft if the contract is handling funds.
    - Loss of Control: Callback functions are typically designed to be invoked only by specific contracts or addresses under particular conditions. If OnlyPoolManager is not applied, there’s a risk that unauthorized contracts might control these functions, reducing the protocol’s security and undermining its intended design.`,
  recommendation:
    "Implement the OnlyPoolManager modifier on any Hook callback functions to ensure they are only callable by authorized entities or under predefined conditions. Additionally, consider adding other safeguards like non-reentrant checks to prevent reentrancy attacks. Conduct regular audits of callback functions, focusing on who can call them and under what circumstances, to ensure there are no vulnerabilities. Using a well-defined ACL system around callbacks can prevent unauthorized access, protect contract integrity, and maintain user trust in the system.",
};

const additionalThreats: Threat[] = [
  gasGriefThreat,
  upgradeabilityThreat,
  timeLockThreat,
  reInitializeThreat,
  onlyPoolManagerThreat,
];

const additionalThreatDetails: {
  title: string;
  description: string;
  impact: string;
  recommendation: string;
}[] = [
  gasGriefThreatDetail,
  upgradeabilityThreatDetail,
  timeLockThreatDetail,
  reInitializeThreatDetail,
  onlyPoolManagerThreatDetail,
];

const object3 = [
  ...object2,
  ...additionalThreats.map((threat) => {
    return {
      name: threat.name,
      description: threat.description,
      markdown: threat.markdown,
      severity: threat.severity,
      check: "",
      type: threat.type,
    };
  }),
];

export default function StaticAnalysisResultPage() {
  const data = object3;
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Threat[]>();

  useEffect(() => {
    setResult(
      data.filter((item) => {
        return JSON.stringify(item).toLowerCase().includes(query.toLowerCase());
      }),
    );
  }, [data, query, setResult]);

  return (
    <div className="flex flex-col my-4 max-h-[800px] ml-2 gap-y-2">
      <div className="relative w-[96%] ">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
          🔍
        </span>
        <Input
          defaultValue={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-white text-black pl-10"
        />
      </div>
      <ScrollableWindow className="space-y-2 h-full">
        {result &&
          result.map((item, index) => {
            return (
              <AnalysisResultLog
                key={index}
                title={item.name}
                description={item.description}
                markdown={item.markdown}
                severity={item.severity}
                check={item.check}
                type={item.type}
                query={query}
                detail={additionalThreatDetails.find(
                  (threat) => threat.title === item.name,
                )}
              />
            );
          })}
      </ScrollableWindow>

      {/* <Alert className='w-[96%]'>
        <LightbulbIcon className='h-4 w-4' />
        <AlertTitle>Notice</AlertTitle>
        <AlertDescription>
          1. Due to the internal preprocessing that removes comments, the
          visible line numbers may differ from the actual source code line
          numbers.
          <br />
          2. While rendering the source code, different char sets may be used,
          making search on browser not accurate.
        </AlertDescription>
      </Alert> */}
    </div>
  );
}
// @remind RightSide - potential issues

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export function AnalysisResultLog({
  title,
  description,
  markdown,
  severity,
  detail,
}: {
  title: string;
  description: string;
  markdown?: string;
  severity: string;
  check?: string;
  type: string;
  query?: string;
  detail?: {
    title: string;
    description: string;
    impact: string;
    recommendation: string;
  };
}) {
  // const regex = new RegExp(
  //   `\\-? \\[([\\s\\S]+?)\\]\\(\\S+${contractName}\\.sol#L(\\d+)\\)`,
  //   "g",
  // );

  // const matches = markdown ? [...markdown.matchAll(regex)] : [];
  // const results = matches.map((match) => ({
  //   text: match[1],
  //   lineNumber: match[2],
  // }));
  // const badgeStyles = severity && getBadgeStyles(severity);
  const titleMatch = markdown
    ? markdown.match(/\s([\s\w]+?)\W+\[/)
    : description.match(/\s([\s\w]+?)\w+\[/);
  const extractedTitle = titleMatch ? titleMatch[1].trim() : title;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Alert className={`max-w-[35vw] ${getCardStyles(severity)} mx-2 mb-4 `}>
          <AlertTitle className="flex ">
            <ExclamationTriangleIcon className="h-8 w-8 mx-2 opacity-100 text-yellow-700 " />

            <span className="text-[15px] text-black font-bold flex flex-col break-words">
              <div className="flex items-end gap-x-2 ">
                {extractedTitle.charAt(0).toUpperCase() +
                  extractedTitle.slice(1)}
                <Badge
                  className={` hover:bg-yellow-300 mr-2 text-xs select-none cursor-default font-fira-code py-0  ${getBadgeStyles(severity)} `}
                >
                  {severity}
                </Badge>
              </div>

              <span className="text-xs text-gray-400 ">
                {description.slice(0, 60)}...
              </span>
            </span>
          </AlertTitle>
        </Alert>
      </DialogTrigger>

      <DialogContent
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-[15px]",
          "max-w-[80vw]",
        )}
      >
        <DialogTitle className="text-slate-200 text-2xl font-semibold p-4">
          {titleMatch ? titleMatch : title}
          <Badge
            className={` hover:bg-yellow-300 mr-2 text-xs select-none cursor-default font-fira-code py-0 ml-2  ${getBadgeStyles(severity)}`}
          >
            {severity}
          </Badge>
        </DialogTitle>

        <div className="divide-y divide-slate-700 rounded-lg border border-slate-700 bg-slate-900 overflow-hidden">
          {/* Description Row */}
          <div className="grid grid-cols-[200px,1fr] divide-x divide-slate-700">
            <div className="bg-slate-800 p-4 flex items-center justify-center">
              <h3 className="text-slate-200 font-semibold">Description</h3>
            </div>
            <div className="p-4 text-slate-300 leading-relaxed">
              {description}
            </div>
          </div>

          {/* Impact Row */}
          <div className="grid grid-cols-[200px,1fr] divide-x divide-slate-700">
            <div className="bg-slate-800 p-4 flex items-center justify-center">
              <h3 className="text-slate-200 font-semibold">Impact</h3>
            </div>
            <div className="p-4 text-slate-300 leading-relaxed">
              {detail?.impact &&
                detail.impact.split("\n").map((line, index) =>
                  line.trim().startsWith("-") ? (
                    <li key={index} className="ml-4 list-disc">
                      {line.replace("-", "").trim()}
                    </li>
                  ) : (
                    <p key={index}>{line}</p>
                  ),
                )}
            </div>
          </div>

          {/* Recommendation Row */}
          <div className="grid grid-cols-[200px,1fr] divide-x divide-slate-700">
            <div className="bg-slate-800 p-4 flex items-center justify-center">
              <h3 className="text-slate-200 font-semibold">Recommendation</h3>
            </div>
            <div className="p-4 text-slate-300 leading-relaxed">
              {detail?.recommendation &&
                detail.recommendation.split("\n").map((line, index) =>
                  line.trim().startsWith("-") ? (
                    <li key={index} className="ml-4 list-disc">
                      {line.replace("-", "").trim()}
                    </li>
                  ) : (
                    <p key={index}>{line}</p>
                  ),
                )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Critical: DB0004, High: EA6336, Medium: EA9C36, Low: EAE436, info: 36A2EA
const getCardStyles = (severity: string) => {
  switch (severity) {
    case "High":
      return `border bg-red-500 text-red-900 `;
    case "Low":
      return `text-xs border bg-[EAE436] text-[EAE436]  box-border pr-8 h-[64px] min-h-[64px] max-h-[64px] bg-white border-[EAE436] rounded-lg select-none`;
    case "Medium":
      return `text-xs border bg-[EA9C36] text-[EA9C36]  box-border  h-[64px] min-h-[64px] h-[70px] bg-white border-[EA9C36] rounded-lg select-none`;
    case "Info":
      return `border bg-blue-500 text-blue-900 `;
    default:
      return `border bg-gray-500 text-gray-900 `;
  }
};

const getBadgeStyles = (severity: string) => {
  switch (severity) {
    case "High":
      return `border bg-red-500 text-red-900 `;
    case "Low":
      return `pl-5 w-[64px] border bg-yellow-500 text-yellow-900 `;
    case "Medium":
      return `border bg-orange-500 text-orange-900 `;

    case "Info":
      return `border bg-blue-500 text-blue-900 `;
    default:
      return `border bg-gray-500 text-gray-900 `;
  }
};
