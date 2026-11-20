/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/shipyard",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
