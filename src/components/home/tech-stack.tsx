import {
  BadgeCheck,
  Code,
  Database,
  FileText,
  Fingerprint,
  Palette,
  Rocket,
  Shield,
  Wrench,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/**
 * TechStack 섹션 컴포넌트
 * - 기술 스택을 라이브러리(package)별 카드로 나누어 설명합니다.
 * - 프레임워크/플랫폼(Next.js, Auth.js, Prisma 등)과 개발 생산성 도구(TypeScript, Biome, Zod, TanStack Form)를 포함합니다.
 */
export function TechStack() {
  return (
    <div className="max-w-4xl w-full mb-12">
      <Card className="w-full bg-background/80 backdrop-blur-sm border-foreground/10 shadow-xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="font-bold text-3xl text-foreground mb-2">
              <span className="inline-flex items-center gap-2">
                <Rocket className="w-7 h-7" aria-hidden="true" />
                <span>기술 스택</span>
              </span>
            </h2>
            <p className="text-foreground/70">최신 기술로 구성된 강력한 개발 환경</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group p-6 rounded-2xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-foreground text-background rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                  <Zap className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">Next.js 16.0.0</h3>
                  <p className="text-sm text-foreground/60">React 19.2.0 + Turbopack</p>
                </div>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed">
                최신 React와 함께하는 풀스택 프레임워크
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-foreground text-background rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                  <Shield className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">Auth.js v5 (NextAuth)</h3>
                  <p className="text-sm text-foreground/60">JWT + Prisma Adapter</p>
                </div>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed">
                안전하고 확장 가능한 인증 시스템
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-foreground text-background rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                  <Database className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">Prisma ORM</h3>
                  <p className="text-sm text-foreground/60">PostgreSQL 통합</p>
                </div>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed">
                타입 안전한 데이터베이스 액세스
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-foreground text-background rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                  <Palette className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">Shadcn/ui + Tailwind CSS</h3>
                  <p className="text-sm text-foreground/60">모던 UI 컴포넌트</p>
                </div>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed">
                아름답고 접근성 높은 디자인 시스템
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-foreground text-background rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                  <Fingerprint className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">Google OAuth</h3>
                  <p className="text-sm text-foreground/60">소셜 로그인</p>
                </div>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed">
                간편하고 안전한 소셜 인증
              </p>
            </div>

            {/* TypeScript 카드: 정적 타입 시스템 */}
            <div className="group p-6 rounded-2xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-foreground text-background rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                  <Code className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">TypeScript</h3>
                  <p className="text-sm text-foreground/60">정적 타입 시스템</p>
                </div>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed">
                엄격한 타입으로 안전성과 생산성을 높이며, tsconfig 기반으로 프로젝트 전반에 타입
                일관성을 유지합니다.
              </p>
            </div>

            {/* Biome 카드: 초고속 린팅/포맷터 */}
            <div className="group p-6 rounded-2xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-foreground text-background rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                  <Wrench className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">Biome</h3>
                  <p className="text-sm text-foreground/60">초고속 린팅/포맷터</p>
                </div>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed">
                lint와 format을 통합하여 빠르게 코드 품질을 유지합니다. 타입 인식 린팅과 biome.json
                설정으로 일관된 스타일을 적용합니다.
              </p>
            </div>

            {/* Zod 카드: 타입 안전한 스키마 검증 */}
            <div className="group p-6 rounded-2xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-foreground text-background rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                  <BadgeCheck className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">Zod</h3>
                  <p className="text-sm text-foreground/60">타입 안전한 스키마 검증</p>
                </div>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed">
                런타임/컴파일타임에서 모두 안전한 스키마 기반 검증을 제공합니다. 폼과 API 데이터
                검증에 활용합니다.
              </p>
            </div>

            {/* TanStack Form 카드: React 폼 라이브러리 */}
            <div className="group p-6 rounded-2xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-foreground text-background rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                  <FileText className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">TanStack Form</h3>
                  <p className="text-sm text-foreground/60">React 폼 라이브러리</p>
                </div>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed">
                Zod와 결합해 스키마 기반 폼 검증을 구현합니다. 선언적 폼 상태 관리로 개발 생산성을
                높입니다.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
