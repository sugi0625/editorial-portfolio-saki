"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { Container } from "@/components/editorial/Container";
import { gsap } from "@/lib/gsap";

import styles from "./BusinessNoteOpening.module.css";

const componentVisuals = [
  {
    key: "button",
    title: "COMPONENT / BUTTON",
    src: "/media/4uplab/opening_img01.png",
    alt: "사업노트 버튼 컴포넌트 시스템",
    width: 508,
    height: 272,
  },
  {
    key: "tab",
    title: "COMPONENT / TAB",
    src: "/media/4uplab/opening_img03.png",
    alt: "사업노트 탭 컴포넌트 시스템",
    width: 330,
    height: 156,
  },
  {
    key: "input",
    title: "COMPONENT / INPUT",
    src: "/media/4uplab/opening_img02.png",
    alt: "사업노트 입력 컴포넌트 시스템",
    width: 360,
    height: 424,
  },
] as const;

export function BusinessNoteOpening() {
  const sectionRef = useRef<HTMLElement>(null);

  const labelRef = useRef<HTMLParagraphElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const projectMetaRef = useRef<HTMLDivElement>(null);

  const buttonRef = useRef<HTMLElement>(null);
  const tabRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLElement>(null);
  const successRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const label = labelRef.current;
      const statement = statementRef.current;
      const projectMeta = projectMetaRef.current;

      const button = buttonRef.current;
      const tab = tabRef.current;
      const input = inputRef.current;
      const success = successRef.current;
      const phone = phoneRef.current;

      const statementLines = statement
        ? Array.from(statement.querySelectorAll<HTMLElement>("span"))
        : [];

      const motionElements = [
        label,
        ...statementLines,
        projectMeta,
        button,
        tab,
        input,
        success,
        phone,
      ].filter(Boolean);

      /*
       * Reduced Motion
       * ----------------------------------------
       * OS의 "동작 줄이기" 설정이 켜져 있으면
       * ScrollTrigger를 만들지 않고 모든 요소를 즉시 표시합니다.
       */
      if (prefersReducedMotion) {
        gsap.set(motionElements, {
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
       * ----------------------------------------
       * 두 줄이 순서대로 천천히 등장합니다.
       */
      if (statement && statementLines.length > 0) {
        gsap.fromTo(
          statementLines,
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statement,
              start: "top 84%",
              once: true,
            },
          },
        );
      }

      /*
       * PROJECT META
       */
      if (projectMeta) {
        gsap.fromTo(
          projectMeta,
          {
            opacity: 0,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: projectMeta,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      /*
       * BUTTON
       * ----------------------------------------
       * 왼쪽에서 오른쪽으로 서서히 등장
       */
      if (button) {
        gsap.fromTo(
          button,
          {
            opacity: 0,
            x: -48,
            y: 8,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: button,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      /*
       * TAB
       * ----------------------------------------
       * 아래에서 위로 가볍게 등장
       */
      if (tab) {
        gsap.fromTo(
          tab,
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: tab,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      /*
       * INPUT
       * ----------------------------------------
       * 오른쪽에서 왼쪽으로 서서히 등장
       */
      if (input) {
        gsap.fromTo(
          input,
          {
            opacity: 0,
            x: 48,
            y: 8,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: input,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      /*
       * SUCCESS
       */
      if (success) {
        gsap.fromTo(
          success,
          {
            opacity: 0,
            y: 32,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            delay: 0.22,
            ease: "power3.out",
            scrollTrigger: {
              trigger: success,
              start: "top 90%",
              once: true,
            },
          },
        );
      }

      /*
       * PHONE
       * ----------------------------------------
       * 마지막 visual evidence이므로
       * 조금 더 느리고 안정적으로 등장
       */
      if (phone) {
        gsap.fromTo(
          phone,
          {
            opacity: 0,
            y: 36,
            scale: 0.985,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: phone,
              start: "top 86%",
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
      aria-labelledby="business-note-opening-title"
    >
      <Container>
        <p ref={labelRef} className={styles.label}>
          CASE STUDY / 02
        </p>

        <div className={styles.content}>
          <h2
            ref={statementRef}
            id="business-note-opening-title"
            className={styles.statement}
          >
            <span>화면마다 필요한 것은 달랐지만,</span>
            <span>UI의 기준은 하나로 이어갔습니다.</span>
          </h2>

          <div ref={projectMetaRef} className={styles.projectMeta}>
            <p className={styles.projectName}>4UPLAB — BUSINESS NOTE</p>

            <p className={styles.role}>UI DESIGN · COMPONENT DESIGN</p>
          </div>
        </div>

        <div className={styles.collage}>
          {componentVisuals.map((visual) => {
            const motionRef =
              visual.key === "button"
                ? buttonRef
                : visual.key === "tab"
                  ? tabRef
                  : inputRef;

            return (
              <figure
                key={visual.key}
                ref={motionRef}
                className={`${styles.componentCard} ${styles[visual.key]}`}
              >
                <figcaption className={styles.cardTitle}>
                  {visual.title}
                </figcaption>

                <div className={styles.cardBody}>
                  <Image
                    className={styles.componentImage}
                    src={visual.src}
                    alt={visual.alt}
                    width={visual.width}
                    height={visual.height}
                    sizes="(max-width: 1024px) 32vw, 444px"
                  />
                </div>
              </figure>
            );
          })}

          <figure ref={successRef} className={styles.success}>
            <Image
              className={styles.successImage}
              src="/media/4uplab/opening_alert.png"
              alt="사업노트 성공 알림 컴포넌트"
              width={320}
              height={84}
              sizes="(max-width: 1024px) 20vw, 320px"
            />
          </figure>

          <figure ref={phoneRef} className={styles.phone}>
            <Image
              className={styles.phoneImage}
              src="/media/4uplab/opening_app.png"
              alt="사업노트 모바일 애플리케이션 화면"
              width={442}
              height={852}
              sizes="(max-width: 1024px) 27vw, 442px"
            />
          </figure>
        </div>
      </Container>
    </section>
  );
}
