"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";
import {
  resetMotionElements,
  revealY,
  staggerY,
} from "@/components/fashion-visual/fashionVisualMotion";

import styles from "./FashionVisualMood.module.css";

export function FashionVisualMood() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const visualsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const eyebrow = eyebrowRef.current;
    const statement = statementRef.current;
    const visuals = visualsRef.current;

    if (!section || !eyebrow || !statement || !visuals) return;

    const figures = Array.from(visuals.children) as HTMLElement[];
    const motionElements = [eyebrow, statement, ...figures];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        resetMotionElements(motionElements);
        return;
      }

      revealY(eyebrow, { y: 20, duration: 0.8, start: "top 88%" });
      revealY(statement, { y: 24, duration: 0.85, start: "top 86%" });
      staggerY(figures, {
        y: 36,
        duration: 1.05,
        stagger: 0.16,
        trigger: visuals,
        start: "top 84%",
        ease: "power3.out",
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="fashion-visual-mood-title"
    >
      <div className={styles.inner}>
        <p ref={eyebrowRef} className={styles.eyebrow}>
          02 / THE MOOD
        </p>

        <div className={styles.content}>
          <h2
            ref={statementRef}
            id="fashion-visual-mood-title"
            className={styles.statement}
          >
            <span>
              A quiet afternoon,
              <br />
              dressed in something soft.
            </span>
          </h2>
          <div ref={visualsRef} className={styles.visuals}>
            <figure className={styles.leftFigure}>
              <div className={styles.leftImageWrap}>
                <Image
                  src="/media/fashion-visual/mood-01.png"
                  alt="화이트 블라우스를 착용한 모델의 빈티지 패션 포트레이트"
                  width={560}
                  height={720}
                  unoptimized
                  sizes="(max-width: 767px) 100vw, 560px"
                  className={styles.image}
                />
              </div>
              <figcaption className={styles.caption}>
                <strong>Japanese Vintage Mood</strong>
                <span>Natural / Feminine / Nostalgic</span>
              </figcaption>
            </figure>
            <figure className={styles.rightFigure}>
              <div className={styles.rightImageWrap}>
                <Image
                  src="/media/fashion-visual/mood-02.png"
                  alt="빈티지한 방에서 자연스럽게 앉아 있는 모델의 패션 무드 컷"
                  width={640}
                  height={800}
                  unoptimized
                  sizes="(max-width: 767px) 100vw, 640px"
                  className={styles.image}
                />
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
