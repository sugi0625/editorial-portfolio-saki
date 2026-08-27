import type { ComponentPropsWithoutRef } from "react";

type EditorialParagraphProps = ComponentPropsWithoutRef<"p"> & {
  size?: "body" | "lead";
};

export function EditorialParagraph({
  children,
  className = "",
  size = "body",
  ...props
}: EditorialParagraphProps) {
  const sizeClass =
    size === "lead"
      ? "text-[length:var(--text-body-lg)]"
      : "text-[length:var(--text-body)]";

  return (
    <p
      className={`max-w-[var(--container-reading)] leading-[var(--leading-body)] tracking-[var(--tracking-body)] text-pretty ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}
