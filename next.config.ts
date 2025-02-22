import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @see https://nextjs.org/docs/architecture/nextjs-compiler
  compiler: {
    reactRemoveProperties: true,
    removeConsole: {
      exclude: ["error"],
    },
  },
  experimental: {
    typedRoutes: true,
  },
};
