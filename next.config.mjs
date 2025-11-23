// next.config.mjs
import TerserPlugin from "terser-webpack-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*" }],
    unoptimized: true,
  },
  webpack: (config) => {
    config.optimization.minimize = true;
    config.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
          mangle: true,
        },
        exclude: /node_modules\/react-pdf/,
      }),
    ];
    return config;
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/v1/:path*",
  //       destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/:path*`,
  //     },
  //   ];
  // },
};

export default nextConfig;
