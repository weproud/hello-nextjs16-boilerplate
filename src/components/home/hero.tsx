/**
 * Hero 섹션 컴포넌트
 * - 상단 배지(Next.js 16 Ready), 페이지 타이틀, 설명 문구를 표시합니다.
 * - 홈 페이지의 인트로 역할을 하며, 시각적 헤드라인을 제공합니다.
 */
export function Hero() {
  return (
    <div className="w-full text-center mb-12">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-foreground/5 backdrop-blur-sm rounded-full border border-foreground/10 shadow-sm mb-6">
        <div className="w-2 h-2 bg-foreground rounded-full animate-pulse opacity-60"></div>
        <span className="text-sm font-medium text-foreground/70">Next.js 16 Ready</span>
      </div>

      <h1 className="font-black text-5xl lg:text-6xl text-foreground mb-4">Hello Next.js 16</h1>
      <div className="max-w-2xl mx-auto">
        <p className="text-xl text-foreground/70 font-light w-full leading-relaxed">
          모던 웹 개발을 위한 완벽한 보일러플레이트
        </p>
      </div>
    </div>
  );
}
