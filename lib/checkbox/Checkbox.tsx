import { forwardRef } from "react";
import clsx from "clsx";
import { IconCheck } from "@tabler/icons-react";
import { shapeStyles, sizeStyles, type Shape, type Size } from "../shared";

interface BaseProps {
  className?: string;
  label?: string;
  labelPosition?: "left" | "right";
  shape?: Shape;
  size?: Size;
  disabled?: boolean;
}

type NativeCheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;
export type CheckboxProps = BaseProps & Omit<NativeCheckboxProps, "size">;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { className, label, labelPosition = "right", shape = "pill", size = "sm", disabled = false, checked, ...rest },
    ref
  ) => {
    const checkboxElement = (
      <span
        className={clsx(
          "relative flex items-center justify-center border border-[#424242]/60 transition-all",
          sizeStyles[size],
          shapeStyles[shape],
          checked && "bg-[#424242] border-[#424242]",
          className
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          className="absolute inset-0 opacity-0 cursor-pointer"
          disabled={disabled}
          checked={checked}
          {...rest}
        />
        <IconCheck
          className={clsx("transition-opacity", checked ? "opacity-100" : "opacity-0")}
          size={16}
          stroke={3}
          color="white"
        />
      </span>
    );

    const labelElement = label ? <span className="font-light text-sm text-black">{label}</span> : null;

    return (
      <label
        className={clsx(
          "inline-flex items-center gap-2 cursor-pointer select-none",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {labelPosition === "left" && labelElement}
        {checkboxElement}
        {labelPosition === "right" && labelElement}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
