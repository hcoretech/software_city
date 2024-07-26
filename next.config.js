/** @type {import('next').NextConfig} */
 
module.exports = {
    experimental: {
      serverActions: {
        allowedOrigins: ['localhost:3000', '*.my-proxy.com'],
      },
    },
  }