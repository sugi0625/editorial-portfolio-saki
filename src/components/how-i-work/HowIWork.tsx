"use client";

import { useLayoutEffect, useRef } from "react";

import { Container } from "@/components/editorial/Container";
import { gsap } from "@/lib/gsap";

import styles from "./HowIWork.module.css";

const steps = [
  {
    number: "01",
    letter: "U",
    title: "UNDERSTAND",
    copy: (
      <>
        목적과 요구사항,
        <br />
        구현 조건을 확인합니다.
      </>
    ),
  },
  {
    number: "02",
    letter: "S",
    title: "STRUCTURE",
    copy: (
      <>
        정보의 우선순위와
        <br />
        사용 흐름을 정리합니다.
      </>
    ),
  },
  {
    number: "03",
    letter: "D",
    title: "DESIGN",
    copy: (
      <>
        정보의 구조를
        <br />
        화면의 위계로 표현합니다.
      </>
    ),
  },
  {
    number: "04",
    letter: "B",
    title: "BUILD & VERIFY",
    copy: (
      <>
        구현하고,
        <br />
        실제 화면에서 다시 확인합니다.
      </>
    ),
  },
] as const;

export function HowIWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLHeadingElement>(null);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;

    const stepElements = stepRefs.current.filter(
      (step): step is HTMLElement => step !== null,
    );

    if (!section || !label || stepElements.length === 0) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      /*
       * REDUCED MOTION
       */
      if (reducedMotion) {
        gsap.set([label, ...stepElements], {
          clearProps: "opacity,visibility,transform",
        });

        return;
      }

      /*
       * HOW I WORK LABEL
       */
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
            start: "top 78%",
            once: true,
          },
        },
      );

      /*
       * STEP MOTION
       *
       * 01 : 위 → 아래
       * 02 : 오른쪽 → 왼쪽
       * 03 : 왼쪽 → 오른쪽
       * 04 : 아래 → 위
       */

      const stepMotion = [
        {
          from: {
            opacity: 0,
            y: -48,
          },
          delay: 0,
        },
        {
          from: {
            opacity: 0,
            x: 48,
          },
          delay: 0.18,
        },
        {
          from: {
            opacity: 0,
            x: -48,
          },
          delay: 0.32,
        },
        {
          from: {
            opacity: 0,
            y: 48,
          },
          delay: 0.46,
        },
      ];

      stepElements.forEach((step, index) => {
        const motion = stepMotion[index];

        if (!motion) return;

        gsap.fromTo(step, motion.from, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1.05,
          delay: motion.delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 82%",
            once: true,
          },
        });
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="how-i-work-title"
    >
      <Container className={styles.container}>
        <h2 ref={labelRef} id="how-i-work-title" className={styles.label}>
          04 / HOW I WORK
        </h2>

        <div className={styles.main}>
          <div className={styles.stage}>
            {steps.map((step, index) => (
              <article
                key={step.number}
                ref={(node) => {
                  stepRefs.current[index] = node;
                }}
                className={`${styles.step} ${styles[`step${step.number}`]}`}
              >
                <span className={styles.letter} aria-hidden="true">
                  {step.letter}
                </span>

                <p className={styles.number}>{step.number}</p>

                <div className={styles.copyGroup}>
                  <h3 className={styles.title}>{step.title}</h3>

                  <p className={styles.copy}>{step.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
