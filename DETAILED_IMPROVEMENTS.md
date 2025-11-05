# Next.js 16 보일러플레이트 - 상세 개선 가이드

## 🔴 높은 우선순위 개선 사항

### 1. 이미지 최적화 (next/image 사용)

**문제점:**
- 배경 패턴이 인라인 SVG 데이터 URI 사용
- Google 로고가 인라인 SVG 사용
- 공개 이미지 최적화 없음

**해결 방법:**

#### 1.1 배경 패턴 최적화
```typescript
// src/components/home/background-pattern.tsx
// 현재: 인라인 SVG 데이터 URI
// 개선: 별도 SVG 파일로 분리

// public/pattern.svg 생성
// 그 후 import로 사용
import PatternSvg from '@/public/pattern.svg';
```

#### 1.2 Google 로고 최적화
```typescript
// src/components/auth/google-signin-button.tsx
// 현재: 인라인 SVG
// 개선: 별도 컴포넌트로 분리

// src/components/icons/google-logo.tsx 생성
export function GoogleLogo() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      {/* SVG 내용 */}
    </svg>
  );
}
```

#### 1.3 원격 이미지 최적화
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
        pathname: '/**',
      },
    ],
    // 성능 최적화
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

---

### 2. 캐싱 전략 설정

**문제점:**
- `next.config.ts`가 비어있음
- 정적/동적 렌더링 명시 없음
- 데이터 캐싱 전략 없음

**해결 방법:**

#### 2.1 next.config.ts 완성
```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 이미지 최적화
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
    ],
  },
  
  // 성능 최적화
  compress: true,
  poweredByHeader: false,
  
  // 보안
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
      ],
    },
  ],
};

export default nextConfig;
```

#### 2.2 페이지별 캐싱 설정
```typescript
// src/app/page.tsx
// 홈페이지: 정적 생성 (ISR)
export const revalidate = 3600; // 1시간마다 재검증

export default async function Home() {
  // ...
}

// src/app/features/login/page.tsx
// 로그인 페이지: 동적 렌더링 (세션 기반)
export const dynamic = 'force-dynamic';

export default async function LoginFeaturePage() {
  // ...
}
```

---

## ⚠️ 중간 우선순위 개선 사항

### 3. 메타데이터 API 완성

**문제점:**
- 루트 메타데이터가 제네릭 기본값
- 동적 라우트에 메타데이터 없음
- Open Graph 메타데이터 없음

**해결 방법:**

```typescript
// src/app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Hello Next.js 16 - Modern Web Development Boilerplate",
    template: "%s | Hello Next.js 16",
  },
  description: "A production-ready Next.js 16 boilerplate with Auth.js, Prisma, Tailwind CSS, and more.",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Auth.js"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://yourdomain.com",
    title: "Hello Next.js 16",
    description: "Modern web development boilerplate",
    images: [
      {
        url: "https://yourdomain.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hello Next.js 16",
    description: "Modern web development boilerplate",
  },
};

// src/app/features/login/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인 기능",
  description: "Google OAuth를 통한 소셜 로그인 데모",
};

// src/app/features/form/page.tsx
export const metadata: Metadata = {
  title: "폼 검증 기능",
  description: "TanStack Form + Zod를 활용한 타입 안전한 검증",
};
```

---

### 4. 에러 및 로딩 처리

**문제점:**
- 에러 경계 없음
- 로딩 상태 UI 없음

**해결 방법:**

```typescript
// src/app/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">문제가 발생했습니다</h2>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}

// src/app/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}
```

---

### 5. Auth.js CommonJS → ES 모듈 변경

**문제점:**
```typescript
// 현재: CommonJS 사용
const NextAuth = require("next-auth").default;
```

**해결 방법:**
```typescript
// src/auth.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import authConfig from "./auth.config";
import { prisma } from "./lib/prisma";

// 타입 확장
declare module "next-auth" {
  interface User {
    role?: string;
    displayName?: string;
  }
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    displayName?: string;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60 },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.displayName = user.displayName;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.displayName = token.displayName;
      }
      return session;
    },
  },
});
```

---

### 6. Server Actions 확대

**문제점:**
- 폼 제출이 클라이언트 사이드에서만 처리됨

**해결 방법:**
```typescript
// src/components/forms/bug-report-form.tsx
"use client";

import { submitBugReport } from "@/app/actions/bug-report";

export function BugReportForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const formData = new FormData(e.currentTarget);
      await submitBugReport(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 폼 필드 */}
    </form>
  );
}

// src/app/actions/bug-report.ts
"use server";

import { z } from "zod";

const bugReportSchema = z.object({
  title: z.string().min(10).max(32),
  description: z.string().min(10).max(100),
});

export async function submitBugReport(formData: FormData) {
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
  };

  const result = bugReportSchema.safeParse(data);
  if (!result.success) {
    throw new Error("검증 실패");
  }

  // 데이터베이스에 저장
  // await db.bugReport.create({ data: result.data });
  
  return { success: true };
}
```

---

## 📝 체크리스트

- [ ] 이미지 최적화 구현
- [ ] next.config.ts 완성
- [ ] 메타데이터 API 완성
- [ ] 에러/로딩 처리 추가
- [ ] Auth.js ES 모듈 변경
- [ ] Server Actions 확대
- [ ] Suspense 경계 추가
- [ ] 성능 테스트 실행

