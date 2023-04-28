/** @type {import('next').NextConfig} */
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
        hostname: "img.demaree.me",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wp2.demaree.me",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "http",
        hostname: "ddwp.test",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/p/:slug",
        destination: "/post/:slug",
        permanent: false,
      },
      {
        source: "/p/okrs-the-complete-guide",
        destination: "/2023/okrs-the-complete-guide",
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
      // $parent_id/$revision_id/$type/$status/$nonce
      {
        source: "/_preview/:parentId/:id/:type/:status/:nonce",
        destination:
          "/_preview?parent=:parentId&id=:id&type=:type&status=:status&n=:nonce",
      },
    ];
  },
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
