import { z } from "zod";

/**
 * 환경 변수 검증 스키마
 * 런타임에 필수 환경 변수가 올바르게 설정되었는지 확인합니다.
 */
const envSchema = z.object({
  // 데이터베이스
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL"),

  // Auth.js
  AUTH_SECRET: z.string().min(32, "AUTH_SECRET must be at least 32 characters"),
  AUTH_GOOGLE_ID: z.string().min(1, "AUTH_GOOGLE_ID is required"),
  AUTH_GOOGLE_SECRET: z.string().min(1, "AUTH_GOOGLE_SECRET is required"),

  // 환경
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

/**
 * 검증된 환경 변수
 * 애플리케이션 전체에서 사용할 수 있는 타입 안전한 환경 변수
 */
export const env = envSchema.parse(process.env);

/**
 * 환경 변수 타입 추출
 * 다른 모듈에서 환경 변수 타입을 참조할 때 사용
 */
export type Env = z.infer<typeof envSchema>;
