/**
 * 기능 섹션 로딩 스켈레톤
 * - FeaturesSection 컴포넌트 로딩 중 표시되는 플레이스홀더
 */
export function FeaturesSkeleton() {
  return (
    <div className="w-full space-y-8">
      <div className="text-center">
        <div className="mb-4 h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="mx-auto h-4 w-96 animate-pulse rounded bg-muted" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="space-y-3 rounded-lg border bg-card p-6 animate-pulse"
          >
            <div className="h-6 w-32 rounded bg-muted" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-3/4 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

