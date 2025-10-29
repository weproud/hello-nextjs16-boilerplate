import { Toaster } from "sonner";
import { BackgroundPattern } from "@/components/home/background-pattern";
import { FeaturesSection } from "@/components/home/features-section";
import { HomeFooter } from "@/components/home/footer";
import { Hero } from "@/components/home/hero";
import { TechStack } from "@/components/home/tech-stack";
import { ThemeToggle } from "@/components/ui/theme-toggle";

/**
 * 홈 페이지 서버 컴포넌트
 * - 화면 복잡도를 줄이기 위해 섹션을 컴포넌트로 분리하여 구성합니다.
 *   Hero, TechStack, FeaturesSection, HomeFooter, BackgroundPattern으로 컴포지션합니다.
 * - 기술 스택은 라이브러리(package)별 카드로 나누어 설명합니다.
 */
export default async function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300">
      <BackgroundPattern />

      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Main Container with max-width */}
      <div className="max-w-6xl mx-auto">
        <main className="relative flex min-h-screen w-full flex-col items-center px-6 py-16 sm:px-8 lg:px-16">
          <Hero />
          <TechStack />
          <FeaturesSection />
          <HomeFooter />
        </main>
      </div>
      <Toaster />
    </div>
  );
}
