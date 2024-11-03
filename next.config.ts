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
      webpack: (config) => {
        config.externals.push("pino-pretty", "lokijs", "encoding");
        return config;
      },
      async rewrites() {
        return [
          {
            source: "/api/:path*",
            destination: process.env.API_URL + "/api/:path*",
          },
        ];
      },
    };
  }

  if (phase === PHASE_PRODUCTION_BUILD) {
    return {
      ...defaultConfig,
      webpack: (config) => {
        config.externals.push("pino-pretty", "lokijs", "encoding");
        return config;
      },
      async rewrites() {
        return [
          {
            source: "/api/:path*",
            destination: process.env.API_URL + "/api/:path*",
          },
        ];
      },
    };
  }

  return defaultConfig;
};

export default nextConfig;
