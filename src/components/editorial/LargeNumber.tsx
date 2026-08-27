import type { ComponentPropsWithoutRef, ReactNode } from "react";

type LargeNumberProps = Omit<ComponentPropsWithoutRef<"p">, "children"> & {
  children: ReactNode;
  label?: string;
};

export function LargeNumber({
  children,
  className = "",
  label,
  ...props
}: LargeNumberProps) {
  return (
    <p
      aria-label={label}
      className={`font-english text-[length:var(--text-display)] leading-none font-medium tracking-[var(--tracking-display)] tabular-nums ${className}`}
      lang="en"
      {...props}
    >
      {children}
    </p>
  );
}
