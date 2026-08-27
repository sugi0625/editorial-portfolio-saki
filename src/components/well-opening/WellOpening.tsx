"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { Container } from "@/components/editorial/Container";
import { gsap } from "@/lib/gsap";

import styles from "./WellOpening.module.css";

const MOBILE_IMAGE = "/media/well/opening_img02.jpg";
const DESKTOP_IMAGE = "/media/well/opening_img01.jpg";

export default function WellOpening() {
  const sectionRef = useRef<HTMLElement>(null);

  const labelRef = useRef<HTMLParagraphElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);

  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLImageElement>(null);
  const projectInfoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const label = labelRef.current;
      const statement = statementRef.current;

      const mobile = mobileRef.current;
      const desktop = desktopRef.current;
      const projectInfo = projectInfoRef.current;

      const statementLines = statement
        ? Array.from(statement.querySelectorAll<HTMLElement>("span"))
        : [];

      /*
       * REDUCED MOTION
       */
      if (reduceMotion) {
        gsap.set([label, ...statementLines, mobile, desktop, projectInfo], {
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
       * STATEMENT
       * ----------------------------------------
       * 두 줄 순차 등장
       */
      if (statement && statementLines.length > 0) {
        gsap.fromTo(
          statementLines,
          {
            opacity: 0,
            y: 26,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
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
       * DESKTOP
       * ----------------------------------------
       * 메인 비주얼
       * 아래에서 위로 + 아주 약한 scale
       */
      if (desktop) {
        gsap.fromTo(
          desktop,
          {
            opacity: 0,
            y: 36,
            scale: 0.985,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: desktop,
              start: "top 84%",
              once: true,
            },
          },
        );
      }

      /*
       * MOBILE
       * ----------------------------------------
       * 왼쪽에서 오른쪽으로
       * Desktop보다 살짝 늦게
       */
      if (mobile) {
        gsap.fromTo(
          mobile,
          {
            opacity: 0,
            x: -44,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.5,
            delay: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mobile,
              start: "top 86%",
              once: true,
            },
          },
        );
      }

      /*
       * PROJECT INFO
       * ----------------------------------------
       * 화면 결과를 본 뒤 마지막에 정보가 따라옴
       */
      if (projectInfo) {
        gsap.fromTo(
          projectInfo,
          {
            opacity: 0,
            y: 22,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: projectInfo,
              start: "top 88%",
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
    <section ref={sectionRef} className={styles.section}>
      <Container>
        <p ref={labelRef} className={styles.caseLabel}>
          <span>CASE STUDY</span>
          <span>/</span>
          <span>03</span>
        </p>

        <div className={styles.content}>
          <h1 ref={statementRef} className={styles.statement}>
            <span>공간의 분위기를 읽고,</span>
            <span>편안함과 신뢰를 화면으로 이어갔습니다.</span>
          </h1>

          <div className={styles.visual}>
            <div ref={mobileRef} className={styles.mobileVisual}>
              <Image
                src={MOBILE_IMAGE}
                alt="웰산후조리원 모바일 웹사이트 화면"
                width={468}
                height={1500}
                className={styles.image}
              />
            </div>

            <div className={styles.desktopColumn}>
              <Image
                ref={desktopRef}
                src={DESKTOP_IMAGE}
                alt="웰산후조리원 데스크톱 웹사이트 화면"
                width={1077}
                height={900}
                className={styles.image}
              />

              <div ref={projectInfoRef} className={styles.projectInfo}>
                <div className={styles.projectTitle}>
                  <p className={styles.englishTitle}>
                    WELL POSTPARTUM CARE CENTER
                  </p>

                  <h2>웰산후조리원</h2>
                </div>

                <p className={styles.metadata}>
                  BRAND WEBSITE RENEWAL
                  <br />
                  VISUAL DIRECTION · UI DESIGN · PUBLISHING
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
