export type Size = "xs" | "sm" | "md" | "lg";
export type Shape = "rounded" | "pill" | "square";

export const sizeStyles: Record<Size, string> = {
  xs: "text-[12px] px-2 py-1",
  sm: "text-[13px] px-3 py-1.5",
  md: "text-[14px] px-4 py-2",
  lg: "text-[16px] px-5 py-2.5",
};

export const shapeStyles: Record<Shape, string> = {
  rounded: "rounded-md",
  pill: "rounded-full",
  square: "rounded-none",
};
