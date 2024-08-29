/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySize: "20mb"
        }
    }
};

export default nextConfig;
