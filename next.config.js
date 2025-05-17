// next.config.js
const withPWA = require("next-pwa")({
  dest: "public", // generates service worker in public
  register: true,
  skipWaiting: true,
})

const nextConfig = {
  // your existing config
  reactStrictMode: true,
}

module.exports = withPWA(nextConfig)
