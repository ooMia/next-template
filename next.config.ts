// @ts-check
import type { NextConfig } from "next";
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants";

const nextConfig = (
  phase: string,
  { defaultConfig }: { defaultConfig: NextConfig },
): NextConfig => {
  // TODO: use environment variables

  // if (phase === PHASE_DEVELOPMENT_SERVER) {
  //   return {
  //     ...defaultConfig,
  //     async rewrites() {
  //       return [
  //         {
  //           source: "/api/:path*",
  //           destination: "/api/:path*",
  //         },
  //       ];
  //     },
  //   };
  // }

  // if (phase === PHASE_PRODUCTION_BUILD) {
  //   return {
  //     ...defaultConfig,
  //     async rewrites() {
  //       return [
  //         {
  //           source: "/api/:path*",
  //           destination: "/api/:path*",
  //         },
  //       ];
  //     },
  //   };
  // }

  return defaultConfig;
};

export default nextConfig;
