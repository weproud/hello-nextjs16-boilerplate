import { Suspense } from "react";
import { Toaster } from "sonner";
import { BackgroundPattern } from "@/components/home/background-pattern";
import { FeaturesSection } from "@/components/home/features-section";
import { HomeFooter } from "@/components/home/footer";
import { Hero } from "@/components/home/hero";
import { TechStack } from "@/components/home/tech-stack";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { FeaturesSkeleton } from "@/components/suspense/features-skeleton";
import { TechStackSkeleton } from "@/components/suspense/tech-stack-skeleton";

/**
 * 홈 페이지 서버 컴포넌트
 * - 화면 복잡도를 줄이기 위해 섹션을 컴포넌트로 분리하여 구성합니다.
 *   Hero, TechStack, FeaturesSection, HomeFooter, BackgroundPattern으로 컴포지션합니다.
 * - 기술 스택은 라이브러리(package)별 카드로 나누어 설명합니다.
 */

// 정적 페이지: 60초마다 재검증
export const revalidate = 60;

// 동적 렌더링 비활성화 (정적 생성)
export const dynamic = "force-static";

export default async function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground transition-colors duration-300">
      <BackgroundPattern />

      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Main Container with max-width */}
      <div className="mx-auto max-w-6xl">
        <main className="relative flex min-h-screen w-full flex-col items-center px-6 py-16 sm:px-8 lg:px-16">
          <Hero />

          {/* 기술 스택 - Suspense 경계 */}
          <Suspense fallback={<TechStackSkeleton />}>
            <TechStack />
          </Suspense>

          {/* 기능 섹션 - Suspense 경계 */}
          <Suspense fallback={<FeaturesSkeleton />}>
            <FeaturesSection />
          </Suspense>

          <HomeFooter />
        </main>
      </div>
      <Toaster />
    </div>
  );
}
