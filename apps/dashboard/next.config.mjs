import { dashboardHeaders, dashboardRedirects } from "@majoexe/config";
import createMdx from "@next/mdx";
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withMDX = createMdx();
const withBundle = withBundleAnalyzer({
 enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
 reactStrictMode: true,
 pageExtensions: ["mdx", "jsx", "js"],
 poweredByHeader: false,
 trailingSlash: false,
 compiler: {
  removeConsole: {
   exclude: ["error, warn"],
  },
 },
 images: {
  remotePatterns: [
   {
    protocol: "https",
    hostname: "cdn.discordapp.com",
    pathname: "**",
   },
   {
    protocol: "https",
    port: "",
    hostname: "media.discordapp.net",
    pathname: "**",
   },
  ],
 },
 webpack: (config, { isServer }) => {
  config.externals.push({
   "utf-8-validate": "commonjs utf-8-validate",
   bufferutil: "commonjs bufferutil",
  });
  if (isServer) {
   config.plugins = [...config.plugins, new PrismaPlugin()];
  }
  return config;
 },
 async redirects() {
  return dashboardRedirects;
 },
 async headers() {
  return dashboardHeaders;
 },
};

const createConfig = () => {
 const plugins = [withMDX, withBundle];
 const config = plugins.reduce((acc, next) => next(acc), {
  ...nextConfig,
 });
 return config;
};

export default createConfig;
