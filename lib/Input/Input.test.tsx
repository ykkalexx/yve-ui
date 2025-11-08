import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";

describe(`Component: ${Input.displayName}`, () => {
  const mockHandler = vi.fn();

  beforeEach(() => {
    mockHandler.mockClear();
  });

  describe("Basic Rendering", () => {
    it("renders with placeholder", () => {
      render(<Input placeholder="Type here..." />);
      expect(screen.getByPlaceholderText("Type here...")).toBeInTheDocument();
    });

    it("applies type, size, shape data attributes", () => {
      render(<Input type="text" size="sm" shape="rounded" placeholder="text" />);
      const wrapper = screen.getByPlaceholderText("text").parentElement;
      expect(wrapper).toHaveClass("text-[13px]");
      expect(wrapper).toHaveClass("rounded-md");
    });

    it("forwards ref", () => {
      const ref = { current: null as HTMLInputElement | null };
      render(<Input ref={ref} placeholder="Ref test" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it("renders with custom className", () => {
      render(<Input className="custom-class" placeholder="custom" />);
      const wrapper = screen.getByPlaceholderText("custom").parentElement;
      expect(wrapper).toHaveClass("custom-class");
    });
  });

  describe("Icon Rendering", () => {
    const startIcon = <svg data-testid="start-icon" />;
    const endIcon = <svg data-testid="end-icon" />;

    it("renders without icons by default", () => {
      render(<Input placeholder="No icons" />);
      expect(screen.queryByTestId("start-icon")).not.toBeInTheDocument();
      expect(screen.queryByTestId("end-icon")).not.toBeInTheDocument();
    });

    it("renders with startIcon only", () => {
      render(<Input startIcon={startIcon} placeholder="Start icon" />);
      expect(screen.getByTestId("start-icon")).toBeInTheDocument();
      expect(screen.queryByTestId("end-icon")).not.toBeInTheDocument();
    });

    it("renders with endIcon only", () => {
      render(<Input endIcon={endIcon} placeholder="End icon" />);
      expect(screen.getByTestId("end-icon")).toBeInTheDocument();
      expect(screen.queryByTestId("start-icon")).not.toBeInTheDocument();
    });

    it("renders with both startIcon and endIcon", () => {
      render(<Input startIcon={startIcon} endIcon={endIcon} placeholder="Both icons" />);
      expect(screen.getByTestId("start-icon")).toBeInTheDocument();
      expect(screen.getByTestId("end-icon")).toBeInTheDocument();
    });

    it("normalizes icon sizes when iconSize specified", () => {
      const icon = <svg viewBox="0 0 10 10" />;
      render(<Input startIcon={icon} iconSize={24} placeholder="Icon size" />);
      const wrapper = screen.getByPlaceholderText("Icon size").parentElement;
      const svg = wrapper?.querySelector("svg");
      expect(svg).toHaveAttribute("width", "24");
      expect(svg).toHaveAttribute("height", "24");
    });

    it("normalizes endIcon size when iconSize specified", () => {
      const icon = <svg viewBox="0 0 10 10" data-testid="end-sized-icon" />;
      render(<Input endIcon={icon} iconSize={20} placeholder="End icon size" />);
      const wrapper = screen.getByPlaceholderText("End icon size").parentElement;
      const svg = wrapper?.querySelector("svg");
      expect(svg).toHaveAttribute("width", "20");
      expect(svg).toHaveAttribute("height", "20");
    });
  });

  describe("Input Types", () => {
    it("renders text input by default", () => {
      render(<Input placeholder="text" />);
      expect(screen.getByPlaceholderText("text")).toHaveAttribute("type", "text");
    });

    it("renders password input", () => {
      render(<Input type="password" placeholder="password" />);
      expect(screen.getByPlaceholderText("password")).toHaveAttribute("type", "password");
    });

    it("renders email input", () => {
      render(<Input type="email" placeholder="email" />);
      expect(screen.getByPlaceholderText("email")).toHaveAttribute("type", "email");
    });

    it("renders number input", () => {
      render(<Input type="number" placeholder="number" />);
      expect(screen.getByPlaceholderText("number")).toHaveAttribute("type", "number");
    });
  });

  describe("Label", () => {
    it("renders without label by default", () => {
      render(<Input placeholder="no label" />);
      expect(screen.queryByRole("label")).not.toBeInTheDocument();
    });

    it("renders with label", () => {
      render(<Input label="Email" placeholder="email" />);
      expect(screen.getByText("Email")).toBeInTheDocument();
    });
  });

  describe("Disabled State", () => {
    it("is not disabled by default", () => {
      render(<Input placeholder="enabled" />);
      expect(screen.getByPlaceholderText("enabled")).not.toBeDisabled();
    });

    it("can be disabled", () => {
      render(<Input disabled placeholder="disabled" />);
      expect(screen.getByPlaceholderText("disabled")).toBeDisabled();
    });

    it("applies disabled styles to wrapper", () => {
      render(<Input disabled placeholder="disabled" />);
      const wrapper = screen.getByPlaceholderText("disabled").parentElement;
      expect(wrapper).toHaveClass("opacity-50");
      expect(wrapper).toHaveClass("cursor-not-allowed");
    });
  });

  describe("Value and onChange", () => {
    it("handles controlled value", () => {
      render(<Input value="test value" onChange={mockHandler} placeholder="controlled" />);
      expect(screen.getByPlaceholderText("controlled")).toHaveValue("test value");
    });

    it("fires onChange event", () => {
      render(<Input onChange={mockHandler} placeholder="change test" />);
      const input = screen.getByPlaceholderText("change test");
      fireEvent.change(input, { target: { value: "new value" } });
      expect(mockHandler).toHaveBeenCalledTimes(1);
    });

    it("handles input without onChange gracefully", () => {
      render(<Input placeholder="no handler" />);
      const input = screen.getByPlaceholderText("no handler");
      expect(() => fireEvent.change(input, { target: { value: "test" } })).not.toThrow();
    });
  });

  describe("Layout Props", () => {
    it("is not full width by default", () => {
      render(<Input placeholder="not full" />);
      const wrapper = screen.getByPlaceholderText("not full").parentElement;
      expect(wrapper).not.toHaveClass("w-full");
    });

    it("applies fullWidth class", () => {
      render(<Input fullWidth placeholder="full" />);
      const wrapper = screen.getByPlaceholderText("full").parentElement;
      expect(wrapper).toHaveClass("w-full");
    });
  });

  describe("Sizes", () => {
    it("applies extra small size", () => {
      render(<Input size="xs" placeholder="xs" />);
      const wrapper = screen.getByPlaceholderText("xs").parentElement;
      expect(wrapper).toHaveClass("text-[12px]");
      expect(wrapper).toHaveClass("px-2");
    });

    it("applies small size", () => {
      render(<Input size="sm" placeholder="sm" />);
      const wrapper = screen.getByPlaceholderText("sm").parentElement;
      expect(wrapper).toHaveClass("text-[13px]");
      expect(wrapper).toHaveClass("px-3");
    });

    it("applies medium size by default", () => {
      render(<Input placeholder="md" />);
      const wrapper = screen.getByPlaceholderText("md").parentElement;
      expect(wrapper).toHaveClass("text-[14px]");
      expect(wrapper).toHaveClass("px-4");
    });

    it("applies large size", () => {
      render(<Input size="lg" placeholder="lg" />);
      const wrapper = screen.getByPlaceholderText("lg").parentElement;
      expect(wrapper).toHaveClass("text-[16px]");
      expect(wrapper).toHaveClass("px-5");
    });
  });

  describe("Shapes", () => {
    it("applies pill shape by default", () => {
      render(<Input placeholder="pill" />);
      const wrapper = screen.getByPlaceholderText("pill").parentElement;
      expect(wrapper).toHaveClass("rounded-full");
    });

    it("applies rounded shape", () => {
      render(<Input shape="rounded" placeholder="rounded" />);
      const wrapper = screen.getByPlaceholderText("rounded").parentElement;
      expect(wrapper).toHaveClass("rounded-md");
    });

    it("applies square shape", () => {
      render(<Input shape="square" placeholder="square" />);
      const wrapper = screen.getByPlaceholderText("square").parentElement;
      expect(wrapper).toHaveClass("rounded-none");
    });
  });
});
