import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Radio } from "./Radio";

describe(`Component: ${Radio.displayName}`, () => {
  const mockHandler = vi.fn();

  beforeEach(() => {
    mockHandler.mockClear();
  });

  describe("Basic Rendering", () => {
    it("renders with right label", () => {
      render(<Radio label="Option 1" labelPosition="right" />);
      expect(screen.getByText("Option 1")).toBeInTheDocument();
    });

    it("renders with left label", () => {
      render(<Radio label="Option 1" labelPosition="left" />);
      expect(screen.getByText("Option 1")).toBeInTheDocument();
    });

    it("renders with no label", () => {
      render(<Radio label="Option 1" />);
      expect(screen.getByText("Option 1")).toBeInTheDocument();
    });

    it("forwards ref", () => {
      const ref = { current: null as HTMLInputElement | null };
      render(<Radio ref={ref} label="Forward ref" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe("States", () => {
    it("renders as disabled", () => {
      render(<Radio label="Disavbled" disabled />);
      const radio = screen.getByLabelText("Disavbled") as HTMLInputElement;
      expect(radio.disabled).toBe(true);
    });

    it("renders as enabled", () => {
      render(<Radio label="Enabled" />);
      const radio = screen.getByLabelText("Enabled") as HTMLInputElement;
      expect(radio.disabled).toBe(false);
    });

    it("renders as checked", () => {
      render(<Radio label="Checked" checked />);
      const radio = screen.getByLabelText("Checked") as HTMLInputElement;
      expect(radio.checked).toBe(true);
    });

    it("renders as unchecked", () => {
      render(<Radio label="Unchecked" />);
      const radio = screen.getByLabelText("Unchecked") as HTMLInputElement;
      expect(radio.checked).toBe(false);
    });
  });

  describe("Native Props", () => {
    it("accepts name prop", () => {
      render(<Radio label="With Name" name="test-radio" />);
      const radio = screen.getByLabelText("With Name") as HTMLInputElement;
      expect(radio.name).toBe("test-radio");
    });

    it("accepts value prop", () => {
      render(<Radio label="With Value" value="radio-value" />);
      const radio = screen.getByLabelText("With Value") as HTMLInputElement;
      expect(radio.value).toBe("radio-value");
    });

    it("accepts onChange prop", () => {
      render(<Radio label="With onChange" onChange={mockHandler} />);
      const radio = screen.getByLabelText("With onChange") as HTMLInputElement;
      radio.click();
      expect(mockHandler).toHaveBeenCalledTimes(1);
    });

    it("accepts onBlur prop", () => {
      render(<Radio label="With onBlur" onBlur={mockHandler} />);
      const radio = screen.getByLabelText("With onBlur") as HTMLInputElement;
      radio.focus();
      radio.blur();
      expect(mockHandler).toHaveBeenCalledTimes(1);
    });

    it("accepts onClick prop", () => {
      render(<Radio label="With onClick" onClick={mockHandler} />);
      const radio = screen.getByLabelText("With onClick") as HTMLInputElement;
      radio.click();
      expect(mockHandler).toHaveBeenCalledTimes(1);
    });
  });
});
