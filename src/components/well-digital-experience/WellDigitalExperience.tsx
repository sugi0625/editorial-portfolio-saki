"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import type { Ref } from "react";

import { Container } from "@/components/editorial/Container";
import { gsap } from "@/lib/gsap";

import styles from "./WellDigitalExperience.module.css";

const DESKTOP_IMAGE = "/media/well/section03_img01.jpg";
const MOBILE_IMAGE = "/media/well/section03_img02.jpg";
const DETAIL_IMAGE = "/media/well/section03_img03.jpg";

type ExperienceItemProps = {
  number: string;
  label: string;
  image: string;
  description: string;
  imageAlt: string;
  width: number;
  height: number;
  className: string;
  align?: "start" | "end";
  itemRef?: Ref<HTMLElement>;
};

function ExperienceItem({
  number,
  label,
  description,
  image,
  imageAlt,
  width,
  height,
  className,
  align = "start",
  itemRef,
}: ExperienceItemProps) {
  return (
    <article ref={itemRef} className={`${styles.experienceItem} ${className}`}>
      <Image
        src={image}
        alt={imageAlt}
        width={width}
        height={height}
        className={styles.image}
      />

      <div
        className={`${styles.itemLabel} ${
          align === "end" ? styles.alignEnd : ""
        }`}
        data-motion="item-label"
      >
        <h3>
          <span>{number}</span>
          <span>/</span>
          <span>{label}</span>
        </h3>

        <p>{description}</p>
      </div>
    </article>
  );
}

export default function WellDigitalExperience() {
  const sectionRef = useRef<HTMLElement>(null);

  const labelRef = useRef<HTMLParagraphElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);

  const desktopRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLElement>(null);

  const projectInfoRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const label = labelRef.current;
      const statement = statementRef.current;

      const desktop = desktopRef.current;
      const mobile = mobileRef.current;
      const detail = detailRef.current;

      const projectInfo = projectInfoRef.current;
      const end = endRef.current;

      const statementLines = statement
        ? Array.from(statement.querySelectorAll<HTMLElement>("span"))
        : [];

      const desktopLabel = desktop?.querySelector<HTMLElement>(
        '[data-motion="item-label"]',
      );

      const mobileLabel = mobile?.querySelector<HTMLElement>(
        '[data-motion="item-label"]',
      );

      const detailLabel = detail?.querySelector<HTMLElement>(
        '[data-motion="item-label"]',
      );

      /*
       * REDUCED MOTION
       */
      if (reduceMotion) {
        gsap.set(
          [
            label,
            ...statementLines,
            desktop,
            desktopLabel,
            mobile,
            mobileLabel,
            detail,
            detailLabel,
            projectInfo,
            end,
          ],
          {
            clearProps: "opacity,transform,visibility",
          },
        );

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
       * 01 / DESKTOP
       * ----------------------------------------
       * 오른쪽 → 왼쪽
       */
      if (desktop) {
        gsap.fromTo(
          desktop,
          {
            opacity: 0,
            x: 44,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.15,
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
       * DESKTOP LABEL
       */
      if (desktopLabel) {
        gsap.fromTo(
          desktopLabel,
          {
            opacity: 0,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.14,
            ease: "power2.out",
            scrollTrigger: {
              trigger: desktop,
              start: "top 84%",
              once: true,
            },
          },
        );
      }

      /*
       * 02 / MOBILE
       * ----------------------------------------
       * 왼쪽 → 오른쪽
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
            duration: 1.1,
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
       * MOBILE LABEL
       */
      if (mobileLabel) {
        gsap.fromTo(
          mobileLabel,
          {
            opacity: 0,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.14,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mobile,
              start: "top 86%",
              once: true,
            },
          },
        );
      }

      /*
       * 03 / DETAIL
       * ----------------------------------------
       * 아래 → 위
       */
      if (detail) {
        gsap.fromTo(
          detail,
          {
            opacity: 0,
            y: 34,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: detail,
              start: "top 86%",
              once: true,
            },
          },
        );
      }

      /*
       * DETAIL LABEL
       */
      if (detailLabel) {
        gsap.fromTo(
          detailLabel,
          {
            opacity: 0,
            y: 16,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.16,
            ease: "power2.out",
            scrollTrigger: {
              trigger: detail,
              start: "top 86%",
              once: true,
            },
          },
        );
      }

      /*
       * PROJECT INFO
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
            duration: 1.5,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: projectInfo,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      /*
       * END OF CASE 03
       */
      if (end) {
        gsap.fromTo(
          end,
          {
            opacity: 0,
            y: 12,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: end,
              start: "top 90%",
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
          <span>CASE 03</span>
          <span>/</span>
          <span>DIGITAL EXPERIENCE</span>
        </p>

        <h2 ref={statementRef} className={styles.statement}>
          <span>디바이스가 달라져도,</span>
          <span>시각적 방향은 일관되게 유지했습니다.</span>
        </h2>

        <div className={styles.visualGrid}>
          <ExperienceItem
            itemRef={desktopRef}
            number="01"
            label="DESKTOP"
            description="WEB EXPERIENCE"
            image={DESKTOP_IMAGE}
            imageAlt="웰산후조리원 데스크톱 웹사이트 화면"
            width={956}
            height={1060}
            className={styles.desktop}
            align="end"
          />

          <ExperienceItem
            itemRef={mobileRef}
            number="02"
            label="MOBILE"
            description="RESPONSIVE EXPERIENCE"
            image={MOBILE_IMAGE}
            imageAlt="웰산후조리원 모바일 웹사이트 화면"
            width={320}
            height={1450}
            className={styles.mobile}
          />

          <ExperienceItem
            itemRef={detailRef}
            number="03"
            label="DETAIL"
            description="VISUAL LANGUAGE"
            image={DETAIL_IMAGE}
            imageAlt="웰산후조리원 브랜드 비주얼 디테일"
            width={680}
            height={440}
            className={styles.detail}
          />
        </div>

        <div className={styles.closing}>
          <div ref={projectInfoRef} className={styles.projectInfo}>
            <div className={styles.projectTitle}>
              <p>WELL POSTPARTUM CARE CENTER</p>
              <h3>웰산후조리원</h3>
            </div>

            <a
              className={styles.liveLink}
              href="https://wellpeople.kr/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="웰산후조리원 사이트 보기"
            >
              <span>VIEW LIVE SITE</span>

              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M16.98 15.481L16.98 7.08019L8.45802 7.08031M16.98 7.08019L7.08052 16.9797"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <p ref={endRef} className={styles.endLabel}>
            END OF CASE 03
          </p>
        </div>
      </Container>
    </section>
  );
}
