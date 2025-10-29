import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const env = process.env.NODE_ENV;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log:
      env === "development"
        ? ["warn", "error", "query", "info"]
        : env === "test"
          ? [] // no logs in test
          : ["warn", "error"], // production / other
  });

if (env !== "production") globalForPrisma.prisma = prisma;
