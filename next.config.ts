import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 이미지 최적화 설정
  images: {
    // 지원하는 이미지 포맷 (WebP, AVIF 자동 제공)
    formats: ["image/avif", "image/webp"],
    // 반응형 이미지 크기 최적화
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 캐시 설정 (60초)
    minimumCacheTTL: 60,
  },

  // 압축 설정
  compress: true,

  // 보안 헤더 설정
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // 성능 최적화
  productionBrowserSourceMaps: false,
};

export default nextConfig;
