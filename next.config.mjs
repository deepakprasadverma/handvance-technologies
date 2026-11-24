const isGithubActions = process.env.GITHUB_ACTIONS || false;

let basePath = '';

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.replace(/.*?\//, '') : '';
  basePath = repo ? `/${repo}` : '';
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isGithubActions ? { output: 'export', basePath } : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
