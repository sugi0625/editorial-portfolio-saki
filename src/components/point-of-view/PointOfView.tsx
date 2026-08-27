"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/editorial";
import { gsap } from "@/lib/gsap";
import styles from "./PointOfView.module.css";

export function PointOfView() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const supportingCopyRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const statement = statementRef.current;
    const supportingCopy = supportingCopyRef.current;

    if (!section || !label || !statement || !supportingCopy) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([label, statement, supportingCopy], {
        clearProps: "opacity,transform,visibility",
      });
      return;
    }

    const motion = gsap.context(() => {
      gsap.set(label, { autoAlpha: 0 });
      gsap.set(statement, { autoAlpha: 0, y: 24 });
      gsap.set(supportingCopy, { autoAlpha: 0, y: 20 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: statement,
          start: "top 70%",
          once: true,
        },
      });

      timeline.to(label, { autoAlpha: 1, duration: 0.8, ease: "power2.out" });

      timeline.to(
        statement,
        { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" },
        0.12,
      );

      timeline.to(
        supportingCopy,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          ease: "power2.out",
        },
        1,
      );
    }, section);

    return () => motion.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="point-of-view-title"
    >
      <Container>
        <p ref={labelRef} className={styles.label} lang="en">
          <span>02</span>
          <span aria-hidden="true">/</span>
          <span>POINT OF VIEW</span>
        </p>

        <div className={styles.contentGrid}>
          <div className={styles.content}>
            <h2
              ref={statementRef}
              className={styles.statement}
              id="point-of-view-title"
            >
              <span>무엇을 보여줄지보다</span>
              <strong>무엇을 먼저 보여줄지</strong>
              <span>생각합니다.</span>
            </h2>

            <p ref={supportingCopyRef} className={styles.supportingCopy}>
              복잡한 정보 속에서
              <br />
              우선순위를 정하고,
              <br />
              사용자가 이해하기 쉬운
              <br />
              흐름으로 정리합니다.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
