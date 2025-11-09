import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe(`Component: ${Button.displayName}`, () => {
  const mockHandler = vi.fn();

  beforeEach(() => {
    mockHandler.mockClear();
  });

  describe("Basic Rendering", () => {
    it("renders children", () => {
      render(<Button>Text</Button>);
      expect(screen.getByRole("button")).toHaveTextContent("Text");
    });

    it("applies variant, size, shape data attributes", () => {
      render(
        <Button intent="danger" size="sm" shape="rounded">
          X
        </Button>
      );
      const btn = screen.getByRole("button");
      expect(btn).toHaveAttribute("data-variant", "danger");
      expect(btn).toHaveAttribute("data-size", "sm");
      expect(btn).toHaveAttribute("data-shape", "rounded");
    });

    it("forwards ref", () => {
      const ref = { current: null as HTMLButtonElement | null };
      render(<Button ref={ref}>Ref</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("renders with custom className", () => {
      render(<Button className="custom-class">Custom</Button>);
      expect(screen.getByRole("button")).toHaveClass("custom-class");
    });
  });

  describe("Icon Rendering", () => {
    const startIcon = <svg data-testid="start-icon" />;
    const endIcon = <svg data-testid="end-icon" />;

    it("renders without icons by default", () => {
      render(<Button>No Icons</Button>);
      const btn = screen.getByRole("button");
      expect(btn.querySelector(".shrink-0.mr-2")).not.toBeInTheDocument();
      expect(btn.querySelector(".shrink-0.ml-2")).not.toBeInTheDocument();
    });

    it("renders with startIcon only", () => {
      render(<Button startIcon={startIcon}>Start Only</Button>);
      expect(screen.getByTestId("start-icon")).toBeInTheDocument();
      expect(screen.queryByTestId("end-icon")).not.toBeInTheDocument();
    });

    it("renders with endIcon only", () => {
      render(<Button endIcon={endIcon}>End Only</Button>);
      expect(screen.getByTestId("end-icon")).toBeInTheDocument();
      expect(screen.queryByTestId("start-icon")).not.toBeInTheDocument();
    });

    it("renders with both startIcon and endIcon", () => {
      render(
        <Button startIcon={startIcon} endIcon={endIcon}>
          Both Icons
        </Button>
      );
      expect(screen.getByTestId("start-icon")).toBeInTheDocument();
      expect(screen.getByTestId("end-icon")).toBeInTheDocument();
    });

    it("normalizes icon sizes when iconSize specified", () => {
      const icon = <svg viewBox="0 0 10 10" />;
      render(
        <Button startIcon={icon} iconSize={24}>
          Icon Btn
        </Button>
      );
      const svg = screen.getByRole("button").querySelector("svg");
      expect(svg).toHaveAttribute("width", "24");
      expect(svg).toHaveAttribute("height", "24");
    });

    it("does not override existing icon explicit size", () => {
      const icon = <svg width={30} height={30} data-testid="icon" />;
      render(
        <Button startIcon={icon} iconSize={16}>
          Icon Btn
        </Button>
      );
      const svg = screen.getByTestId("icon");
      expect(svg).toHaveAttribute("width", "30");
      expect(svg).toHaveAttribute("height", "30");
    });
  });

  describe("Loading State", () => {
    const loadingIcon = <svg data-testid="spinner" />;

    it("uses custom loadingIcon when provided", () => {
      render(
        <Button loading loadingIcon={loadingIcon}>
          Load
        </Button>
      );
      expect(screen.getByTestId("spinner")).toBeInTheDocument();
    });

    it("does not render loading spinner when loading=false", () => {
      render(<Button loadingIcon={loadingIcon}>Not Loading</Button>);
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });

    it("does not show loading spinner when loading but no loadingIcon", () => {
      render(<Button loading>Loading No Icon</Button>);
      const btn = screen.getByRole("button");
      expect(btn.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument();
    });

    it("hides children text when loading", () => {
      render(<Button loading>Hidden Text</Button>);
      expect(screen.getByText("Hidden Text")).toHaveClass("opacity-0");
    });

    it("shows children text when not loading", () => {
      render(<Button>Visible Text</Button>);
      const textSpan = screen.getByText("Visible Text");
      expect(textSpan).toHaveClass("inline-block");
      expect(textSpan).not.toHaveClass("opacity-0");
    });

    it("sets aria-busy when loading", () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
    });

    it("does not set aria-busy when not loading", () => {
      render(<Button>Not Loading</Button>);
      expect(screen.getByRole("button")).not.toHaveAttribute("aria-busy");
    });

    it("applies cursor-progress class when loading", () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole("button")).toHaveClass("cursor-progress");
    });

    it("prevents clicks while loading", () => {
      render(
        <Button loading onClick={mockHandler}>
          Save
        </Button>
      );
      fireEvent.click(screen.getByRole("button"));
      expect(mockHandler).not.toHaveBeenCalled();
    });
  });

  describe("Click Interactions", () => {
    it("prevents clicks when disabled", () => {
      render(
        <Button disabled onClick={mockHandler}>
          Save
        </Button>
      );
      const btn = screen.getByRole("button");
      expect(btn).toBeDisabled();
      fireEvent.click(btn);
      expect(mockHandler).not.toHaveBeenCalled();
    });

    it("fires onClick when enabled", () => {
      render(<Button onClick={mockHandler}>Go</Button>);
      fireEvent.click(screen.getByRole("button"));
      expect(mockHandler).toHaveBeenCalledTimes(1);
    });

    it("handles button without onClick gracefully", () => {
      render(<Button>No Handler</Button>);
      expect(() => fireEvent.click(screen.getByRole("button"))).not.toThrow();
    });
  });

  describe("Polymorphic Rendering", () => {
    it("renders as button with type by default", () => {
      render(<Button type="submit">Submit</Button>);
      const btn = screen.getByRole("button");
      expect(btn).toHaveAttribute("type", "submit");
      expect(btn).not.toHaveAttribute("href");
    });

    it("does not render href when Component is button", () => {
      render(<Button href="/ignored">Button</Button>);
      expect(screen.getByRole("button")).not.toHaveAttribute("href");
    });

    it("renders as anchor with href when as='a'", () => {
      render(
        <Button as="a" href="/test">
          Link Button
        </Button>
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/test");
      expect(link).not.toHaveAttribute("type");
    });

    it("renders as anchor without href attribute", () => {
      render(<Button as="a">Link without href</Button>);
      const anchor = document.querySelector("a");
      expect(anchor).toBeInTheDocument();
      expect(anchor).not.toHaveAttribute("href");
    });

    it("does not render type attribute when Component is anchor", () => {
      render(
        <Button as="a" type="submit" href="/link">
          Link
        </Button>
      );
      expect(screen.getByRole("link")).not.toHaveAttribute("type");
    });
  });

  describe("Disabled State with Polymorphism", () => {
    it("supports polymorphic as='a' with aria-disabled", () => {
      render(
        <Button as="a" href="#" disabled>
          Link
        </Button>
      );
      const link = screen.getByRole("link");
      expect(link).not.toHaveAttribute("disabled");
      expect(link).toHaveAttribute("aria-disabled", "true");
    });

    it("does not disable anchor element when disabled=false", () => {
      render(
        <Button as="a" href="/test" disabled={false}>
          Enabled Link
        </Button>
      );
      const link = screen.getByRole("link");
      expect(link).not.toHaveAttribute("disabled");
      expect(link).not.toHaveAttribute("aria-disabled");
    });

    it("handles loading state on anchor element", () => {
      render(
        <Button as="a" href="/test" loading>
          Loading Link
        </Button>
      );
      const link = screen.getByRole("link");
      expect(link).not.toHaveAttribute("disabled");
      expect(link).toHaveAttribute("aria-disabled", "true");
      expect(link).toHaveAttribute("aria-busy", "true");
    });

    it("prevents default when clicking loading anchor", () => {
      render(
        <Button as="a" href="/test" loading onClick={mockHandler}>
          Loading Link
        </Button>
      );
      fireEvent.click(screen.getByRole("link"));
      expect(mockHandler).not.toHaveBeenCalled();
    });
  });

  describe("Layout Props", () => {
    it("applies fullWidth class", () => {
      render(<Button fullWidth>Full</Button>);
      expect(screen.getByRole("button")).toHaveClass("w-full");
    });

    it("does not apply fullWidth class when fullWidth is false", () => {
      render(<Button fullWidth={false}>Not Full</Button>);
      expect(screen.getByRole("button")).not.toHaveClass("w-full");
    });
  });
});
