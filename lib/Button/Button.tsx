import { forwardRef, type ReactNode, type ButtonHTMLAttributes, type ElementType, type MouseEvent } from "react";
import clsx from "clsx";
import { normalizeIcon } from "../utils/normalizeIcon";

type Intent = "primary" | "secondary" | "ghost" | "danger" | "outline" | "subtle";
type Size = "xs" | "sm" | "md" | "lg";
type Shape = "rounded" | "pill" | "square";

interface BaseProps {
  children: ReactNode;
  intent?: Intent;
  size?: Size;
  shape?: Shape;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loadingIcon?: ReactNode;
  iconSize?: number;
  className?: string;
  as?: ElementType;
  type?: "button" | "submit" | "reset";
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  "data-testid"?: string;
  href?: string;
}

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
export type ButtonProps = BaseProps & Omit<NativeButtonProps, "type" | "disabled" | "onClick">;

const intentStyles: Record<Intent, string> = {
  primary: "text-white bg-[#424242] hover:bg-[#4a4a4a]",
  secondary: "bg-white text-black border border-gray-200 hover:-translate-y-0.5",
  ghost: "bg-transparent text-[#424242] hover:bg-gray-100",
  danger: "bg-red-500 text-white hover:bg-red-600",
  outline: "border border-[#424242] text-[#424242] hover:bg-[#424242] hover:text-white",
  subtle: "bg-gray-50 text-[#424242] hover:bg-gray-100",
};

const sizeStyles: Record<Size, string> = {
  xs: "text-[12px] px-2 py-1",
  sm: "text-[13px] px-3 py-1.5",
  md: "text-[14px] px-4 py-2",
  lg: "text-[16px] px-5 py-2.5",
};

const shapeStyles: Record<Shape, string> = {
  rounded: "rounded-md",
  pill: "rounded-full",
  square: "rounded-none",
};

export const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      children,
      intent = "primary",
      size = "md",
      shape = "pill",
      loading = false,
      disabled = false,
      fullWidth = false,
      startIcon,
      endIcon,
      loadingIcon,
      iconSize,
      className,
      as,
      type = "button",
      onClick,
      href,
      ...rest
    },
    ref
  ) => {
    const Component: ElementType = as || "button";
    const isDisabled = disabled || loading;

    const start = startIcon ? (
      <span className="inline-flex shrink-0 mr-2">{normalizeIcon(startIcon, iconSize, "inline-block")}</span>
    ) : null;

    const end = endIcon ? (
      <span className="inline-flex shrink-0 ml-2">{normalizeIcon(endIcon, iconSize, "inline-block")}</span>
    ) : null;

    return (
      <Component
        ref={ref}
        href={Component === "a" ? href : undefined}
        type={Component === "button" ? type : undefined}
        className={clsx(
          "relative inline-flex items-center justify-center font-light px-6 py-3 select-none transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60",
          intentStyles[intent],
          sizeStyles[size],
          shapeStyles[shape],
          fullWidth && "w-full",
          loading && "cursor-progress",
          className
        )}
        data-variant={intent}
        data-size={size}
        data-shape={shape}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        disabled={Component === "button" ? isDisabled : undefined}
        onClick={(e: MouseEvent<HTMLElement>) => {
          if (loading) {
            e.preventDefault();
            return;
          }
          onClick?.(e);
        }}
        {...rest}
      >
        {start}
        <span className={loading ? "opacity-0" : "inline-block"}>{children}</span>
        {loading && loadingIcon && (
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            {normalizeIcon(loadingIcon, iconSize ?? 16, "animate-spin")}
          </span>
        )}
        {end}
      </Component>
    );
  }
);
Button.displayName = "Button";
