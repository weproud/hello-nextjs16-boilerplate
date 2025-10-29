const NextAuth = require("next-auth").default;

import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import authConfig from "./auth.config";
import { prisma } from "./lib/prisma";

const nextAuth = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60 }, // 7 days
  secret: process.env.AUTH_SECRET,
  ...authConfig,
  callbacks: {
    jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.role = (user as any).role;
        token.displayName = (user as any).displayName;
      }
      return token;
    },
    session({ session, token }: { session: Session; token: JWT }) {
      if (token.role) {
        (session.user as any).role = token.role;
      }
      if (token.displayName) {
        (session.user as any).displayName = token.displayName;
      }
      return session;
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }: any) {
      console.log("User signed in:", { user, account, profile, isNewUser });
    },
  },
});

export const { auth, handlers, signIn, signOut } = nextAuth;
