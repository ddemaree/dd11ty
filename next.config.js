/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/demaree/**",
      },
      {
        hostname: "pbs.twimg.com",
        port: "",
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
        source: "/feed",
        destination: "/feed/rss",
      },
    ];
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    config.experiments = { ...config.experiments, topLevelAwait: true };

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

module.exports = nextConfig;
