import { LogIn } from "lucide-react";
import Link from "next/link";
import { Toaster } from "sonner";
import { auth } from "@/auth";
import { GoogleSigninButton } from "@/components/auth/google-signin-button";
import { SignOutButton } from "@/components/auth/signout-button";
import { UserAvatar } from "@/components/auth/user-avatar";
import { Card, CardContent } from "@/components/ui/card";

/**
 * 로그인 기능 페이지 (서버 컴포넌트)
 * - Auth.js v5 + Google OAuth를 사용해 로그인/로그아웃 및 세션 정보를 표시합니다.
 * - 홈에서는 기능을 직접 보여주지 않으므로, 이 페이지에서 실제 동작을 확인합니다.
 */
export default async function LoginFeaturePage() {
  const session = await auth();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-md mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <h1 className="font-bold text-3xl inline-flex items-center gap-2">
            <LogIn className="w-7 h-7" aria-hidden="true" />
            <span>로그인 기능</span>
          </h1>
          <p className="text-foreground/70 mt-2">Google OAuth를 통한 소셜 로그인 데모</p>
        </div>

        <Card className="w-full bg-background/80 backdrop-blur-sm border-foreground/10 shadow-xl">
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
                <h3 className="font-semibold text-lg mb-1">로그인 성공!</h3>
                <p className="text-sm text-foreground/60 mb-4">
                  환영합니다, {session.user?.name || session.user?.email}님
                </p>
                <div className="flex justify-center">
                  <SignOutButton />
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold text-lg mb-2">시작하기</h3>
                <p className="text-sm text-foreground/60 mb-4">
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
            className="text-sm font-medium text-foreground hover:text-foreground/80 underline underline-offset-4"
          >
            ← 홈으로 돌아가기
          </Link>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
