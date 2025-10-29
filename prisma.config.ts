import "dotenv/config";
import path from "node:path";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  engine: "classic",
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    path: path.join("prisma", "migrations"),
    // seed: "ts-node -r tsconfig-paths/register prisma/seed.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
