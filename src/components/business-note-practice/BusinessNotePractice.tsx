"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { Container } from "@/components/editorial/Container";
import { gsap } from "@/lib/gsap";

import styles from "./BusinessNotePractice.module.css";

const REPORT_IMAGE = "/media/4uplab/section04_app01.png";
const FORM_IMAGE = "/media/4uplab/section04_app02.png";
const MANAGEMENT_IMAGE = "/media/4uplab/section04_app03.png";

type PracticeItemProps = {
  number: string;
  label: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
  className: string;
  itemRef?: React.Ref<HTMLElement>;
};

function PracticeItem({
  number,
  label,
  image,
  imageAlt,
  width,
  height,
  className,
  itemRef,
}: PracticeItemProps) {
  return (
    <article ref={itemRef} className={`${styles.practiceItem} ${className}`}>
      <div className={styles.itemLabel}>
        <span>{number}</span>
        <span className={styles.slash}>/</span>
        <span>{label}</span>
      </div>

      <div className={styles.imageWrap}>
        <Image
          src={image}
          alt={imageAlt}
          width={width}
          height={height}
          className={styles.screenImage}
        />
      </div>
    </article>
  );
}

export default function BusinessNotePractice() {
  const sectionRef = useRef<HTMLElement>(null);

  const labelRef = useRef<HTMLParagraphElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);

  const reportRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const managementRef = useRef<HTMLElement>(null);

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

      const report = reportRef.current;
      const form = formRef.current;
      const management = managementRef.current;

      const end = endRef.current;

      const statementLines = statement
        ? Array.from(statement.querySelectorAll<HTMLElement>("span"))
        : [];

      /*
       * REDUCED MOTION
       */
      if (reduceMotion) {
        gsap.set([label, ...statementLines, report, form, management, end], {
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
       * 01 / REPORT
       * ----------------------------------------
       * 오른쪽 → 왼쪽
       * 첫 번째 핵심 화면
       */
      if (report) {
        gsap.fromTo(
          report,
          {
            opacity: 0,
            x: 44,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: report,
              start: "top 86%",
              once: true,
            },
          },
        );
      }

      /*
       * 02 / FORM
       * ----------------------------------------
       * 왼쪽 → 오른쪽
       * REPORT보다 살짝 늦게
       */
      if (form) {
        gsap.fromTo(
          form,
          {
            opacity: 0,
            x: -44,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.1,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: form,
              start: "top 86%",
              once: true,
            },
          },
        );
      }

      /*
       * 03 / MANAGEMENT
       * ----------------------------------------
       * 아래 → 위
       * 마지막 화면이라는 점이 느껴지도록
       * 약간 더 늦게 등장
       */
      if (management) {
        gsap.fromTo(
          management,
          {
            opacity: 0,
            y: 34,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: management,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      /*
       * END OF CASE 02
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
            duration: 0.8,
            delay: 0.1,
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
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="business-note-practice-title"
    >
      <Container>
        <div className={styles.header}>
          <p ref={labelRef} className={styles.caseLabel}>
            <span>CASE 02</span>
            <span>/</span>
            <span>SYSTEM IN PRACTICE</span>
          </p>

          <h2
            ref={statementRef}
            id="business-note-practice-title"
            className={styles.statement}
          >
            <span>서로 다른 업무 화면에서도,</span>
            <span>같은 기준이 이어지도록 설계했습니다.</span>
          </h2>
        </div>

        <div className={styles.visualGrid}>
          <PracticeItem
            itemRef={reportRef}
            number="01"
            label="REPORT"
            image={REPORT_IMAGE}
            imageAlt="사업노트 리포트 화면"
            width={480}
            height={988}
            className={styles.report}
          />

          <PracticeItem
            itemRef={formRef}
            number="02"
            label="FORM"
            image={FORM_IMAGE}
            imageAlt="사업노트 직원 등록 폼 화면"
            width={380}
            height={1086}
            className={styles.form}
          />

          <PracticeItem
            itemRef={managementRef}
            number="03"
            label="MANAGEMENT"
            image={MANAGEMENT_IMAGE}
            imageAlt="사업노트 사업장 관리 화면"
            width={330}
            height={840}
            className={styles.management}
          />
        </div>

        <p ref={endRef} className={styles.endLabel}>
          END OF CASE 02
        </p>
      </Container>
    </section>
  );
}
