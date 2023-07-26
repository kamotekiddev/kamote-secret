/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    { source: "/", destination: "/channels", permanent: false },
  ],
};

module.exports = nextConfig;
