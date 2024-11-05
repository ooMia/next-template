import { DynamicTokenPriceResult } from "@/components/result/dynamic";

export async function getStaticParams() {
  const res = await fetch(
    "https://hermes.pyth.network/api/latest_price_feeds?ids[]=0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
  );
  const data = await res.json();

  return {
    props: {
      priceData: data,
    },
    revalidate: 60, // 60초마다 재생성
  };
}

export default function ERC6909DeltaBurnResultPage({
  priceData,
}: {
  priceData: any;
}) {
  console.log(priceData);
  return (
    <DynamicTokenPriceResult
      realPrice={1.4}
      expectedPrice={1.4}
      oraclePrice={2.1}
    />
  );
}
