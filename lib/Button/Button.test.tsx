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
});
