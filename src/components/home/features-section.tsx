import { FileText, LogIn, Wrench } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

/**
 * FeaturesSection 섹션 컴포넌트
 * - 로그인 및 폼 검증 데모 페이지로 이동할 수 있는 링크 카드들을 제공합니다.
 * - 홈에서는 개요만 제공하고, 상세 동작은 개별 페이지에서 확인하도록 안내합니다.
 */
export function FeaturesSection() {
  return (
    <div className="mb-12 w-full max-w-4xl">
      <Card className="w-full border-foreground/10 bg-background/80 shadow-xl backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="mb-8 text-center">
            <h2 className="mb-2 font-bold text-3xl text-foreground">
              <span className="inline-flex items-center gap-2">
                <Wrench className="h-7 w-7" aria-hidden="true" />
                <span>기능</span>
              </span>
            </h2>
            <p className="text-foreground/70">각 기능 페이지로 이동하여 실제 동작을 확인해보세요</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* 로그인 기능 카드 */}
            <div className="group hover:-translate-y-1 relative rounded-2xl border border-foreground/10 bg-foreground/5 p-6 transition-all duration-300 hover:bg-foreground/10 hover:shadow-lg">
              <div className="mb-3 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-foreground font-bold text-background text-xl shadow-lg">
                  <LogIn className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">
                    로그인 (Google OAuth + Auth.js v5)
                  </h3>
                  <p className="text-foreground/60 text-sm">소셜 로그인 및 세션 표시 데모</p>
                </div>
              </div>
              <p className="mb-4 text-foreground/60 text-sm leading-relaxed">
                Google 계정으로 로그인하고 사용자 정보를 확인하는 흐름을 체험해보세요.
              </p>
              <div className="flex justify-end">
                <Link
                  href="/features/login"
                  className="font-medium text-foreground text-sm underline underline-offset-4 hover:text-foreground/80"
                >
                  자세히 보기 →
                </Link>
              </div>
            </div>

            {/* 폼 + Zod 기능 카드 */}
            <div className="group hover:-translate-y-1 relative rounded-2xl border border-foreground/10 bg-foreground/5 p-6 transition-all duration-300 hover:bg-foreground/10 hover:shadow-lg">
              <div className="mb-3 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-foreground font-bold text-background text-xl shadow-lg">
                  <FileText className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">
                    폼 검증 (TanStack Form + Zod)
                  </h3>
                  <p className="text-foreground/60 text-sm">스키마 기반 폼 검증 데모</p>
                </div>
              </div>
              <p className="mb-4 text-foreground/60 text-sm leading-relaxed">
                타입 안전한 Zod 스키마로 폼 검증을 수행하고 사용자 경험을 향상하는 패턴을
                확인하세요.
              </p>
              <div className="flex justify-end">
                <Link
                  href="/features/form"
                  className="font-medium text-foreground text-sm underline underline-offset-4 hover:text-foreground/80"
                >
                  자세히 보기 →
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
