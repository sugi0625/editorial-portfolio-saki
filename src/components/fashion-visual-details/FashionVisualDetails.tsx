"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";
import {
  resetMotionElements,
  revealY,
  staggerY,
} from "@/components/fashion-visual/fashionVisualMotion";

import styles from "./FashionVisualDetails.module.css";

const detailItems = [
  {
    number: "01",
    title: "PETER COLLAR",
    src: "/media/fashion-visual/detail-collar.png",
    alt: "화이트 블라우스의 피터팬 칼라 디테일",
    width: 400,
    height: 560,
  },
  {
    number: "02",
    title: "PUFF SLEEVE",
    src: "/media/fashion-visual/detail-sleeve.png",
    alt: "화이트 블라우스의 퍼프 소매 디테일",
    width: 400,
    height: 560,
  },
  {
    number: "03",
    title: "SOFT TEXTURE",
    src: "/media/fashion-visual/detail-texture.png",
    alt: "화이트 블라우스의 세로 원단 텍스처 디테일",
    width: 400,
    height: 560,
  },
];

export function FashionVisualDetails() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const detailGridRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const eyebrow = eyebrowRef.current;
    const title = titleRef.current;
    const detailGrid = detailGridRef.current;
    const closing = closingRef.current;

    if (!section || !eyebrow || !title || !detailGrid || !closing) return;

    const detailCards = Array.from(detailGrid.children) as HTMLElement[];
    const closingGroups = Array.from(closing.children) as HTMLElement[];
    const motionElements = [eyebrow, title, ...detailCards, ...closingGroups];
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
      staggerY(detailCards, {
        y: 32,
        duration: 1,
        stagger: 0.14,
        trigger: detailGrid,
        start: "top 84%",
        ease: "power3.out",
      });
      staggerY(closingGroups, {
        y: 18,
        duration: 0.8,
        stagger: 0.12,
        trigger: closing,
        start: "top 88%",
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="fashion-visual-details-title"
    >
      <div className={styles.inner}>
        <p ref={eyebrowRef} className={styles.eyebrow}>
          06 / DETAILS
        </p>

        <div className={styles.content}>
          <h2
            ref={titleRef}
            id="fashion-visual-details-title"
            className={styles.title}
          >
            <span>SMALL THINGS</span>
            <span>MAKE THE LOOK.</span>
          </h2>
          <div ref={detailGridRef} className={styles.detailGrid}>
            {detailItems.map((item) => (
              <figure className={styles.detailItem} key={item.number}>
                <div className={styles.imageWrap}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    unoptimized
                    sizes="(max-width: 767px) 100vw, 400px"
                    className={styles.image}
                  />
                </div>
                <figcaption className={styles.caption}>
                  <span className={styles.number}>{item.number}</span>
                  <span className={styles.detailTitle}>{item.title}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div ref={closingRef} className={styles.closing}>
            <div className={styles.personal}>
              <p>PERSONAL WORK</p>
              <span>
                Base photography created
                <br />
                with generative AI.
              </span>
            </div>
            <div className={styles.roles}>
              <p>Visual Direction</p>
              <p>AI Image Generation</p>
              <p>Photoshop Retouch</p>
              <p>Editorial Design</p>
            </div>
            <div className={styles.project}>
              <h3>SOFT PETER BLOUSE</h3>
              <p>Fashion Visual Study / 2026</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
