"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";
import {
  resetMotionElements,
  revealY,
  staggerY,
} from "@/components/fashion-visual/fashionVisualMotion";

import styles from "./FashionVisualStory.module.css";

export function FashionVisualStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const eyebrow = eyebrowRef.current;
    const image = imageRef.current;
    const caption = captionRef.current;

    if (!section || !eyebrow || !image || !caption) return;

    const captionElements = Array.from(caption.children) as HTMLElement[];
    const motionElements = [eyebrow, image, ...captionElements];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        resetMotionElements(motionElements);
        return;
      }

      revealY(eyebrow, { y: 20, duration: 0.8, start: "top 88%" });
      revealY(image, { y: 36, duration: 1.15, start: "top 84%" });
      staggerY(captionElements, {
        y: 22,
        duration: 0.8,
        stagger: 0.1,
        trigger: caption,
        start: "top 88%",
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="fashion-visual-story-title"
    >
      <div className={styles.inner}>
        <p ref={eyebrowRef} className={styles.eyebrow}>
          05 / VISUAL STORY
        </p>

        <div ref={imageRef} className={styles.imageWrap}>
          <Image
            src="/media/fashion-visual/visual-story.png"
            alt="빈티지한 공간의 창가 테이블에 앉아 있는 모델의 패션 비주얼"
            width={1680}
            height={945}
            unoptimized
            sizes="(max-width: 767px) 100vw, 1680px"
            className={styles.image}
          />
        </div>

        <div ref={captionRef} className={styles.caption}>
          <h2 id="fashion-visual-story-title" className={styles.title}>
            A LITTLE NOSTALGIA
          </h2>

          <p className={styles.description}>
            익숙한 듯 낯선 공간,
            <br />
            조용한 오후의 빈티지 무드.
          </p>
        </div>
      </div>
    </section>
  );
}
