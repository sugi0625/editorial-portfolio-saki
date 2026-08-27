import type { ComponentPropsWithoutRef } from "react";

export function Caption({
  children,
  className = "",
  ...props
}: ComponentPropsWithoutRef<"figcaption">) {
  return (
    <figcaption
      className={`mt-[var(--space-2)] text-[length:var(--text-caption)] leading-[var(--leading-caption)] tracking-[var(--tracking-caption)] text-[var(--color-ink-muted)] ${className}`}
      {...props}
    >
      {children}
    </figcaption>
  );
}
