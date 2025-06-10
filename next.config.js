/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repoName = 'dynamic-landing-page';

const nextConfig = {
	reactStrictMode: false,
	typescript: {
		tsconfigPath: './tsconfig.build.json',
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
		reactRemoveProperties: true,
	},
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'api.microlink.io',
				pathname: '**',
			},
		],
	},
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	
	output: 'export',
	trailingSlash: true,
	// Performance optimizations
	poweredByHeader: false,
	compress: true,
	experimental: {
		optimizePackageImports: ['react-helmet-async', 'react-i18next'],
	},
	basePath: isProd ? `/${repoName}` : '',
	assetPrefix: isProd ? `/${repoName}/` : '',
	// basePath: process.env.NODE_ENV === 'production' ? '/dynamic-landing-page' : '',
	// assetPrefix: process.env.NODE_ENV === 'production' ? '/dynamic-landing-page' : '',
};

export default nextConfig
