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
    <div className="max-w-4xl w-full mb-12">
      <Card className="w-full bg-background/80 backdrop-blur-sm border-foreground/10 shadow-xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="font-bold text-3xl text-foreground mb-2">
              <span className="inline-flex items-center gap-2">
                <Wrench className="w-7 h-7" aria-hidden="true" />
                <span>기능</span>
              </span>
            </h2>
            <p className="text-foreground/70">각 기능 페이지로 이동하여 실제 동작을 확인해보세요</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 로그인 기능 카드 */}
            <div className="group relative p-6 rounded-2xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-foreground text-background rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                  <LogIn className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">
                    로그인 (Google OAuth + Auth.js v5)
                  </h3>
                  <p className="text-sm text-foreground/60">소셜 로그인 및 세션 표시 데모</p>
                </div>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed mb-4">
                Google 계정으로 로그인하고 사용자 정보를 확인하는 흐름을 체험해보세요.
              </p>
              <div className="flex justify-end">
                <Link
                  href="/features/login"
                  className="text-sm font-medium text-foreground hover:text-foreground/80 underline underline-offset-4"
                >
                  자세히 보기 →
                </Link>
              </div>
            </div>

            {/* 폼 + Zod 기능 카드 */}
            <div className="group relative p-6 rounded-2xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-foreground text-background rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                  <FileText className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">
                    폼 검증 (TanStack Form + Zod)
                  </h3>
                  <p className="text-sm text-foreground/60">스키마 기반 폼 검증 데모</p>
                </div>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed mb-4">
                타입 안전한 Zod 스키마로 폼 검증을 수행하고 사용자 경험을 향상하는 패턴을
                확인하세요.
              </p>
              <div className="flex justify-end">
                <Link
                  href="/features/form"
                  className="text-sm font-medium text-foreground hover:text-foreground/80 underline underline-offset-4"
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
