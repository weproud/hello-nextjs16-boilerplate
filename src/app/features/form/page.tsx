import { FileText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Toaster } from "sonner";
import { BugReportForm } from "@/components/forms/bug-report-form";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "폼 검증 기능",
  description: "TanStack Form + Zod를 활용한 타입 안전한 폼 검증 데모",
  openGraph: {
    title: "폼 검증 기능 | Hello Next.js 16",
    description: "TanStack Form + Zod를 활용한 타입 안전한 폼 검증 데모",
  },
};

// 정적 페이지: 60초마다 재검증
export const revalidate = 60;

// 동적 렌더링 비활성화 (정적 생성)
export const dynamic = "force-static";

/**
 * 폼 검증 기능 페이지 (서버 컴포넌트)
 * - TanStack React Form과 Zod를 활용한 스키마 기반 폼 검증 데모를 제공합니다.
 * - 홈에서는 기능을 직접 보여주지 않으므로, 이 페이지에서 실제 폼 동작을 확인합니다.
 */
export default function FormFeaturePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-md px-6 py-16">
        <div className="mb-8 text-center">
          <h1 className="inline-flex items-center gap-2 font-bold text-3xl">
            <FileText className="h-7 w-7" aria-hidden="true" />
            <span>폼 검증 기능</span>
          </h1>
          <p className="mt-2 text-foreground/70">
            TanStack Form + Zod를 활용한 타입 안전한 검증
          </p>
        </div>

        <Card className="w-full border-foreground/10 bg-background/80 shadow-xl backdrop-blur-sm">
          <CardContent className="p-6">
            <BugReportForm />
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="font-medium text-foreground text-sm underline underline-offset-4 hover:text-foreground/80"
          >
            ← 홈으로 돌아가기
          </Link>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
