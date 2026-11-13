/** @type {import('next').NextConfig} */
const nextConfig = {
  // Unoptimized images allow easy deployment to static hosts (GitHub Pages, Netlify, Vercel)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
