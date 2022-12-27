/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/demaree/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/.well-known/webfinger",
        destination: "/api/webfinger",
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
      "bufferutil",
      "canvas",
      "utf-8-validate",
    ];

    return config;
  },
};

module.exports = nextConfig;
