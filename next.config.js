/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nrc39fcw6kbjamhk.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig
