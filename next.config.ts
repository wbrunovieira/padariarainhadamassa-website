import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 40 para o brasão usado como marca d'água decorativa (opacidade ~7%)
    qualities: [40, 75],
  },
};

export default nextConfig;
