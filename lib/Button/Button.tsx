import React, { type ReactNode } from "react";

interface ButtonProps {
  children: React.ReactNode;
}

export const Button = ({ children }: ButtonProps): ReactNode => {
  return <button className="text-white bg-[#424242] font-light px-6 py-3 rounded-full">{children}</button>;
};
