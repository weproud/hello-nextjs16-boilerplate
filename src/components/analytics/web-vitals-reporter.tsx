"use client";

import { useEffect } from "react";
import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";
import { sendToAnalytics } from "@/lib/web-vitals";

/**
 * Web Vitals 리포터 컴포넌트
 * - 페이지 로드 후 성능 메트릭을 수집하고 분석 서비스로 전송
 * - 레이아웃에 포함시켜 모든 페이지에서 자동으로 실행됨
 */
export function WebVitalsReporter() {
  useEffect(() => {
    // Core Web Vitals 수집
    onLCP(sendToAnalytics);
    onINP(sendToAnalytics);
    onCLS(sendToAnalytics);

    // 추가 메트릭 수집
    onTTFB(sendToAnalytics);
    onFCP(sendToAnalytics);
  }, []);

  return null;
}
