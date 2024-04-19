/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["fsw-store.s3.sa-east-1.amazonaws.com","res.cloudinary.com"]
    },
    experimental: {
        serverActions:true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
