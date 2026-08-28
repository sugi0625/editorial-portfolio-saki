"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";
import {
  resetMotionElements,
  revealY,
  staggerY,
} from "@/components/fashion-visual/fashionVisualMotion";

import styles from "./FashionVisualOpening.module.css";

export function FashionVisualOpening() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const roleRef = useRef<HTMLUListElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const eyebrow = eyebrowRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;
    const role = roleRef.current;
    const image = imageRef.current;

    if (!section || !eyebrow || !title || !description || !role || !image)
      return;

    const motionElements = [eyebrow, title, description, role, image];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        resetMotionElements(motionElements);
        return;
      }

      revealY(eyebrow, { y: 20, duration: 0.8, start: "top 88%" });
      revealY(title, { y: 32, duration: 0.95, start: "top 86%" });
      staggerY([description, role], {
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.1,
        trigger: description,
        start: "top 88%",
      });
      revealY(image, {
        y: 40,
        duration: 1.1,
        delay: 0.22,
        start: "top 86%",
        ease: "power3.out",
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="fashion-visual-opening-title"
    >
      <div className={styles.inner}>
        <p ref={eyebrowRef} className={styles.eyebrow}>
          FASHION VISUAL / 2026
        </p>

        <div className={styles.content}>
          <div className={styles.copy}>
            <h2
              ref={titleRef}
              id="fashion-visual-opening-title"
              className={styles.title}
            >
              <span>SOFT</span>
              <span>PETER</span>
              <span>BLOUSE</span>
            </h2>

            <div className={styles.line} />

            <p ref={descriptionRef} className={styles.description}>
              Vintage mood,
              <br />
              soft silhouette.
            </p>

            <ul ref={roleRef} className={styles.role}>
              <li>VISUAL DIRECTION</li>
              <li>AI IMAGE GENERATION</li>
              <li>PHOTOSHOP RETOUCH</li>
              <li>EDITORIAL DESIGN</li>
            </ul>
          </div>

          <div ref={imageRef} className={styles.imageWrap}>
            <Image
              src="/media/fashion-visual/opening.png"
              alt="화이트 피터팬 칼라 블라우스와 블랙 스커트를 착용한 패션 비주얼"
              width={1024}
              height={1536}
              unoptimized
              sizes="(max-width: 767px) 100vw, 800px"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
