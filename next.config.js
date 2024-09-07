/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        dirs: ['src'],
    },
    async rewrites() {
        return [
            {
                source: '/v1/:path*',
                destination: `${process.env.NEXT_PUBLIC_API_URL}/v1/:path*`,
            },
        ];
    },
    reactStrictMode: false,
    swcMinify: true,

    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'play-lh.googleusercontent.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn-icons-png.flaticon.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'static.vecteezy.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'tailwindui.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'img-cdn.pixlr.com',
                port: '',
                pathname: '/**',
            },
        ],
    },

    webpack(config) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg')
        );

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: { not: /\.(css|scss|sass)$/ },
                resourceQuery: { not: /url/ }, // exclude if *.svg?url
                loader: '@svgr/webpack',
                options: {
                    dimensions: false,
                    titleProp: true,
                },
            }
        );

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },
};

module.exports = nextConfig;
