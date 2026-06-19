/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Keep Next image behavior consistent between dev and production previews.
    unoptimized: false
  }
};

export default nextConfig;
