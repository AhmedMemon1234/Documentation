/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['cdn.sanity.io'],
    },
    eslint: {
      ignoreDuringBuilds: true, // Ignore ESLint errors during the build
    },
    typescript: {
      ignoreBuildErrors: true, // Ignore TypeScript errors
    },
  };
  
  export default nextConfig;
  