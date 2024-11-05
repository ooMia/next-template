"use client";

import { post } from "@/app_legacy/actions/v1/tasks/actions";
import CodeHighlighter from "@/components/form/CodeHighlighter";
import { AddressInput, NumberInput } from "@/components/form/PoolKeyForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Address } from "@/types/Property";
import TaskCreationRequest, {
  TaskCreationSourceOnlyRequest,
} from "@/types/request/api/tasks/TaskCreationRequest";
import { sampleCodeTakeProfitHook } from "@/utils/Constants";
import { Tabs } from "@radix-ui/react-tabs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function Page(): React.ReactNode {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center">
      <Tabs defaultValue="PoolKey" className="w-2/3">
        <TabsList>
          <TabsTrigger value="PoolKey">PoolKey</TabsTrigger>
          <TabsTrigger value="HookCode">HookCode</TabsTrigger>
        </TabsList>
        <TabsContent value="PoolKey">
          <PoolKeyForm router={router} />
        </TabsContent>
        <TabsContent value="HookCode">
          <HookCodeForm router={router} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

async function doRequest(data: TaskCreationRequest): Promise<void> {
  try {
    // TODO: revalidate cache based on user TTL settings
    if (localStorage.getItem("_herbicide_request") !== JSON.stringify(data)) {
      localStorage.setItem("_herbicide_request", JSON.stringify(data));
      const response = await post(data);
      localStorage.setItem("_herbicide_response", JSON.stringify(response));
    }
  } catch (error) {
    console.error("Server error: ", error);
    alert("A server error occurred. Please try again later.");
  }
}

function PoolKeyForm({ router }: Readonly<{ router: AppRouterInstance }>) {
  // TODO: send request to server based on the input

  const [currency0, setCurrency0] = useState<Address>("");
  const [currency1, setCurrency1] = useState<Address>("");
  const [fee, setFee] = useState<string>("");
  const [tickSpacing, setTickSpacing] = useState<string>("");
  const [hooks, setHooks] = useState<Address>("");
  const [deployer, setDeployer] = useState<Address>("");

  const onClickSamplePoolKeyHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    // {
    //   "data": {
    //     "currency0": "0x0197481B0F5237eF312a78528e79667D8b33Dcff",
    //     "currency1": "0xA56569Bd93dc4b9afCc871e251017dB0543920d4",
    //     "fee": 3000,
    //     "hooks": "0x6da8f09885Bb7aaD2d45476179DbC75573984080",
    //     "tickSpacing": 60
    //   },
    //   "deployer": "0x4e59b44847b379578588920cA78FbF26c0B4956C"
    // }
    setCurrency0("0x0197481B0F5237eF312a78528e79667D8b33Dcff");
    setCurrency1("0xA56569Bd93dc4b9afCc871e251017dB0543920d4");
    setFee("3000");
    setTickSpacing("60");
    setHooks("0x6da8f09885Bb7aaD2d45476179DbC75573984080");
    setDeployer("0x4e59b44847b379578588920cA78FbF26c0B4956C");

    // Test1
    // setCurrency0("0x0197481B0F5237eF312a78528e79667D8b33Dcff");
    // setCurrency1("0xA56569Bd93dc4b9afCc871e251017dB0543920d4");
    // setFee("3000");
    // setTickSpacing("60");
    // setHooks("0x6caC2dcc5eCf5caac0382F1B4A77EABac0F6C0Cc");
    // setDeployer("0x7024cc7e60D6560f0B5877DA2bb921FCbF1f4375");
  };

  function makePoolKeyRequestBody(): TaskCreationRequest {
    return {
      data: {
        Poolkey: {
          currency0,
          currency1,
          fee: Number(fee),
          tickSpacing: Number(tickSpacing),
          hooks,
        },
        mode: 2, // TODO: support other modes
        deployer,
      },
    };
  }

  return (
    <Card>
      <CardHeader className="flex">
        <CardTitle>PoolKeyForm</CardTitle>
        <CardDescription>desc</CardDescription>
      </CardHeader>
      <CardContent className="text-xs">
        <AddressInput
          name="currency0"
          label="Currency currency0"
          state={currency0}
          onChange={setCurrency0}
        />
        <AddressInput
          name="currency1"
          label="Currency currency1"
          state={currency1}
          onChange={setCurrency1}
        />
        <NumberInput
          name="fee"
          label="uint24 fee"
          state={fee}
          onChange={setFee}
        />
        <NumberInput
          name="tickSpacing"
          label="int24 tickSpacing"
          state={tickSpacing}
          onChange={setTickSpacing}
        />
        <AddressInput
          name="hook"
          label="IHook hooks"
          state={hooks}
          onChange={setHooks}
        />
        <AddressInput
          name="deployer"
          label="address deployer"
          state={deployer}
          onChange={setDeployer}
        />
        <button
          onClick={onClickSamplePoolKeyHandler}
          className="text-xs cursor-pointer hover:underline"
        >
          need a sample?
        </button>
      </CardContent>
      <CardFooter>
        <Button
          className="bg-primary text-white"
          onClick={(e) => {
            e.preventDefault();
            doRequest(makePoolKeyRequestBody()).then(() => {
              router.push("/result");
            });
          }}
        >
          Scan
        </Button>
      </CardFooter>
    </Card>
  );
}

function HookCodeForm({ router }: Readonly<{ router: AppRouterInstance }>) {
  // TODO: send request to server based on the input
  const [code, setCode] = useState<string>("");

  const onClickSamplePoolKeyHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setCode(sampleCodeTakeProfitHook);
  };

  function makeHookCodeRequestBody(): TaskCreationSourceOnlyRequest {
    return {
      data: {
        source: code,
        mode: 4,
      },
    };
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>HookCodeForm</CardTitle>
        <CardDescription> desc </CardDescription>
      </CardHeader>

      <CardContent className="text-xs">
        <Tabs defaultValue="Input">
          <TabsList>
            <TabsTrigger value="Input">Input</TabsTrigger>
            <TabsTrigger value="Preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="Input">
            <Textarea
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              onClick={onClickSamplePoolKeyHandler}
              className="text-xs cursor-pointer hover:underline"
            >
              need a sample?
            </button>
          </TabsContent>
          <TabsContent value="Preview">
            <CodeHighlighter codeString={code} />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <CardFooter>
          <Button
            className="bg-primary text-white"
            onClick={(e) => {
              e.preventDefault();
              doRequest(makeHookCodeRequestBody()).then(() => {
                router.push("/result/code");
              });
            }}
          >
            Scan
          </Button>
        </CardFooter>
      </CardFooter>
    </Card>
  );
}
