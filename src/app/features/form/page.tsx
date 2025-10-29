import { FileText } from "lucide-react";
import Link from "next/link";
import { Toaster } from "sonner";
import { BugReportForm } from "@/components/forms/bug-report-form";
import { Card, CardContent } from "@/components/ui/card";

/**
 * 폼 검증 기능 페이지 (서버 컴포넌트)
 * - TanStack React Form과 Zod를 활용한 스키마 기반 폼 검증 데모를 제공합니다.
 * - 홈에서는 기능을 직접 보여주지 않으므로, 이 페이지에서 실제 폼 동작을 확인합니다.
 */
export default function FormFeaturePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-md mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <h1 className="font-bold text-3xl inline-flex items-center gap-2">
            <FileText className="w-7 h-7" aria-hidden="true" />
            <span>폼 검증 기능</span>
          </h1>
          <p className="text-foreground/70 mt-2">TanStack Form + Zod를 활용한 타입 안전한 검증</p>
        </div>

        <Card className="w-full bg-background/80 backdrop-blur-sm border-foreground/10 shadow-xl">
          <CardContent className="p-6">
            <BugReportForm />
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-foreground hover:text-foreground/80 underline underline-offset-4"
          >
            ← 홈으로 돌아가기
          </Link>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
