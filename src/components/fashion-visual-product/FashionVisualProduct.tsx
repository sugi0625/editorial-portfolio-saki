"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";
import {
  resetMotionElements,
  revealY,
  staggerY,
} from "@/components/fashion-visual/fashionVisualMotion";

import styles from "./FashionVisualProduct.module.css";

const points = [
  {
    title: "PETER COLLAR",
    description: "부드러운 라운드 칼라",
  },
  {
    title: "PUFF SLEEVE",
    description: "자연스러운 볼륨 소매",
  },
  {
    title: "SOFT TEXTURE",
    description: "잔잔한 세로 텍스처",
  },
];

export function FashionVisualProduct() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const eyebrow = eyebrowRef.current;
    const header = headerRef.current;
    const image = imageRef.current;
    const points = pointsRef.current;

    if (!section || !eyebrow || !header || !image || !points) return;

    const pointElements = Array.from(points.children) as HTMLElement[];
    const motionElements = [eyebrow, header, image, ...pointElements];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        resetMotionElements(motionElements);
        return;
      }

      revealY(eyebrow, { y: 20, duration: 0.8, start: "top 88%" });
      revealY(header, { y: 28, duration: 0.9, start: "top 86%" });
      revealY(image, {
        y: 40,
        duration: 1.1,
        start: "top 84%",
        ease: "power3.out",
      });
      staggerY(pointElements, {
        y: 18,
        duration: 0.8,
        stagger: 0.12,
        trigger: points,
        start: "top 88%",
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="fashion-visual-product-title"
    >
      <div className={styles.inner}>
        <p ref={eyebrowRef} className={styles.eyebrow}>
          03 / THE LOOK
        </p>

        <div className={styles.content}>
          <div ref={headerRef} className={styles.header}>
            <div>
              <h2 id="fashion-visual-product-title" className={styles.title}>
                SOFT PETER BLOUSE
              </h2>
              <p className={styles.description}>
                둥근 칼라와 잔잔한 텍스처,
                <br />
                가볍게 떨어지는 실루엣.
              </p>
            </div>
            <p className={styles.color}>COLOR / WHITE</p>
          </div>
          <div className={styles.productVisual}>
            <div ref={imageRef} className={styles.imageWrap}>
              <Image
                src="/media/fashion-visual/product.png"
                alt="화이트 피터팬 칼라 블라우스의 상품 중심 패션 비주얼"
                width={920}
                height={720}
                unoptimized
                sizes="(max-width: 767px) 100vw, 920px"
                className={styles.image}
              />
            </div>
            <div ref={pointsRef} className={styles.points}>
              {points.map((point) => (
                <div className={styles.point} key={point.title}>
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
