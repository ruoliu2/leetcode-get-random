/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/leetcode-get-random",
  output: "export",  // <=== enables static exports
  reactStrictMode: true,
  env: {
    basePath: "/leetcode-get-random",
  },
};


export default nextConfig;
