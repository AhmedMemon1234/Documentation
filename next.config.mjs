/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['cdn.sanity.io'],
    },
    typescript: {
      ignoreBuildErrors: true, 
    },
  };
  
  export default nextConfig;
  