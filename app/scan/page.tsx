"use client";

import { Tabs } from "@radix-ui/react-tabs";
import { useRouter } from "next/navigation";

import HookCodeForm from "@/components/form/HookCodeForm";
import PoolKeyForm from "@/components/form/PoolKeyForm";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ScanInputFormPage(): React.ReactNode {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center select-none">
      <Tabs defaultValue="PoolKey" className="">
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
