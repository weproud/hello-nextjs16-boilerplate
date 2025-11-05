import { LogIn } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Toaster } from "sonner";
import { auth } from "@/auth";
import { GoogleSigninButton } from "@/components/auth/google-signin-button";
import { SignOutButton } from "@/components/auth/signout-button";
import { UserAvatar } from "@/components/auth/user-avatar";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "로그인 기능",
  description:
    "Google OAuth를 통한 소셜 로그인 데모 - Auth.js v5 + Prisma Adapter 사용",
  openGraph: {
    title: "로그인 기능 | Hello Next.js 16",
    description: "Google OAuth를 통한 소셜 로그인 데모",
  },
};

// 동적 페이지: 세션 정보가 변경될 수 있으므로 동적 렌더링
export const dynamic = "force-dynamic";

/**
 * 로그인 기능 페이지 (서버 컴포넌트)
 * - Auth.js v5 + Google OAuth를 사용해 로그인/로그아웃 및 세션 정보를 표시합니다.
 * - 홈에서는 기능을 직접 보여주지 않으므로, 이 페이지에서 실제 동작을 확인합니다.
 */
export default async function LoginFeaturePage() {
  const session = await auth();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-md px-6 py-16">
        <div className="mb-8 text-center">
          <h1 className="inline-flex items-center gap-2 font-bold text-3xl">
            <LogIn className="h-7 w-7" aria-hidden="true" />
            <span>로그인 기능</span>
          </h1>
          <p className="mt-2 text-foreground/70">
            Google OAuth를 통한 소셜 로그인 데모
          </p>
        </div>

        <Card className="w-full border-foreground/10 bg-background/80 shadow-xl backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            {session ? (
              <div>
                <div className="mb-4 flex justify-center">
                  <UserAvatar
                    src={session.user?.image}
                    name={session.user?.name}
                    displayName={session.user?.displayName}
                    size="lg"
                  />
                </div>
                <h3 className="mb-1 font-semibold text-lg">로그인 성공!</h3>
                <p className="mb-4 text-foreground/60 text-sm">
                  환영합니다, {session.user?.name || session.user?.email}님
                </p>
                <div className="flex justify-center">
                  <SignOutButton />
                </div>
              </div>
            ) : (
              <div>
                <h3 className="mb-2 font-semibold text-lg">시작하기</h3>
                <p className="mb-4 text-foreground/60 text-sm">
                  Google 계정으로 간편하게 로그인하세요
                </p>
                <div className="flex justify-center">
                  <GoogleSigninButton />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="font-medium text-foreground text-sm underline underline-offset-4 hover:text-foreground/80"
          >
            ← 홈으로 돌아가기
          </Link>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
