import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  size?: "default" | "reading" | "full";
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const widths = {
  default:
    "ml-[max(var(--container-gutter),calc((100vw-var(--container-max))/2))] mr-0 w-[min(calc(100vw-(var(--container-gutter)*2)),var(--container-max))] max-w-none",
  reading:
    "w-[calc(100%-(var(--container-gutter)*2))] max-w-[var(--container-reading)]",
  full: "w-full max-w-none",
} as const;

export function Container<T extends ElementType = "div">({
  as,
  children,
  className = "",
  size = "default",
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component className={`mx-auto ${widths[size]} ${className}`} {...props}>
      {children}
    </Component>
  );
}
