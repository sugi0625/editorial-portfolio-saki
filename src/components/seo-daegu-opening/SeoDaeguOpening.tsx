"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/editorial/Container";
import { gsap } from "@/lib/gsap";
import styles from "./SeoDaeguOpening.module.css";

export function SeoDaeguOpening() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const projectInfoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const statement = statementRef.current;
    const projectInfo = projectInfoRef.current;

    if (!section || !label || !statement || !projectInfo) return;

    const revealElements = [label, statement, projectInfo];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(revealElements, {
        clearProps: "opacity,transform,visibility",
      });
      return;
    }

    const motion = gsap.context(() => {
      gsap.set(label, { autoAlpha: 0, y: 20 });
      gsap.set(statement, { autoAlpha: 0, y: 36 });
      gsap.set(projectInfo, { autoAlpha: 0, y: 28 });

      gsap.to(label, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: label,
          start: "top 88%",
          once: true,
        },
      });

      gsap.to(statement, {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statement,
          start: "top 82%",
          once: true,
        },
      });

      gsap.to(projectInfo, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: projectInfo,
          start: "top 86%",
          once: true,
        },
      });
    }, section);

    return () => motion.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="seo-daegu-opening-title"
    >
      <Container>
        <p ref={labelRef} className={styles.label}>
          CASE STUDY / 01
        </p>

        <div className={styles.content}>
          <h2
            ref={statementRef}
            id="seo-daegu-opening-title"
            className={styles.statement}
          >
            <span className={styles.statementLine}>좋은 개선은</span>
            <span className={styles.statementLine}>
              전부 바꾸는 일이 아니라,
            </span>
            <span className={styles.statementLine}>무엇을 바꿔야 하는지</span>
            <span className={styles.statementLine}>
              정확히 고르는 일입니다.
            </span>
          </h2>

          <div ref={projectInfoRef} className={styles.projectInfo}>
            <div className={styles.titleGroup}>
              <p className={styles.englishTitle}>
                INNOVATION · CULTURE · FUTURE
              </p>
              <p className={styles.koreanTitle}>
                서대구산단 혁신 · 문화 · 미래
              </p>
            </div>

            <p className={styles.metadata}>
              2025.11 ~ 12 · FREELANCE
              <br />
              PLANNING · UI DESIGN · HTML/CSS
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
