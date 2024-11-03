import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";
import { sepolia } from "wagmi/chains";

export const unichain = /*#__PURE__*/ defineChain({
  id: 1301,
  name: "Unichain",
  nativeCurrency: { name: "Unichain Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.unichain.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://sepolia.uniscan.xyz/",
      apiUrl: "https://api-sepolia.uniscan.xyz/api",
    },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 0,
    },
    // TODO Add the address of the Unichain's ENS registry
    ensRegistry: { address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e" },
    // TODO Add the address of the Unichain's ENS resolver
    ensUniversalResolver: {
      address: "0xc8Af999e38273D658BE1b921b88A9Ddf005769cC",
      blockCreated: 5_317_080,
    },
  },
  testnet: true,
});

export const config = getDefaultConfig({
  appName: "RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [
    // mainnet,
    // optimism,
    // arbitrum,
    // base,
    unichain,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "false" ? [] : [sepolia]),
  ],
  ssr: true,
});
