import Image, { type ImageProps } from "next/image";
import type { ReactNode } from "react";
import { Caption } from "./Caption";

type FullBleedImageProps = ImageProps & {
  caption?: ReactNode;
  figureClassName?: string;
};

export function FullBleedImage({
  alt,
  caption,
  className = "",
  figureClassName = "",
  sizes = "100vw",
  ...imageProps
}: FullBleedImageProps) {
  return (
    <figure
      className={`relative left-1/2 w-screen -translate-x-1/2 ${figureClassName}`}
    >
      <Image
        alt={alt}
        className={`h-auto w-full object-cover ${className}`}
        sizes={sizes}
        {...imageProps}
      />
      {caption ? (
        <div className="px-[var(--container-gutter)]">
          <Caption>{caption}</Caption>
        </div>
      ) : null}
    </figure>
  );
}
