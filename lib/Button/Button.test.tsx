import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe(`Component: ${Button.displayName}`, () => {
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

  it("uses custom loadingIcon when provided", () => {
    const custom = <svg data-testid="custom" />;
    render(
      <Button loading loadingIcon={custom}>
        Load
      </Button>
    );
    expect(screen.getByTestId("custom")).toBeInTheDocument();
    expect(screen.queryByLabelText("Loading")).toBeNull();
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

  it("prevents clicks while loading", () => {
    const handler = vi.fn();
    render(
      <Button loading onClick={handler}>
        Save
      </Button>
    );
    fireEvent.click(screen.getByRole("button"));
    expect(handler).not.toHaveBeenCalled();
  });

  it("prevents clicks when disabled", () => {
    const handler = vi.fn();
    render(
      <Button disabled onClick={handler}>
        Save
      </Button>
    );
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handler).not.toHaveBeenCalled();
  });

  it("fires onClick when enabled", () => {
    const handler = vi.fn();
    render(<Button onClick={handler}>Go</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("supports polymorphic as='a' without disabled attribute", () => {
    render(
      <Button as="a" href="#" disabled>
        Link
      </Button>
    );
    const link = screen.getByRole("link");
    expect(link).not.toHaveAttribute("disabled");
    expect(link).toHaveAttribute("aria-disabled", "true");
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("applies fullWidth class", () => {
    render(<Button fullWidth>Full</Button>);
    expect(screen.getByRole("button")).toHaveClass("w-full");
  });

  it("renders without startIcon", () => {
    render(<Button>No Icon</Button>);
    const btn = screen.getByRole("button");
    expect(btn.querySelector(".shrink-0.mr-2")).not.toBeInTheDocument();
  });

  it("renders without endIcon", () => {
    render(<Button>No End Icon</Button>);
    const btn = screen.getByRole("button");
    expect(btn.querySelector(".shrink-0.ml-2")).not.toBeInTheDocument();
  });

  it("renders with endIcon", () => {
    const icon = <svg data-testid="end-icon" />;
    render(<Button endIcon={icon}>With End</Button>);
    expect(screen.getByTestId("end-icon")).toBeInTheDocument();
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

  it("renders as button with type when as is not specified", () => {
    render(<Button type="submit">Submit</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("type", "submit");
    expect(btn).not.toHaveAttribute("href");
  });

  it("does not render href when Component is button", () => {
    render(<Button href="/ignored">Button</Button>);
    const btn = screen.getByRole("button");
    expect(btn).not.toHaveAttribute("href");
  });

  it("does not render type attribute when Component is anchor", () => {
    render(
      <Button as="a" type="submit" href="/link">
        Link
      </Button>
    );
    const link = screen.getByRole("link");
    expect(link).not.toHaveAttribute("type");
  });

  it("does not render loading spinner when loading=false", () => {
    render(<Button loadingIcon={<svg data-testid="spinner" />}>Not Loading</Button>);
    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
  });

  it("renders loading spinner only when both loading=true and loadingIcon provided", () => {
    render(
      <Button loading loadingIcon={<svg data-testid="spinner" />}>
        Loading
      </Button>
    );
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("does not show loading spinner when loading but no loadingIcon", () => {
    render(<Button loading>Loading No Icon</Button>);
    const btn = screen.getByRole("button");
    expect(btn.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument();
  });

  it("hides children text when loading", () => {
    render(<Button loading>Hidden Text</Button>);
    const textSpan = screen.getByText("Hidden Text");
    expect(textSpan).toHaveClass("opacity-0");
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

  it("does not apply cursor-progress class when not loading", () => {
    render(<Button>Not Loading</Button>);
    expect(screen.getByRole("button")).not.toHaveClass("cursor-progress");
  });

  it("allows onClick to be called when not loading", () => {
    const handler = vi.fn();
    render(<Button onClick={handler}>Click Me</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("handles button without onClick gracefully", () => {
    render(<Button>No Handler</Button>);
    expect(() => fireEvent.click(screen.getByRole("button"))).not.toThrow();
  });
});
