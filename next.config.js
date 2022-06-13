/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    publicRuntimeConfig: {
        apiToken: process.env.API_TOKEN, // Pass through env variables
    },
    serverRuntimeConfig: {
        apiToken: process.env.API_TOKEN, // Pass through env variables
    },
}

module.exports = nextConfig
