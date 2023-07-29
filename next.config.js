/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    { source: "/", destination: "/vaults", permanent: false },
  ],
};

module.exports = nextConfig;
