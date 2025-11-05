import { Heart } from "lucide-react";

/**
 * 홈 페이지 푸터 컴포넌트
 * - 프로젝트에 사용된 기술에 대한 간단한 크레딧 문구를 출력합니다.
 */
export function HomeFooter() {
  return (
    <div className="mt-16 w-full text-center">
      <p className="text-foreground/50 text-sm">
        Built with{" "}
        <Heart className="inline-block h-4 w-4 align-text-bottom text-red-500" aria-label="love" />{" "}
        using Next.js 16 and modern web technologies
      </p>
    </div>
  );
}
