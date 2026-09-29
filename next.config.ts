import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.freepik.com",
      },
    ],
  },
};

export default nextConfig;
