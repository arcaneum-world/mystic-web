// next.config.ts
const nextConfig = {
  eslint: {
    // Never fail production builds because of ESLint errors
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
