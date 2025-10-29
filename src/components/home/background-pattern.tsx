/**
 * 배경 패턴 컴포넌트
 * - 페이지 전역에 깔리는 SVG 패턴 배경을 렌더링합니다.
 * - 레이아웃 상절대 위치로 배치되어 내용 뒤에 흐릿한 질감을 제공합니다.
 */
export function BackgroundPattern() {
  return (
    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
  );
}
