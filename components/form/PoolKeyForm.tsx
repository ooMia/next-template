"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TaskCreationRequest from "@/types/request/api/tasks/TaskCreationRequest";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { doRequest } from "@/utils/SimpleRequest";

export { AddressInput, NumberInput };

function AddressInput({
  name,
  label,
  state,
  onChange,
}: {
  name: string;
  label: string;
  state: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [error, setError] = useState("");

  const regex = /^0x[a-fA-F0-9]{40}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (!regex.test(inputValue)) {
      setError(
        'The input must start with "0x" followed by 20 hexadecimal characters.',
      );
    } else {
      setError("");
    }
    onChange(inputValue);
  };

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        type="text"
        id={name}
        placeholder={`address 0x...`}
        value={state}
        onChange={handleChange}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

function NumberInput({
  name,
  label,
  state,
  onChange,
}: {
  name: string;
  label: string;
  state: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [error, setError] = useState("");

  const regex = /^-?[0-9]+$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (!regex.test(inputValue)) {
      setError("The input must contain only numbers.");
    } else {
      setError("");
    }
    onChange(inputValue);
  };

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        type="number"
        id={name}
        placeholder={`number ${name}`}
        value={state}
        onChange={handleChange}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

export default function PoolKeyForm({
  router,
}: Readonly<{ router: AppRouterInstance }>) {
  // TODO: send request to server based on the input

  const [currency0, setCurrency0] = useState<string>("");
  const [currency1, setCurrency1] = useState<string>("");
  const [fee, setFee] = useState<string>("");
  const [tickSpacing, setTickSpacing] = useState<string>("");
  const [hooks, setHooks] = useState<string>("");
  const [deployer, setDeployer] = useState<string>("");

  const onClickSamplePoolKeyHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setCurrency0("0x0197481B0F5237eF312a78528e79667D8b33Dcff");
    setCurrency1("0xA56569Bd93dc4b9afCc871e251017dB0543920d4");
    setFee("3000");
    setTickSpacing("60");
    setHooks("0x6da8f09885Bb7aaD2d45476179DbC75573984080");
    setDeployer("0x4e59b44847b379578588920cA78FbF26c0B4956C");
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
