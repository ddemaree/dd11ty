/** @type {import('next').NextConfig} */

// Fix for node-canvas library include problem
if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(
    `${process.env.PWD}/node_modules/canvas/build/Release:`
  )
) {
  process.env.LD_LIBRARY_PATH = `${
    process.env.PWD
  }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ""}`;
}

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    mdxRs: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/demaree/**",
      },
      {
        protocol: "https",
        hostname: "wp2.demaree.me",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/feeds/posts.xml",
        destination: "/feed/rss",
        permanent: false,
      },
      {
        source: "/feeds/posts.json",
        destination: "/feed/json",
        permanent: false,
      },
      {
        source: "/p/:slug",
        destination: "/post/:slug",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/.well-known/webfinger",
        destination: "/api/webfinger",
      },
      {
        source: "/post/:slug/socialImage.png",
        destination: "/api/post-image/:slug",
      },
    ];
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    config.externals = [
      ...config.externals,
      "jsdom",
      "bufferutil",
      "canvas",
      "utf-8-validate",
    ];

    return config;
  },
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
