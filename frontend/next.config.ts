import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes the whole site to out/, which is served
  // as static files on Cloudflare at wynsley.com.
  // (Cache Components and partial prefetching are off: Next can't combine them
  // with a static export, and nothing here needs a server.)
  output: "export",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
