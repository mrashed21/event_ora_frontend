import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },

  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/v1/:path*",
  //       destination: `${env.NEXT_PUBLIC_BASE_URL}/:path*`,
  //       // destination:
  //       //   "https://backend-foodhub-mrashed21.vercel.app/api/v1/:path*",
  //     },
  //   ];
  // },
};

export default nextConfig;
