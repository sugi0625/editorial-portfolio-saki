"use client";

import { useLayoutEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";

import { resetMotionElements, revealY, staggerY } from "./fashionVisualMotion";
import styles from "./FashionVisual.module.css";

const flowItems = ["MOOD", "PRODUCT", "STYLING", "VISUAL STORY", "DETAILS"];

export function FashionVisual() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDListElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const eyebrow = eyebrowRef.current;
    const title = titleRef.current;
    const statement = statementRef.current;
    const description = descriptionRef.current;
    const meta = metaRef.current;
    const flow = flowRef.current;

    if (
      !section ||
      !eyebrow ||
      !title ||
      !statement ||
      !description ||
      !meta ||
      !flow
    ) {
      return;
    }

    const flowItems = Array.from(flow.children) as HTMLElement[];
    const motionElements = [
      eyebrow,
      title,
      statement,
      description,
      meta,
      ...flowItems,
    ];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      if (prefersReducedMotion) {
        resetMotionElements(motionElements);
        return;
      }

      revealY(eyebrow, { y: 20, duration: 0.8, start: "top 92%" });
      revealY(title, {
        y: 32,
        duration: 0.95,
        delay: 0.08,
        start: "top 89%",
      });
      staggerY([statement, description], {
        y: 24,
        duration: 0.85,
        stagger: 0.1,
        delay: 0.14,
        trigger: statement,
        start: "top 88%",
      });
      revealY(meta, {
        y: 20,
        duration: 0.8,
        delay: 0.28,
        start: "top 88%",
      });
      staggerY(flowItems, {
        y: 16,
        duration: 0.75,
        stagger: 0.1,
        trigger: flow,
        start: "top 90%",
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="fashion-visual-title"
    >
      <div className={styles.inner}>
        <p ref={eyebrowRef} className={styles.eyebrow}>
          PERSONAL PROJECT / 2026
        </p>

        <div className={styles.content}>
          <div className={styles.left}>
            <h2
              ref={titleRef}
              id="fashion-visual-title"
              className={styles.title}
            >
              <span>FASHION</span>
              <span>VISUAL STUDY</span>
            </h2>

            <p ref={statementRef} className={styles.statement}>
              상품의 분위기를 읽고,
              <br />
              하나의 비주얼 스토리로 확장했습니다.
            </p>

            <p ref={descriptionRef} className={styles.description}>
              여성의류 쇼핑몰의 상품과 비주얼 무드를 분석하고,
              <br />
              빈티지하고 여성스러운 분위기를 하나의 패션 비주얼로
              재구성했습니다.
              <br />
              AI 이미지 생성과 Photoshop 보정, 에디토리얼 레이아웃을 통해
              <br />
              상품의 무드부터 스타일링과 디테일까지 일관된 흐름으로
              확장했습니다.
            </p>
          </div>

          <dl ref={metaRef} className={styles.meta}>
            <div className={styles.metaGroup}>
              <dt>PROJECT</dt>
              <dd>Fashion Visual Study</dd>
            </div>

            <div className={styles.metaGroup}>
              <dt>TARGET</dt>
              <dd>SAKI</dd>
            </div>

            <div className={styles.metaGroup}>
              <dt>DIRECTION</dt>
              <dd>
                Vintage
                <br />
                Feminine
                <br />
                Nostalgic
              </dd>
            </div>

            <div className={styles.metaGroup}>
              <dt>ROLE</dt>
              <dd>
                Visual Direction
                <br />
                AI Image Generation
                <br />
                Photoshop Retouch
                <br />
                Editorial Design
              </dd>
            </div>
          </dl>
        </div>

        <div ref={flowRef} className={styles.flow}>
          {flowItems.map((item, index) => (
            <div className={styles.flowItem} key={item}>
              <span>{item}</span>
              {index < flowItems.length - 1 && (
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
