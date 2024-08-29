/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            }
        ]
    },
    experimental: {
        serverActions: {
            bodySize: "20mb"
        }
    }
};

export default nextConfig;
