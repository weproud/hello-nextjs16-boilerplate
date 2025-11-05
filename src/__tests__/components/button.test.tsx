import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

/**
 * Button 컴포넌트 테스트
 * - 기본 렌더링
 * - 클릭 이벤트
 * - 다양한 variant 테스트
 */

describe("Button Component", () => {
  it("renders button with text", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("renders button with default variant", () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole("button", { name: /default/i });
    expect(button).toHaveClass("bg-primary");
  });

  it("renders button with outline variant", () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole("button", { name: /outline/i });
    expect(button).toHaveClass("border");
  });

  it("renders disabled button", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    const button = screen.getByRole("button", { name: /click/i });
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

