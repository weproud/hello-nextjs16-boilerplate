/* eslint-disable react/no-children-prop */
"use client";

import { useForm } from "@tanstack/react-form";
import { useTransition } from "react";
import * as React from "react";
import { toast } from "sonner";
import * as z from "zod";

import { submitBugReport } from "@/app/actions/bug-report";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// Zod 스키마 정의
const formSchema = z.object({
  title: z
    .string()
    .min(10, "버그 제목은 최소 10자 이상이어야 합니다.")
    .max(32, "버그 제목은 최대 32자까지 입력 가능합니다."),
  description: z
    .string()
    .min(10, "설명은 최소 10자 이상이어야 합니다.")
    .max(100, "설명은 최대 100자까지 입력 가능합니다."),
});

// Field 컴포넌트들
interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  "data-invalid"?: boolean;
}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("space-y-2", className)} {...props} />;
  }
);
Field.displayName = "Field";

const FieldGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("space-y-6", className)} {...props} />;
});
FieldGroup.displayName = "FieldGroup";

const FieldLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  return (
    <Label
      ref={ref}
      className={cn(
        "font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  );
});
FieldLabel.displayName = "FieldLabel";

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
});
FieldDescription.displayName = "FieldDescription";

interface FieldErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  errors?: (
    | string
    | { message?: string; toString?: () => string }
    | undefined
  )[];
}

const FieldError = React.forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({ className, errors, ...props }, ref) => {
    if (!errors || errors.length === 0) return null;

    // TanStack Form 오류 메시지 추출
    const firstError = errors[0];
    let errorMessage = "유효하지 않은 입력입니다.";

    if (typeof firstError === "string") {
      errorMessage = firstError;
    } else if (firstError && typeof firstError === "object") {
      errorMessage =
        (firstError as any).message ||
        (firstError as any).toString?.() ||
        "유효하지 않은 입력입니다.";
    }

    return (
      <p
        ref={ref}
        className={cn("font-medium text-destructive text-sm", className)}
        {...props}
      >
        {errorMessage}
      </p>
    );
  }
);
FieldError.displayName = "FieldError";

export function BugReportForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      // Server Action으로 폼 제출
      startTransition(async () => {
        const result = await submitBugReport(value);

        if (result.success) {
          toast.success(result.message);
          // 폼 초기화
          form.reset();
        } else {
          toast.error(result.error || result.message);
        }
      });
    },
  });

  return (
    <div className="mx-auto max-w-md rounded-lg border bg-card p-6">
      <div className="mb-6">
        <h2 className="font-bold text-2xl">버그 리포트</h2>
        <p className="text-muted-foreground">
          발견한 버그를 신고하여 개선에 도움을 주세요.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <FieldGroup>
          <form.Field
            name="title"
            validators={{
              onBlur: z
                .string()
                .min(10, "버그 제목은 최소 10자 이상이어야 합니다."),
            }}
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>버그 제목</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="모바일에서 로그인 버튼이 작동하지 않음"
                    autoComplete="off"
                    className={cn(
                      isInvalid &&
                        "border-destructive focus-visible:ring-destructive"
                    )}
                  />
                  <FieldDescription>
                    버그에 대한 간결한 제목을 입력해주세요.
                  </FieldDescription>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="description"
            validators={{
              onBlur: z.string().min(10, "설명은 최소 10자 이상이어야 합니다."),
            }}
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>설명</FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="버그가 발생한 상황과 예상되는 동작을 자세히 설명해주세요."
                    className={cn(
                      "min-h-[100px] resize-none",
                      isInvalid &&
                        "border-destructive focus-visible:ring-destructive"
                    )}
                  />
                  <FieldDescription>
                    버그 재현 방법과 예상 결과를 포함해주세요.
                  </FieldDescription>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "제출 중..." : "제출"}
        </Button>
      </form>
    </div>
  );
}
