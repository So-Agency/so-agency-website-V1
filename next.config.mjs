/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Trailing slash ensures static export generates /en/index.html and /es/index.html
  // which Cloudflare Pages serves correctly at /en/ and /es/
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
