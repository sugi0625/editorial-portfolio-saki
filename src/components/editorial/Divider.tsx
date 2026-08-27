import type { ComponentPropsWithoutRef } from "react";

export function Divider({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"hr">) {
  return (
    <hr
      className={`m-0 w-full border-0 border-t border-solid border-[var(--color-line)] ${className}`}
      {...props}
    />
  );
}
