import { forwardRef } from "react";
import clsx from "clsx";

interface BaseProps {
  className?: string;
  label?: string;
  labelPosition?: "left" | "right";
  disabled?: boolean;
}

type NativeRadioProps = React.InputHTMLAttributes<HTMLInputElement>;
export type RadioProps = BaseProps & Omit<NativeRadioProps, "size">;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, labelPosition = "right", disabled = false, ...rest }, ref) => {
    const radioElement = (
      <input
        className={clsx(
          "w-4 h-4 accent-[#424242] cursor-pointer focus:ring-2 focus:ring-offset-1 focus:ring-black/40",
          className
        )}
        ref={ref}
        type="radio"
        disabled={disabled}
        {...rest}
      />
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
        {radioElement}
        {labelPosition === "right" && labelElement}
      </label>
    );
  }
);

Radio.displayName = "Radio";
