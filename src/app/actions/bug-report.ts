"use server";

import { z } from "zod";

/**
 * 버그 리포트 폼 스키마
 * - 클라이언트와 서버에서 동일한 검증 규칙 사용
 */
const bugReportSchema = z.object({
  title: z
    .string()
    .min(10, "버그 제목은 최소 10자 이상이어야 합니다.")
    .max(32, "버그 제목은 최대 32자까지 입력 가능합니다."),
  description: z
    .string()
    .min(10, "설명은 최소 10자 이상이어야 합니다.")
    .max(100, "설명은 최대 100자까지 입력 가능합니다."),
});

export type BugReportInput = z.infer<typeof bugReportSchema>;

/**
 * 버그 리포트 제출 Server Action
 * - 클라이언트에서 폼 데이터를 받아 서버에서 검증 및 처리합니다.
 * - 데이터베이스 저장, 이메일 알림 등의 작업을 수행할 수 있습니다.
 *
 * @param data - 버그 리포트 폼 데이터
 * @returns 성공/실패 결과
 */
export async function submitBugReport(
  data: BugReportInput
): Promise<{ success: boolean; message: string; error?: string }> {
  try {
    // 1. 데이터 검증
    const validatedData = bugReportSchema.parse(data);

    // 2. 서버 사이드 처리 (예: 데이터베이스 저장)
    console.log("Bug report submitted:", {
      title: validatedData.title,
      description: validatedData.description,
      timestamp: new Date().toISOString(),
    });

    // 3. 실제 구현에서는 여기서 데이터베이스에 저장
    // await prisma.bugReport.create({
    //   data: {
    //     title: validatedData.title,
    //     description: validatedData.description,
    //   },
    // });

    // 4. 이메일 알림 (선택사항)
    // await sendEmailNotification({
    //   to: "admin@example.com",
    //   subject: `New bug report: ${validatedData.title}`,
    //   body: validatedData.description,
    // });

    return {
      success: true,
      message: "버그 리포트가 성공적으로 제출되었습니다!",
    };
  } catch (error) {
    // 검증 에러 처리
    if (error instanceof z.ZodError) {
      const firstIssue = error.issues[0];
      return {
        success: false,
        message: "검증 실패",
        error: firstIssue?.message || "알 수 없는 검증 에러",
      };
    }

    // 기타 에러 처리
    console.error("Bug report submission error:", error);
    return {
      success: false,
      message: "버그 리포트 제출 중 오류가 발생했습니다.",
      error: error instanceof Error ? error.message : "알 수 없는 에러",
    };
  }
}
