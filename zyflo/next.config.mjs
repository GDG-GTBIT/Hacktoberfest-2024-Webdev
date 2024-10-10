import { withContentlayer } from "next-contentlayer"
import createMDX from "@next/mdx"

const withMDX = createMDX({
  extension: /\.mdx$/
})
import "./env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = withMDX({
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  experimental: {
    // ppr: true,
    // reactCompiler: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "cross-origin-opener-policy",
            value: "same-origin"
          },
          {
            key: "cross-origin-embedder-policy",
            value: "require-corp"
          }
        ]
      }
    ]
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false
    }

    return config
  }
})

export default nextConfig
