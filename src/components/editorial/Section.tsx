import type { ComponentPropsWithoutRef } from "react";
import { Container } from "./Container";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  container?: "default" | "reading" | "full" | false;
};

export function Section({
  children,
  className = "",
  container = "default",
  ...props
}: SectionProps) {
  return (
    <section className={`py-[var(--section-space)] ${className}`} {...props}>
      {container ? (
        <Container size={container}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}
