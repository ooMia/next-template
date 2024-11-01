"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const PoolKeyForm = () => {
  const [currency0, setCurrency0] = useState<string>("");
  const [currency1, setCurrency1] = useState<string>("");
  const [fee, setFee] = useState<string>("");
  const [tickSpacing, setTickSpacing] = useState<string>("");
  const [hooks, setHooks] = useState("");
  const [responseMessage, setResponseMessage] = useState<string>("");

  const router = useRouter();

  const onClickLinkSetSampleHandler = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    setCurrency0("0x0197481B0F5237eF312a78528e79667D8b33Dcff");
    setCurrency1("0xA56569Bd93dc4b9afCc871e251017dB0543920d4");
    setFee("3000");
    setTickSpacing("60");
    setHooks("0x6caC2dcc5eCf5caac0382F1B4A77EABac0F6C0Cc");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      data: {
        Poolkey: {
          currency0,
          currency1,
          fee: Number(fee),
          tickSpacing: Number(tickSpacing),
          hooks,
        },
        mode: 2,
      },
    };

    try {
      const body = JSON.stringify(data);
      if (localStorage.getItem("_herbicide_request") === body) {
        console.log("already sent");
        router.push("/result");
      }
      localStorage.setItem("_herbicide_request", body);
      const response = await fetch("/api/tasks", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: body,
      });
      const result = await response.json();
      if (result) {
        localStorage.setItem("_herbicide_response", JSON.stringify(result));
        router.push("/result");
      }
    } catch (error) {
      setResponseMessage("오류가 발생했습니다.");
      console.error("Error:", error);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 p-4 border border-gray-300 rounded-md shadow-md bg-white w-[512px] h-[512px]"
      onSubmit={handleSubmit}
    >
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
        label="Hook"
        state={hooks}
        onChange={setHooks}
      />

      <a
        href="#"
        onClick={onClickLinkSetSampleHandler}
        className="text-blue-500 text-xs"
      >
        need a sample?
      </a>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
      {responseMessage && (
        <span className="text-red-500 text-xs">{responseMessage}</span>
      )}
    </form>
  );
};

export default PoolKeyForm;

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
      {error && <span className="text-red-500 text-xs">{error}</span>}
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
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}
