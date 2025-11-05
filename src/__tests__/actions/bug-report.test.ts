import { submitBugReport } from "@/app/actions/bug-report";

/**
 * submitBugReport Server Action 테스트
 * - 유효한 데이터 제출
 * - 검증 에러 처리
 * - 필드별 검증
 */

describe("submitBugReport Server Action", () => {
  it("successfully submits valid bug report", async () => {
    const validData = {
      title: "This is a valid bug title",
      description: "This is a valid bug description with enough characters",
    };

    const result = await submitBugReport(validData);

    expect(result.success).toBe(true);
    expect(result.message).toContain("성공적으로");
  });

  it("rejects title that is too short", async () => {
    const invalidData = {
      title: "Short",
      description: "This is a valid bug description with enough characters",
    };

    const result = await submitBugReport(invalidData);

    expect(result.success).toBe(false);
    expect(result.error).toContain("최소 10자");
  });

  it("rejects title that is too long", async () => {
    const invalidData = {
      title: "This is a very long bug title that exceeds the maximum length",
      description: "This is a valid bug description with enough characters",
    };

    const result = await submitBugReport(invalidData);

    expect(result.success).toBe(false);
    expect(result.error).toContain("최대 32자");
  });

  it("rejects description that is too short", async () => {
    const invalidData = {
      title: "This is a valid bug title",
      description: "Short",
    };

    const result = await submitBugReport(invalidData);

    expect(result.success).toBe(false);
    expect(result.error).toContain("최소 10자");
  });

  it("rejects description that is too long", async () => {
    const invalidData = {
      title: "This is a valid bug title",
      description:
        "This is a very long bug description that exceeds the maximum length allowed for this field",
    };

    const result = await submitBugReport(invalidData);

    expect(result.success).toBe(false);
    expect(result.error).toContain("최대 100자");
  });
});

