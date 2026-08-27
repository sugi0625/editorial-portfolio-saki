"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { Container } from "@/components/editorial/Container";
import { gsap } from "@/lib/gsap";

import styles from "./SeoDaeguStructure.module.css";

const reorganizedSteps = [
  {
    number: "01",
    title: "PRIORITY",
    description: "핵심 정보가 먼저 보이도록",
  },
  {
    number: "02",
    title: "GROUPING",
    description: "관련 정보가 함께 읽히도록",
  },
  {
    number: "03",
    title: "HIERARCHY",
    description: "정보의 강약이 드러나도록",
  },
] as const;

export function SeoDaeguStructure() {
  const sectionRef = useRef<HTMLElement>(null);

  const labelRef = useRef<HTMLParagraphElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);

  const sourceGroupRef = useRef<HTMLDivElement>(null);

  const reorganizedHeadingRef = useRef<HTMLHeadingElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const resultGroupRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    const label = labelRef.current;
    const statement = statementRef.current;

    const sourceGroup = sourceGroupRef.current;

    const reorganizedHeading = reorganizedHeadingRef.current;

    const stepElements = stepRefs.current.filter(
      (step): step is HTMLDivElement => step !== null,
    );

    const resultGroup = resultGroupRef.current;

    if (
      !section ||
      !label ||
      !statement ||
      !sourceGroup ||
      !reorganizedHeading ||
      stepElements.length !== reorganizedSteps.length ||
      !resultGroup
    ) {
      return;
    }

    const revealElements = [
      label,
      statement,
      sourceGroup,
      reorganizedHeading,
      ...stepElements,
      resultGroup,
    ];

    /*
     * REDUCED MOTION
     */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(revealElements, {
        clearProps: "opacity,transform,visibility",
      });

      return;
    }

    const motion = gsap.context(() => {
      /*
       * 기본 Fade Up
       */
      const revealY = (
        element: HTMLElement,
        y: number,
        duration: number,
        start: string,
        delay = 0,
      ) => {
        gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            y,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration,
            delay,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start,
              once: true,
            },
          },
        );
      };

      /*
       * Horizontal Reveal
       */
      const revealX = (
        element: HTMLElement,
        x: number,
        duration: number,
        start: string,
        delay = 0,
      ) => {
        gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            x,
          },
          {
            autoAlpha: 1,
            x: 0,
            duration,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start,
              once: true,
            },
          },
        );
      };

      /*
       * CASE LABEL
       */
      revealY(label, 20, 0.8, "top 88%");

      /*
       * STATEMENT
       */
      revealY(statement, 32, 1, "top 84%");

      /*
       * SOURCE GROUP
       * ----------------------------------------
       * Label + Image 함께
       * 왼쪽 → 오른쪽
       */
      revealX(sourceGroup, -48, 1.1, "top 86%");

      /*
       * REORGANIZED BY
       */
      revealY(reorganizedHeading, 24, 0.8, "top 88%");

      /*
       * STEPS
       * ----------------------------------------
       * 01 → 02 → 03 순차 reveal
       */
      stepElements.forEach((step, index) => {
        revealY(step, 24, 0.8, "top 88%", index * 0.12);
      });

      /*
       * RESULT GROUP
       * ----------------------------------------
       * Label + Image 함께
       * 오른쪽 → 왼쪽
       */
      revealX(resultGroup, 48, 1.15, "top 86%");
    }, section);

    return () => {
      motion.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="seo-daegu-structure-title"
    >
      <Container className={styles.header}>
        <p ref={labelRef} className={styles.label}>
          CASE 01 / FROM DOCUMENT TO STRUCTURE
        </p>

        <h2
          ref={statementRef}
          id="seo-daegu-structure-title"
          className={styles.statement}
        >
          정보를 옮기기 전에,
          <br />
          읽는 순서부터 설계했습니다.
        </h2>
      </Container>

      <div className={styles.sourceResultLayout}>
        <div className={styles.sourceOutcomeLayout}>
          <Container className={styles.sourceBand}>
            <div ref={sourceGroupRef} className={styles.sourceMaterial}>
              <p className={styles.sourceTitle}>
                SOURCE MATERIAL
                <br />
                CLIENT DOCUMENTS
              </p>

              <Image
                className={styles.sourceImage}
                src="/media/case-study/seo-daegu/source-material.png"
                alt="서대구산단 클라이언트 제공 문서"
                width={610}
                height={516}
              />
            </div>
          </Container>

          <div className={styles.outcomeLayout}>
            <div className={styles.lowerArea}>
              <div className={styles.reorganized}>
                <h3
                  ref={reorganizedHeadingRef}
                  className={styles.reorganizedTitle}
                >
                  REORGANIZED BY
                </h3>

                <div className={styles.steps}>
                  {reorganizedSteps.map((step, index) => (
                    <div
                      key={step.number}
                      ref={(node) => {
                        stepRefs.current[index] = node;
                      }}
                      className={styles.step}
                    >
                      <h4 className={styles.stepTitle}>
                        {step.number} / {step.title}
                      </h4>

                      <p className={styles.stepDescription}>
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Container className={styles.resultLayer}>
          <div ref={resultGroupRef} className={styles.resultGroup}>
            <p className={styles.resultLabel}>RESULT / WEB STRUCTURE</p>

            <Image
              className={styles.resultImage}
              src="/media/case-study/seo-daegu/web-structure.jpg"
              alt="서대구산단 웹사이트 구조 결과 화면"
              width={610}
              height={1488}
            />
          </div>
        </Container>
      </div>
    </section>
  );
}
