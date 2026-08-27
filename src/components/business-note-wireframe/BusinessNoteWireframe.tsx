"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { Container } from "@/components/editorial/Container";
import { gsap } from "@/lib/gsap";

import styles from "./BusinessNoteWireframe.module.css";

const decisions = [
  {
    number: "01",
    title: "HIERARCHY",
    description: "중요한 기능이 먼저 보이도록",
  },
  {
    number: "02",
    title: "GROUPING",
    description: "관련 기능을 함께 인지하도록",
  },
  {
    number: "03",
    title: "STATUS",
    description: "진행 상태를 바로 확인하도록",
  },
] as const;

export function BusinessNoteWireframe() {
  const sectionRef = useRef<HTMLElement>(null);

  const labelRef = useRef<HTMLParagraphElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);

  const sourceRef = useRef<HTMLElement>(null);
  const decisionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const label = labelRef.current;
      const statement = statementRef.current;

      const source = sourceRef.current;
      const decision = decisionRef.current;
      const result = resultRef.current;

      const steps = stepsRef.current
        ? Array.from(stepsRef.current.children)
        : [];

      /*
       * REDUCED MOTION
       * ----------------------------------------
       * 사용자가 동작 줄이기를 설정한 경우
       * animation / ScrollTrigger 없이 바로 표시
       */
      if (reduceMotion) {
        gsap.set([label, statement, source, decision, result, ...steps], {
          clearProps: "opacity,transform,visibility",
        });

        return;
      }

      /*
       * CASE LABEL
       */
      if (label) {
        gsap.fromTo(
          label,
          {
            opacity: 0,
            y: 12,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: label,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      /*
       * MAIN STATEMENT
       */
      if (statement) {
        gsap.fromTo(
          statement,
          {
            opacity: 0,
            y: 24,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statement,
              start: "top 86%",
              once: true,
            },
          },
        );
      }

      /*
       * SOURCE / WIREFRAME
       * ----------------------------------------
       * 왼쪽 → 오른쪽
       */
      if (source) {
        gsap.fromTo(
          source,
          {
            opacity: 0,
            x: -40,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: source,
              start: "top 84%",
              once: true,
            },
          },
        );
      }

      /*
       * DESIGN DECISIONS TITLE
       */
      if (decision) {
        const title = decision.querySelector(`.${styles.decisionTitle}`);

        if (title) {
          gsap.fromTo(
            title,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: decision,
                start: "top 86%",
                once: true,
              },
            },
          );
        }
      }

      /*
       * DESIGN DECISION STEPS
       * ----------------------------------------
       * 01 → 02 → 03 순서로 개별 reveal
       */
      if (steps.length > 0) {
        gsap.fromTo(
          steps,
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      /*
       * RESULT / DESIGNED UI
       * ----------------------------------------
       * 오른쪽 → 왼쪽
       */
      if (result) {
        gsap.fromTo(
          result,
          {
            opacity: 0,
            x: 40,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: result,
              start: "top 84%",
              once: true,
            },
          },
        );
      }
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="business-note-wireframe-title"
    >
      <Container>
        <p ref={labelRef} className={styles.label}>
          CASE 02 / FROM WIREFRAME TO UI
        </p>

        <div className={styles.content}>
          <h2
            ref={statementRef}
            id="business-note-wireframe-title"
            className={styles.statement}
          >
            <span>주어진 구조를 그대로 옮기기보다,</span>
            <span>실제 사용 흐름에 맞게 다시 정리했습니다.</span>
          </h2>
        </div>

        <div className={styles.inner}>
          <div className={styles.comparison}>
            {/* SOURCE */}
            <figure
              ref={sourceRef}
              className={`${styles.visualGroup} ${styles.sourceGroup}`}
            >
              <Image
                className={styles.sourceImage}
                src="/media/4uplab/section02_img01.png"
                alt="Source / Wireframe"
                width={410}
                height={703}
                sizes="(max-width: 900px) min(calc(100vw - 64px), 410px), 25vw"
              />
            </figure>

            {/* DESIGN DECISIONS */}
            <div ref={decisionRef} className={styles.decisionGroup}>
              <h3 className={styles.decisionTitle}>DESIGN DECISIONS</h3>

              <div ref={stepsRef} className={styles.steps}>
                {decisions.map((decision) => (
                  <div key={decision.number} className={styles.step}>
                    <h4 className={styles.stepTitle}>
                      {decision.number} / {decision.title}
                    </h4>

                    <p className={styles.stepDescription}>
                      {decision.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RESULT */}
            <figure
              ref={resultRef}
              className={`${styles.visualGroup} ${styles.resultGroup}`}
            >
              <Image
                className={styles.resultImage}
                src="/media/4uplab/section02_img02.png"
                alt="Result / Designed UI"
                width={484}
                height={852}
                sizes="(max-width: 900px) min(calc(100vw - 64px), 484px), 28vw"
              />
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
