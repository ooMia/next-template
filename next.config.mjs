// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    reactRemoveProperties: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
