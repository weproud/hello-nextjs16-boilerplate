import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

/**
 * 확장된 User 타입
 * Auth.js의 기본 User 타입에 커스텀 필드를 추가합니다.
 */
export interface ExtendedUser extends User {
  role?: "USER" | "ADMIN";
  displayName?: string;
}

/**
 * 확장된 Session 타입
 * 세션에 포함될 사용자 정보를 정의합니다.
 */
export interface ExtendedSession extends Session {
  user: ExtendedUser;
}

/**
 * 확장된 JWT 토큰 타입
 * JWT 토큰에 저장될 커스텀 클레임을 정의합니다.
 */
export interface ExtendedJWT extends JWT {
  role?: string;
  displayName?: string;
}
