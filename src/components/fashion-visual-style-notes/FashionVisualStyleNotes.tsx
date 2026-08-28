"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";
import {
  resetMotionElements,
  revealY,
  staggerY,
} from "@/components/fashion-visual/fashionVisualMotion";

import styles from "./FashionVisualStyleNotes.module.css";

const styleItems = [
  {
    number: "01",
    title: "PETER COLLAR",
    caption: "Soft & Feminine",
    src: "/media/fashion-visual/style-collar.png",
    alt: "화이트 피터팬 칼라 블라우스",
  },
  {
    number: "02",
    title: "BLACK SKIRT",
    caption: "Natural Volume",
    src: "/media/fashion-visual/style-skirt.png",
    alt: "블랙 볼륨 스커트",
  },
  {
    number: "03",
    title: "LOOSE SOCKS",
    caption: "Retro Detail",
    src: "/media/fashion-visual/style-socks.png",
    alt: "아이보리 루즈 삭스",
  },
  {
    number: "04",
    title: "OXFORD SHOES",
    caption: "Classic Balance",
    src: "/media/fashion-visual/style-shoes.png",
    alt: "블랙 옥스퍼드 슈즈",
  },
];

export function FashionVisualStyleNotes() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const styleListRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const eyebrow = eyebrowRef.current;
    const intro = introRef.current;
    const styleList = styleListRef.current;
    const mainImage = mainImageRef.current;

    if (!section || !eyebrow || !intro || !styleList || !mainImage) return;

    const styleElements = Array.from(styleList.children) as HTMLElement[];
    const motionElements = [eyebrow, intro, ...styleElements, mainImage];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        resetMotionElements(motionElements);
        return;
      }

      revealY(eyebrow, { y: 20, duration: 0.8, start: "top 88%" });
      revealY(intro, { y: 28, duration: 0.9, start: "top 86%" });
      staggerY(styleElements, {
        y: 20,
        duration: 0.8,
        stagger: 0.12,
        trigger: styleList,
        start: "top 86%",
      });
      revealY(mainImage, {
        y: 40,
        duration: 1.1,
        delay: 0.25,
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
      aria-labelledby="fashion-visual-style-notes-title"
    >
      <div className={styles.inner}>
        <p ref={eyebrowRef} className={styles.eyebrow}>
          04 / STYLE NOTES
        </p>

        <div className={styles.content}>
          {/* Intro */}
          <div ref={introRef} className={styles.intro}>
            <h2 id="fashion-visual-style-notes-title" className={styles.title}>
              THE LOOK
            </h2>
            <p className={styles.lead}>
              White blouse,
              <br />
              black volume skirt,
              <br />
              loose socks and oxford shoes.
            </p>
          </div>
          {/* Styling contents */}
          <div className={styles.layout}>
            <div ref={styleListRef} className={styles.styleList}>
              {styleItems.map((item) => (
                <article className={styles.styleItem} key={item.number}>
                  <div className={styles.thumbWrap}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={120}
                      height={130}
                      unoptimized
                      sizes="120px"
                      className={styles.thumb}
                    />
                  </div>
                  <div className={styles.itemCopy}>
                    <span className={styles.number}>{item.number}</span>
                    <h3>{item.title}</h3>
                    <p>{item.caption}</p>
                  </div>
                </article>
              ))}
            </div>
            <div ref={mainImageRef} className={styles.mainImageWrap}>
              <Image
                src="/media/fashion-visual/style-main.png"
                alt="화이트 블라우스와 블랙 스커트, 루즈 삭스와 옥스퍼드 슈즈를 스타일링한 전신 패션 비주얼"
                width={760}
                height={1100}
                unoptimized
                sizes="(max-width: 767px) 100vw, 760px"
                className={styles.mainImage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
