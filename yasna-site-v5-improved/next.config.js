/** @type {import('next').NextConfig} */

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repoName = 'yasna2';

const basePath = isGitHubPages ? `/${repoName}` : '';

const nextConfig = {
  // Static export for GitHub Pages
  output: 'export',
  // basePath for GitHub Pages (https://<user>.github.io/<repo>/)
  basePath,
  assetPrefix: isGitHubPages ? `/${repoName}/` : '',
  // Expose basePath to client components via env
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dpyb7glyf/**',
      },
    ],
  },
  // Enable gzip/brotli compression
  compress: true,
  // Stricter React mode for catching potential issues
  reactStrictMode: true,
  // Trailing slash for clean URLs on static hosting
  trailingSlash: true,
};

module.exports = nextConfig;
