import type { Provider } from "next-auth/providers";
import Google from "next-auth/providers/google";

const providers: Provider[] = [
  Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    profile(profile) {
      // Map only the fields supported by NextAuth + Prisma Adapter to avoid passing raw token claims
      return {
        // Note: With an Adapter, DB id will be generated. This id is used for providerAccountId instead.
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
        displayName: `${profile.name}'s 표시이름`,
        role: "USER",
      };
    },
  }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

// NextAuth v5에서는 NextAuthConfig 타입을 직접 import하지 않고 설정 객체를 export합니다
export default {
  providers,
};
