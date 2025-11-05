import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js 미들웨어
 * - 요청 전에 실행되는 로직
 * - 인증 확인, 리다이렉트, 헤더 수정 등을 처리합니다.
 *
 * 주요 기능:
 * 1. 보호된 라우트 인증 확인
 * 2. 인증되지 않은 사용자 리다이렉트
 * 3. 요청 헤더 수정
 * 4. 로깅 및 모니터링
 */

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 공개 라우트 (인증 불필요)
  const publicRoutes = ["/", "/features/form"];

  // 보호된 라우트 (인증 필요)
  const protectedRoutes = ["/features/login"];

  // 공개 라우트는 미들웨어 처리 스킵
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // 보호된 라우트 확인
  if (protectedRoutes.includes(pathname)) {
    // 세션 확인 (Auth.js)
    const session = await auth();

    // 인증되지 않은 경우 로그인 페이지로 리다이렉트
    if (!session) {
      const loginUrl = new URL("/features/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 요청 헤더에 타임스탬프 추가 (로깅용)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-request-time", new Date().toISOString());

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

/**
 * 미들웨어가 실행될 경로 설정
 * - matcher를 사용하여 특정 경로에서만 미들웨어 실행
 * - 정적 파일, API 라우트 등은 제외
 */
export const config = {
  matcher: [
    /*
     * 다음을 제외한 모든 요청 경로에서 미들웨어 실행:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘)
     * - public 폴더의 파일들
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};

