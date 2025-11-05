"use client";

import { AlertCircle, Home } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * 전역 에러 바운더리
 * - 예상치 못한 런타임 에러를 캐치하고 사용자 친화적인 UI를 표시합니다.
 * - 에러 로깅 및 복구 옵션을 제공합니다.
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러 로깅 (프로덕션 환경에서는 에러 추적 서비스로 전송)
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-lg border bg-card p-8 text-center shadow-lg">
        <div className="mb-4 flex justify-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>

        <h1 className="mb-2 font-bold text-2xl text-foreground">
          문제가 발생했습니다
        </h1>

        <p className="mb-4 text-muted-foreground">
          예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </p>

        {process.env.NODE_ENV === "development" && (
          <div className="mb-6 rounded bg-destructive/10 p-3 text-left">
            <p className="text-xs font-mono text-destructive">
              {error.message}
            </p>
            {error.digest && (
              <p className="mt-2 text-xs text-muted-foreground">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Button onClick={reset} className="w-full">
            다시 시도
          </Button>
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full">
              <Home className="mr-2 h-4 w-4" />
              홈으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

