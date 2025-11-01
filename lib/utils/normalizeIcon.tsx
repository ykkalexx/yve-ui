import { type ReactNode, isValidElement, cloneElement } from "react";
import clsx from "clsx";

interface IconElementProps {
  className?: string;
  width?: number;
  height?: number;
  focusable?: string;
  ["aria-hidden"]?: boolean;
}

export function normalizeIcon(node: ReactNode, size: number | undefined, extraClass: string) {
  if (!node) return null;
  if (isValidElement<IconElementProps>(node)) {
    const next: Partial<IconElementProps> = {
      className: clsx(node.props.className, extraClass),
      "aria-hidden": node.props["aria-hidden"] ?? true,
    };
    if (size && node.props.width == null) next.width = size;
    if (size && node.props.height == null) next.height = size;
    if (node.type === "svg") next.focusable = "false";
    return cloneElement(node, next);
  }
  return <span className={extraClass}>{node}</span>;
}
