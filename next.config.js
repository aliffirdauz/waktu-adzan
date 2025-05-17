const withPWA = require("next-pwa")({
  disable: process.env.NODE_ENV === "development" || true, // disables it entirely
  register: false,
  skipWaiting: false,
})

const nextConfig = {
  reactStrictMode: true,
}

module.exports = withPWA(nextConfig)
