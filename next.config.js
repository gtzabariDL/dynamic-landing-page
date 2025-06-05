/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	typescript: {
		tsconfigPath: './tsconfig.build.json',
	},
	compiler: {
		removeConsole: false,
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
	// basePath: process.env.NODE_ENV === 'production' ? '/dynamic-landing-page' : '',
	// assetPrefix: process.env.NODE_ENV === 'production' ? '/dynamic-landing-page' : '',
	// trailingSlash: true,
};

export default nextConfig
