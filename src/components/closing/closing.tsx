"use client";

import { useLayoutEffect, useRef } from "react";

import { Container } from "@/components/editorial/Container";
import { gsap } from "@/lib/gsap";

import styles from "./closing.module.css";

export default function Closing() {
  const sectionRef = useRef<HTMLElement>(null);

  const labelRef = useRef<HTMLParagraphElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);

  const profileRef = useRef<HTMLDivElement>(null);
  const thanksRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const label = labelRef.current;
      const statement = statementRef.current;
      const profile = profileRef.current;
      const thanks = thanksRef.current;

      const statementLines = statement
        ? Array.from(statement.querySelectorAll<HTMLElement>("span"))
        : [];

      /*
       * REDUCED MOTION
       */
      if (reduceMotion) {
        gsap.set([label, ...statementLines, profile, thanks], {
          clearProps: "opacity,transform,visibility",
        });

        return;
      }

      /*
       * PORTFOLIO / CLOSING
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
       * ----------------------------------------
       * Closing 핵심 문장.
       * 두 줄을 조금 천천히 순차 reveal.
       */
      if (statement && statementLines.length > 0) {
        gsap.fromTo(
          statementLines,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.15,
            stagger: 0.16,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statement,
              start: "top 82%",
              once: true,
            },
          },
        );
      }

      /*
       * PROFILE
       * ----------------------------------------
       * 이름과 이메일은 조용하게 아래에서 등장.
       */
      if (profile) {
        gsap.fromTo(
          profile,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: profile,
              start: "top 90%",
              once: true,
            },
          },
        );
      }

      /*
       * THANK YOU
       * ----------------------------------------
       * 마지막 요소이므로 가장 늦게,
       * 이동은 거의 없이 fade 중심.
       */
      if (thanks) {
        gsap.fromTo(
          thanks,
          {
            opacity: 0,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: thanks,
              start: "top 92%",
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
    <footer ref={sectionRef} className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <p ref={labelRef} className={styles.label}>
            <span>PORTFOLIO</span>
            <span>/</span>
            <span>CLOSING</span>
          </p>

          <h2 ref={statementRef} className={styles.statement}>
            <span>무엇을 전달할지 이해하고,</span>
            <span>어떻게 보여줄지 설계합니다.</span>
          </h2>

          <div className={styles.bottom}>
            <div ref={profileRef} className={styles.profile}>
              <div className={styles.identity}>
                <p className={styles.role}>WEB / UI DESIGNER</p>
                <p className={styles.name}>이혜숙</p>
              </div>

              <a href="mailto:sugi00625@gmail.com" className={styles.email}>
                sugi00625@gmail.com
              </a>
            </div>

            <p ref={thanksRef} className={styles.thanks}>
              THANK YOU.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
