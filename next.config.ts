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
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...defaultConfig,
      reactStrictMode: true,
      target: "server",
      env: {
        API_URL: "http://34.47.123.94:7777",
      },
      async rewrites() {
        return [
          {
            source: "/api/:path*",
            destination: "http://34.47.123.94:7777/api/:path*",
          },
        ];
      },
    };
  }

  if (phase === PHASE_PRODUCTION_BUILD) {
    return {
      ...defaultConfig,
      target: "server",
      env: {
        API_URL: "http://34.47.123.94:7777",
      },
      async rewrites() {
        return [
          {
            source: "/api/:path*",
            destination: "http://34.47.123.94:7777/api/:path*",
          },
        ];
      },
    };
  }

  return defaultConfig;
};

export default nextConfig;
