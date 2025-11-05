/**
 * 기술 스택 로딩 스켈레톤
 * - TechStack 컴포넌트 로딩 중 표시되는 플레이스홀더
 */
export function TechStackSkeleton() {
  return (
    <div className="w-full space-y-8">
      <div className="text-center">
        <div className="mb-4 h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="mx-auto h-4 w-96 animate-pulse rounded bg-muted" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="space-y-3 rounded-lg border bg-card p-4 animate-pulse"
          >
            <div className="h-6 w-24 rounded bg-muted" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-5/6 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

