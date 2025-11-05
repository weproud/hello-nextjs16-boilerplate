import type { Metric } from "web-vitals";

/**
 * Web Vitals 메트릭 수집 및 분석
 * - Core Web Vitals (LCP, FID, CLS)
 * - 추가 메트릭 (TTFB, FCP)
 * - 성능 데이터를 분석 서비스로 전송
 */

/**
 * Web Vitals 메트릭 전송
 * - 프로덕션 환경에서는 분석 서비스로 전송
 * - 개발 환경에서는 콘솔에 로깅
 */
export function sendToAnalytics(metric: Metric) {
  // 개발 환경에서는 콘솔에 로깅
  if (process.env.NODE_ENV === "development") {
    console.log("Web Vital:", {
      name: metric.name,
      value: metric.value.toFixed(2),
      rating: metric.rating,
      delta: metric.delta?.toFixed(2),
      id: metric.id,
    });
  }

  // 프로덕션 환경에서는 분석 서비스로 전송
  if (process.env.NEXT_PUBLIC_ANALYTICS_URL) {
    const body = {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    };

    // 비콘 API를 사용하여 페이지 언로드 시에도 데이터 전송
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        process.env.NEXT_PUBLIC_ANALYTICS_URL,
        JSON.stringify(body)
      );
    } else {
      // 폴백: fetch API 사용
      fetch(process.env.NEXT_PUBLIC_ANALYTICS_URL, {
        method: "POST",
        body: JSON.stringify(body),
        keepalive: true,
      }).catch((error) => {
        console.error("Failed to send Web Vital:", error);
      });
    }
  }
}

/**
 * 성능 메트릭 등급 판정
 * - "good": 좋음
 * - "needs-improvement": 개선 필요
 * - "poor": 나쁨
 */
export function getMetricRating(
  metricName: string,
  value: number
): "good" | "needs-improvement" | "poor" {
  switch (metricName) {
    // LCP (Largest Contentful Paint): 2.5초 이하 = 좋음
    case "LCP":
      return value <= 2500
        ? "good"
        : value <= 4000
        ? "needs-improvement"
        : "poor";

    // INP (Interaction to Next Paint): 200ms 이하 = 좋음
    case "INP":
      return value <= 200
        ? "good"
        : value <= 500
        ? "needs-improvement"
        : "poor";

    // CLS (Cumulative Layout Shift): 0.1 이하 = 좋음
    case "CLS":
      return value <= 0.1
        ? "good"
        : value <= 0.25
        ? "needs-improvement"
        : "poor";

    // TTFB (Time to First Byte): 600ms 이하 = 좋음
    case "TTFB":
      return value <= 600
        ? "good"
        : value <= 1200
        ? "needs-improvement"
        : "poor";

    // FCP (First Contentful Paint): 1.8초 이하 = 좋음
    case "FCP":
      return value <= 1800
        ? "good"
        : value <= 3000
        ? "needs-improvement"
        : "poor";

    default:
      return "needs-improvement";
  }
}

/**
 * 성능 메트릭 설명
 */
export const metricDescriptions: Record<string, string> = {
  LCP: "Largest Contentful Paint - 가장 큰 콘텐츠 요소가 렌더링되는 시간",
  INP: "Interaction to Next Paint - 사용자 상호작용에 대한 응답 시간",
  CLS: "Cumulative Layout Shift - 예상치 못한 레이아웃 변화",
  TTFB: "Time to First Byte - 첫 바이트 수신 시간",
  FCP: "First Contentful Paint - 첫 콘텐츠 렌더링 시간",
};
