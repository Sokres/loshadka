import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/indidualnoe-obuchenie",
        destination: "/obuchenie/individualnoe-obuchenie",
        permanent: true,
      },
      {
        source: "/school",
        destination: "/obuchenie/shkola-verhovoy-ezdy",
        permanent: true,
      },
      {
        source: "/school/",
        destination: "/obuchenie/shkola-verhovoy-ezdy",
        permanent: true,
      },
      {
        source: "/%D0%BA%D0%B0%D1%80%D0%B5%D1%82%D0%B0",
        destination: "/kareta",
        permanent: true,
      },
      {
        source: "/карета",
        destination: "/kareta",
        permanent: true,
      },
      {
        source: "/конные-прогулки",
        destination: "/progulki",
        permanent: true,
      },
      {
        source: "/фото",
        destination: "/fotosessii",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
