// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

/**
 * Jest 설정 파일
 * - 테스트 환경 초기화
 * - 글로벌 테스트 유틸리티 설정
 */

// 환경 변수 설정 (테스트 환경용)
process.env.NEXTAUTH_SECRET = "test-secret-key";
process.env.NEXTAUTH_URL = "http://localhost:3000";
process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/test";

