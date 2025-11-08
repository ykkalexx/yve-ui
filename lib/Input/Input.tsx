import clsx from "clsx";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { shapeStyles, sizeStyles, type Shape, type Size } from "../shared";
import { normalizeIcon } from "../utils";

interface BaseProps {
  className?: string;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  label?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loadingIcon?: ReactNode;
  iconSize?: number;
  shape?: Shape;
  size?: Size;
}

type NativeInputProps = InputHTMLAttributes<HTMLInputElement>;
export type InputProps = BaseProps & Omit<NativeInputProps, "type" | "disabled" | "onChange" | "value" | "size">;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      startIcon,
      endIcon,
      iconSize,
      label,
      fullWidth = false,
      disabled = false,
      className,
      type = "text",
      placeholder = "Type here...",
      value,
      onChange,
      shape = "pill",
      size = "md",
      ...rest
    },
    ref
  ) => {
    const start = startIcon ? (
      <span className="inline-flex shrink-0 mr-2">{normalizeIcon(startIcon, iconSize, "inline-block")}</span>
    ) : null;

    const end = endIcon ? (
      <span className="inline-flex shrink-0 ml-2">{normalizeIcon(endIcon, iconSize, "inline-block")}</span>
    ) : null;

    return (
      <div className={clsx("flex flex-col")}>
        {label && <label className="block text-sm mb-1">{label}</label>}
        <div
          className={clsx(
            "flex items-center bg-[#303030] font-light text-[#AFAFAF]",
            sizeStyles[size],
            shapeStyles[shape],
            { "w-full": fullWidth, "opacity-50 cursor-not-allowed": disabled },
            className
          )}
        >
          {start}
          <input
            ref={ref}
            className="flex-1 bg-transparent outline-none text-sm font-light text-[#AFAFAF]"
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onChange={onChange}
            {...rest}
          />
          {end}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";
