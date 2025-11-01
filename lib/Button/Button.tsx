import React, { type ReactNode } from "react";

interface ButtonProps {
  children: React.ReactNode;
}

export const Button = ({ children }: ButtonProps): ReactNode => {
  return <button>{children}</button>;
};
