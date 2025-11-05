import { PrismaClient } from "@/generated/prisma/client";
import { env } from "@/lib/env";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

/**
 * Prisma 클라이언트 싱글톤
 * - 개발 환경에서는 전역 변수에 저장하여 핫 리로드 시 재연결 방지
 * - 프로덕션에서는 매번 새로운 인스턴스 생성
 */
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: env.DATABASE_URL,
      },
    },
    log:
      env.NODE_ENV === "development"
        ? ["warn", "error", "query", "info"]
        : env.NODE_ENV === "test"
          ? [] // no logs in test
          : ["warn", "error"], // production
  });

// 개발 환경에서만 전역 변수에 저장
if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
