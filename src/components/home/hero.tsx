/**
 * Hero 섹션 컴포넌트
 * - 상단 배지(Next.js 16 Ready), 페이지 타이틀, 설명 문구를 표시합니다.
 * - 홈 페이지의 인트로 역할을 하며, 시각적 헤드라인을 제공합니다.
 */
export function Hero() {
  return (
    <div className="mb-12 w-full text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 shadow-sm backdrop-blur-sm">
        <div className="h-2 w-2 animate-pulse rounded-full bg-foreground opacity-60"></div>
        <span className="font-medium text-foreground/70 text-sm">Next.js 16 Ready</span>
      </div>

      <h1 className="mb-4 font-black text-5xl text-foreground lg:text-6xl">Hello Next.js 16</h1>
      <div className="mx-auto max-w-2xl">
        <p className="w-full font-light text-foreground/70 text-xl leading-relaxed">
          모던 웹 개발을 위한 완벽한 보일러플레이트
        </p>
      </div>
    </div>
  );
}
