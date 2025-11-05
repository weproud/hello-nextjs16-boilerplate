/**
 * 배경 패턴 컴포넌트
 * - 페이지 전역에 깔리는 SVG 패턴 배경을 렌더링합니다.
 * - 레이아웃 상절대 위치로 배치되어 내용 뒤에 흐릿한 질감을 제공합니다.
 * - 최적화: 외부 SVG 파일 사용으로 캐싱 및 성능 개선
 */
export function BackgroundPattern() {
  return (
    <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-40" />
  );
}
