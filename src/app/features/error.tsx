"use client";

import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Features 섹션 에러 바운더리
 * - /features 경로의 에러를 처리합니다.
 * - 사용자가 쉽게 이전 페이지로 돌아갈 수 있도록 합니다.
 */
export default function FeaturesError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Features error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-lg border bg-card p-8 text-center shadow-lg">
        <div className="mb-4 flex justify-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>

        <h1 className="mb-2 font-bold text-2xl text-foreground">
          기능 로드 실패
        </h1>

        <p className="mb-4 text-muted-foreground">
          이 기능을 로드하는 중에 문제가 발생했습니다.
        </p>

        {process.env.NODE_ENV === "development" && (
          <div className="mb-6 rounded bg-destructive/10 p-3 text-left">
            <p className="text-xs font-mono text-destructive">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Button onClick={reset} className="w-full">
            다시 시도
          </Button>
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              홈으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

