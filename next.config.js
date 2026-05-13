const isProd = process.env.NODE_ENV === 'production';
const repoName = 'ARRIVIA_AGENT_ASSIST';

module.exports = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  trailingSlash: true,
  reactStrictMode: true,
};
