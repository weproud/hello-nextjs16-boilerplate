import { Heart } from "lucide-react";

/**
 * 홈 페이지 푸터 컴포넌트
 * - 프로젝트에 사용된 기술에 대한 간단한 크레딧 문구를 출력합니다.
 */
export function HomeFooter() {
  return (
    <div className="w-full mt-16 text-center">
      <p className="text-foreground/50 text-sm">
        Built with{" "}
        <Heart className="inline-block w-4 h-4 text-red-500 align-text-bottom" aria-label="love" />{" "}
        using Next.js 16 and modern web technologies
      </p>
    </div>
  );
}
