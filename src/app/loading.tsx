import { Loader2 } from "lucide-react";

/**
 * 전역 로딩 상태 컴포넌트
 * - 페이지 로딩 중에 표시되는 스켈레톤 UI입니다.
 * - Suspense 경계와 함께 사용되어 부드러운 로딩 경험을 제공합니다.
 */
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">로딩 중...</p>
      </div>
    </div>
  );
}

