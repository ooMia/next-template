"use client";

import HookCodeForm from "@/components/form/HookCodeForm";
import PoolKeyForm from "@/components/form/PoolKeyForm";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import { useRouter } from "next/navigation";

export default function ScanInputFormPage(): React.ReactNode {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center">
      <Tabs defaultValue="PoolKey" className="w-3/4">
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
