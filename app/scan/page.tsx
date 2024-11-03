import PoolKeyForm from "@/components/PoolKeyForm";

// TODO: Layout
const Page: React.FC = () => {
  return (
    <div className="flex flex-col ">
      <>
        <h1 className="text-4xl font-bold">
          Scan for Uniswap V4 - Hook PoolKey
        </h1>
        <PoolKeyForm />
      </>
    </div>
  );
};

export default Page;
