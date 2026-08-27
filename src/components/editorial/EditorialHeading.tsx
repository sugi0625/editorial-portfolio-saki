import type { ComponentPropsWithoutRef } from "react";

type HeadingLevel = 1 | 2 | 3;

type EditorialHeadingProps = Omit<
  ComponentPropsWithoutRef<"h2">,
  "children"
> & {
  children: React.ReactNode;
  level?: HeadingLevel;
  size?: "display" | "h1" | "h2" | "h3";
};

const sizes = {
  display:
    "text-[length:var(--text-display)] leading-[var(--leading-display)] tracking-[var(--tracking-display)]",
  h1: "text-[length:var(--text-heading-1)] leading-[var(--leading-heading)] tracking-[var(--tracking-heading)]",
  h2: "text-[length:var(--text-heading-2)] leading-[var(--leading-heading)] tracking-[var(--tracking-heading)]",
  h3: "text-[length:var(--text-heading-3)] leading-[var(--leading-heading)] tracking-[var(--tracking-heading)]",
} as const;

export function EditorialHeading({
  children,
  className = "",
  level = 2,
  size = "h2",
  ...props
}: EditorialHeadingProps) {
  const Heading = `h${level}` as const;

  return (
    <Heading
      className={`font-medium text-balance ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Heading>
  );
}
