# Next.js 16 보일러플레이트 - 고급 개선 사항

## 🎯 추가 최적화 및 베스트 프랙티스

### 1. Suspense 경계 추가

**현재 상태:**
- Suspense 미사용
- 로딩 상태 처리 없음

**개선 방법:**

```typescript
// src/app/page.tsx
import { Suspense } from 'react';
import { TechStackSkeleton } from '@/components/home/tech-stack-skeleton';
import { FeaturesSkeleton } from '@/components/home/features-skeleton';

export default async function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BackgroundPattern />
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      
      <div className="max-w-6xl mx-auto">
        <main className="relative flex min-h-screen w-full flex-col items-center px-6 py-16">
          <Hero />
          
          {/* Suspense 경계 추가 */}
          <Suspense fallback={<TechStackSkeleton />}>
            <TechStack />
          </Suspense>
          
          <Suspense fallback={<FeaturesSkeleton />}>
            <FeaturesSection />
          </Suspense>
          
          <HomeFooter />
        </main>
      </div>
      <Toaster />
    </div>
  );
}

// src/components/home/tech-stack-skeleton.tsx
export function TechStackSkeleton() {
  return (
    <div className="w-full space-y-4 animate-pulse">
      <div className="h-8 bg-foreground/10 rounded w-1/3"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-24 bg-foreground/10 rounded"></div>
        ))}
      </div>
    </div>
  );
}
```

---

### 2. 동적 라우트 및 병렬 라우트 구현

**권장 구조:**

```
src/app/
├── features/
│   ├── @modal/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── form/
│   │       └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
```

**예시 구현:**

```typescript
// src/app/features/layout.tsx
export default function FeaturesLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

// src/app/features/@modal/login/page.tsx
// 모달로 표시될 로그인 페이지
```

---

### 3. 타입 안전성 강화

**문제점:**
- `src/auth.ts`에서 `any` 타입 사용
- 세션 타입 확장 미흡

**해결 방법:**

```typescript
// src/types/auth.ts
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

export interface ExtendedUser extends User {
  role?: "USER" | "ADMIN";
  displayName?: string;
}

export interface ExtendedSession extends Session {
  user: ExtendedUser;
}

export interface ExtendedJWT extends JWT {
  role?: string;
  displayName?: string;
}

// src/auth.ts
import type { ExtendedSession, ExtendedJWT, ExtendedUser } from "@/types/auth";

declare module "next-auth" {
  interface User extends ExtendedUser {}
  interface Session extends ExtendedSession {}
}

declare module "next-auth/jwt" {
  interface JWT extends ExtendedJWT {}
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  // ... 설정
  callbacks: {
    jwt({ token, user }: { token: ExtendedJWT; user?: ExtendedUser }) {
      if (user) {
        token.role = user.role;
        token.displayName = user.displayName;
      }
      return token;
    },
    session({ session, token }: { session: ExtendedSession; token: ExtendedJWT }) {
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

### 4. 미들웨어 추가 (선택사항)

**용도:**
- 인증 확인
- 리다이렉트 처리
- 요청 로깅

```typescript
// src/middleware.ts
import { auth } from "@/auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();

  // 보호된 라우트 확인
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/protected/:path*"],
};
```

---

### 5. 환경 변수 검증

**문제점:**
- 환경 변수 검증 없음
- 런타임 에러 가능성

**해결 방법:**

```typescript
// src/lib/env.ts
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  AUTH_SECRET: z.string().min(32),
  AUTH_GOOGLE_ID: z.string(),
  AUTH_GOOGLE_SECRET: z.string(),
  NODE_ENV: z.enum(["development", "production", "test"]),
});

export const env = envSchema.parse(process.env);

// src/lib/prisma.ts
import { env } from "@/lib/env";

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL,
    },
  },
});
```

---

### 6. 성능 모니터링

**권장 도구:**
- Web Vitals 모니터링
- 에러 추적 (Sentry)
- 분석 (Vercel Analytics)

```typescript
// src/lib/analytics.ts
import { useReportWebVitals } from 'next/web-vitals';

export function reportWebVitals(metric: any) {
  console.log(metric);
  
  // 외부 서비스로 전송
  // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(metric) });
}

// src/app/layout.tsx
import { reportWebVitals } from '@/lib/analytics';

useReportWebVitals(reportWebVitals);
```

---

### 7. 번들 분석

**설정:**

```typescript
// next.config.ts
import { withBundleAnalyzer } from '@next/bundle-analyzer';

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withAnalyzer({
  // ... 설정
});

// package.json
{
  "scripts": {
    "analyze": "ANALYZE=true next build"
  }
}
```

---

### 8. 캐시 태그 및 재검증

**고급 캐싱 전략:**

```typescript
// src/app/features/login/page.tsx
import { revalidateTag } from 'next/cache';

export const revalidate = false; // ISR 비활성화

export default async function LoginFeaturePage() {
  const session = await auth();
  
  return (
    // ...
  );
}

// src/app/actions/auth.ts
"use server";

import { revalidateTag } from 'next/cache';

export async function signOutAction() {
  await signOut();
  revalidateTag('session');
}
```

---

### 9. 국제화 (i18n) 고려

**구조:**

```
src/app/
├── [lang]/
│   ├── page.tsx
│   ├── features/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── form/
│   │       └── page.tsx
│   └── layout.tsx
```

```typescript
// src/app/[lang]/layout.tsx
export async function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }];
}

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  );
}
```

---

### 10. 테스트 설정

**권장 도구:**
- Vitest (단위 테스트)
- Playwright (E2E 테스트)

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

// src/components/__tests__/button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';
import { describe, it, expect } from 'vitest';

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

---

## 📋 구현 순서 권장

1. **1주차**: 이미지 최적화, 메타데이터, 에러 처리
2. **2주차**: Auth.js 개선, Server Actions 확대
3. **3주차**: Suspense, 타입 안전성, 미들웨어
4. **4주차**: 성능 모니터링, 테스트, i18n

