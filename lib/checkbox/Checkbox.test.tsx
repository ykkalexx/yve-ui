import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Checkbox } from "./Checkbox";

describe(`Component: ${Checkbox.displayName}`, () => {
  const mockHandler = vi.fn();

  beforeEach(() => {
    mockHandler.mockClear();
  });

  describe("Basic Rendering", () => {
    it("renders with right label", () => {
      render(<Checkbox label="Accept Terms" labelPosition="right" />);
      expect(screen.getByText("Accept Terms")).toBeInTheDocument();
    });

    it("renders with left label", () => {
      render(<Checkbox label="Accept Terms" labelPosition="left" />);
      expect(screen.getByText("Accept Terms")).toBeInTheDocument();
    });

    it("forwards ref", () => {
      const ref = { current: null as HTMLInputElement | null };
      render(<Checkbox ref={ref} label="Ref test" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it("renders with custom className", () => {
      render(<Checkbox className="custom-class" label="custom" />);
      const wrapper = screen.getByText("custom").previousSibling;
      expect(wrapper).toHaveClass("custom-class");
    });

    it("renders as checked", () => {
      render(<Checkbox label="Checked" checked />);
      const checkbox = screen.getByLabelText("Checked") as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it("renders as unchecked", () => {
      render(<Checkbox label="Unchecked" />);
      const checkbox = screen.getByLabelText("Unchecked") as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });

    it("renders without label", () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe("Shapes", () => {
    it("renders with pill shape", () => {
      render(<Checkbox label="Pill" shape="pill" />);
      const wrapper = screen.getByText("Pill").previousSibling;
      expect(wrapper).toBeInTheDocument();
    });

    it("renders with rounded shape", () => {
      render(<Checkbox label="Rounded" shape="rounded" />);
      const wrapper = screen.getByText("Rounded").previousSibling;
      expect(wrapper).toBeInTheDocument();
    });

    it("renders with square shape", () => {
      render(<Checkbox label="Square" shape="square" />);
      const wrapper = screen.getByText("Square").previousSibling;
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("renders with xs size", () => {
      render(<Checkbox label="XS" size="xs" />);
      expect(screen.getByText("XS")).toBeInTheDocument();
    });

    it("renders with sm size", () => {
      render(<Checkbox label="SM" size="sm" />);
      expect(screen.getByText("SM")).toBeInTheDocument();
    });

    it("renders with md size", () => {
      render(<Checkbox label="MD" size="md" />);
      expect(screen.getByText("MD")).toBeInTheDocument();
    });

    it("renders with lg size", () => {
      render(<Checkbox label="LG" size="lg" />);
      expect(screen.getByText("LG")).toBeInTheDocument();
    });
  });

  describe("Disabled State", () => {
    it("renders as disabled", () => {
      render(<Checkbox label="Disabled" disabled />);
      const checkbox = screen.getByLabelText("Disabled") as HTMLInputElement;
      expect(checkbox.disabled).toBe(true);
    });

    it("renders as enabled", () => {
      render(<Checkbox label="Enabled" />);
      const checkbox = screen.getByLabelText("Enabled") as HTMLInputElement;
      expect(checkbox.disabled).toBe(false);
    });

    it("does not call onChange when disabled and clicked", async () => {
      render(<Checkbox label="Disabled" disabled onChange={mockHandler} />);
      const checkbox = screen.getByLabelText("Disabled") as HTMLInputElement;
      await checkbox.click();
      expect(mockHandler).not.toHaveBeenCalled();
    });
  });

  describe("onChange onBlur onClick events", () => {
    it("calls onChange when clicked", async () => {
      render(<Checkbox label="Clickable" onChange={mockHandler} />);
      const checkbox = screen.getByLabelText("Clickable") as HTMLInputElement;
      await checkbox.click();
      expect(mockHandler).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur when blurred", async () => {
      render(<Checkbox label="Blurable" onBlur={mockHandler} />);
      const checkbox = screen.getByLabelText("Blurable") as HTMLInputElement;
      checkbox.focus();
      checkbox.blur();
      expect(mockHandler).toHaveBeenCalledTimes(1);
    });

    it("calls onClick when clicked", async () => {
      render(<Checkbox label="Clickable" onClick={mockHandler} />);
      const checkbox = screen.getByLabelText("Clickable") as HTMLInputElement;
      await checkbox.click();
      expect(mockHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe("Native Props", () => {
    it("accepts name prop", () => {
      render(<Checkbox label="Named" name="test-name" />);
      const checkbox = screen.getByLabelText("Named") as HTMLInputElement;
      expect(checkbox.name).toBe("test-name");
    });

    it("accepts value prop", () => {
      render(<Checkbox label="Valued" value="test-value" />);
      const checkbox = screen.getByLabelText("Valued") as HTMLInputElement;
      expect(checkbox.value).toBe("test-value");
    });

    it("accepts id prop", () => {
      render(<Checkbox label="ID" id="test-id" />);
      const checkbox = screen.getByLabelText("ID") as HTMLInputElement;
      expect(checkbox.id).toBe("test-id");
    });
  });
});
