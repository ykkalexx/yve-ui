import React, { type ReactNode } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  className?: string;
}

export const Button = ({ children, onClick, variant, className }: ButtonProps): ReactNode => {
  const variantClasses = {
    primary: "text-white bg-[#424242] hover:bg-[#4a4a4a] active:scale-[0.98] transition-all duration-200 ease-out",
    secondary:
      "bg-[#FFFFFF] text-black hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 ease-out border border-gray-200",
    ghost: "hover:bg-gray-100 text-white active:scale-[0.98] transition-all duration-200 ease-out",
    danger: "bg-red-500 text-white hover:bg-red-600 active:scale-[0.98] transition-all duration-200 ease-out",
  };

  return (
    <button
      className={`font-light px-6 py-3 rounded-full cursor-pointer ${
        variantClasses[variant || "primary"]
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
