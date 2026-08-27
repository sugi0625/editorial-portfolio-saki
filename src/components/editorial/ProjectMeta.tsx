import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type ProjectMetaItem = {
  label: string;
  value: ReactNode;
};

type ProjectMetaProps = Omit<ComponentPropsWithoutRef<"dl">, "children"> & {
  items: readonly ProjectMetaItem[];
};

export function ProjectMeta({
  items,
  className = "",
  ...props
}: ProjectMetaProps) {
  return (
    <dl
      className={`grid grid-cols-1 gap-x-[var(--grid-gap)] gap-y-[var(--space-4)] border-t border-[var(--color-line)] pt-[var(--space-2)] sm:grid-cols-2 lg:grid-cols-4 ${className}`}
      {...props}
    >
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-[length:var(--text-caption)] tracking-[var(--tracking-caption)] text-[var(--color-ink-muted)] uppercase">
            {item.label}
          </dt>
          <dd className="mt-[var(--space-1)] text-[length:var(--text-body)]">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
