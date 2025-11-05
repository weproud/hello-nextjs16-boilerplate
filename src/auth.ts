/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { ExtendedJWT, ExtendedSession, ExtendedUser } from "@/types/auth";
import authConfig from "./auth.config";
import { prisma } from "./lib/prisma";

// NextAuth v5 베타에서는 require 사용 필요
// eslint-disable-next-line @typescript-eslint/no-require-imports
const NextAuth = require("next-auth").default;

/**
 * NextAuth 설정
 * - JWT 세션 전략 사용 (7일 만료)
 * - Prisma Adapter로 데이터베이스 연동
 * - 커스텀 콜백으로 사용자 정보 확장
 */
const nextAuth = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
  callbacks: {
    /**
     * JWT 콜백: 토큰에 사용자 정보 추가
     */
    jwt({ token, user }: { token: ExtendedJWT; user?: ExtendedUser }) {
      if (user) {
        token.role = user.role;
        token.displayName = user.displayName;
      }
      return token;
    },

    /**
     * 세션 콜백: 토큰의 정보를 세션에 추가
     */
    session({ session, token }: { session: ExtendedSession; token: ExtendedJWT }) {
      if (session.user) {
        session.user.role = (token.role as "USER" | "ADMIN" | undefined) || undefined;
        session.user.displayName = token.displayName;
      }
      return session;
    },
  },
  events: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signIn({ user, isNewUser }: any) {
      console.log("User signed in:", {
        userId: user.id,
        isNewUser,
      });
    },
  },
});

export const { auth, handlers, signIn, signOut } = nextAuth;
