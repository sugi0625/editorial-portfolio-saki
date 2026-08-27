"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { Container } from "@/components/editorial/Container";
import { gsap } from "@/lib/gsap";

import styles from "./WellVisualDirection.module.css";

const VISITING_IMAGE = "/media/well/section_img01.jpg";
const ROOM_IMAGE = "/media/well/section_img02.jpg";

type SpaceBlockProps = {
  image: string;
  imageAlt: string;
  label: string;
  swatch: string;
  name: string;
  description: string;
  className?: string;
  articleRef?: React.Ref<HTMLElement>;
};

function SpaceBlock({
  image,
  imageAlt,
  label,
  swatch,
  name,
  description,
  className = "",
  articleRef,
}: SpaceBlockProps) {
  return (
    <article ref={articleRef} className={`${styles.spaceBlock} ${className}`}>
      <div className={styles.imageWrap}>
        <Image
          src={image}
          alt={imageAlt}
          width={720}
          height={456}
          className={styles.spaceImage}
        />

        <span className={styles.imageLabel}>{label}</span>
      </div>

      <div className={styles.spaceCaption}>
        <div className={styles.spaceName}>
          <span
            className={styles.swatch}
            style={{ backgroundColor: swatch }}
            aria-hidden="true"
          />
          <h3>{name}</h3>
        </div>

        <p>{description}</p>
      </div>
    </article>
  );
}

const principles = [
  {
    index: "01 / COLOR",
    title: "MUTED GREEN · WARM NEUTRAL",
    description: "공간의 차분한 색을 화면의 주요 톤으로 연결했습니다.",
  },
  {
    index: "02 / TYPOGRAPHY",
    title: "SERIF + SANS",
    description:
      "브랜드의 인상과 정보 전달의 역할에 따라 서체의 위계를 구분했습니다.",
  },
  {
    index: "03 / SPACE",
    title: "GENEROUS SPACE",
    description:
      "이미지와 콘텐츠 사이에 충분한 여백을 두어 차분한 흐름을 만들었습니다.",
  },
];

export default function WellVisualDirection() {
  const sectionRef = useRef<HTMLElement>(null);

  const labelRef = useRef<HTMLParagraphElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);

  const visitingRef = useRef<HTMLElement>(null);
  const roomRef = useRef<HTMLElement>(null);

  const summaryRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const label = labelRef.current;
      const statement = statementRef.current;

      const visiting = visitingRef.current;
      const room = roomRef.current;

      const statementLines = statement
        ? Array.from(statement.querySelectorAll<HTMLElement>("span"))
        : [];

      const visitingCaption = visiting?.querySelector<HTMLElement>(
        `.${styles.spaceCaption}`,
      );

      const roomCaption = room?.querySelector<HTMLElement>(
        `.${styles.spaceCaption}`,
      );

      const summaryItems = summaryRef.current
        ? Array.from(summaryRef.current.children)
        : [];

      /*
       * REDUCED MOTION
       */
      if (reduceMotion) {
        gsap.set(
          [
            label,
            ...statementLines,
            visiting,
            visitingCaption,
            room,
            roomCaption,
            ...summaryItems,
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
       * VISITING ROOM
       * ----------------------------------------
       * 왼쪽 → 오른쪽
       */
      if (visiting) {
        gsap.fromTo(
          visiting,
          {
            opacity: 0,
            x: -44,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: visiting,
              start: "top 86%",
              once: true,
            },
          },
        );
      }

      /*
       * VISITING CAPTION
       * ----------------------------------------
       * 이미지보다 조금 늦게
       */
      if (visitingCaption) {
        gsap.fromTo(
          visitingCaption,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay: 0.16,
            ease: "power2.out",
            scrollTrigger: {
              trigger: visiting,
              start: "top 86%",
              once: true,
            },
          },
        );
      }

      /*
       * ROOM
       * ----------------------------------------
       * 오른쪽 → 왼쪽
       */
      if (room) {
        gsap.fromTo(
          room,
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
              trigger: room,
              start: "top 86%",
              once: true,
            },
          },
        );
      }

      /*
       * ROOM CAPTION
       * ----------------------------------------
       * 이미지보다 조금 늦게
       */
      if (roomCaption) {
        gsap.fromTo(
          roomCaption,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: room,
              start: "top 86%",
              once: true,
            },
          },
        );
      }

      /*
       * SUMMARY
       * ----------------------------------------
       * 01 → 02 → 03 순차 등장
       */
      if (summaryItems.length > 0) {
        gsap.fromTo(
          summaryItems,
          {
            opacity: 0,
            y: 24,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.16,
            ease: "power3.out",
            scrollTrigger: {
              trigger: summaryRef.current,
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
          <span>CASE 03</span>
          <span>/</span>
          <span>VISUAL DIRECTION</span>
        </p>

        <h2 ref={statementRef} className={styles.statement}>
          <span>공간이 가진 차분한 인상을,</span>
          <span>색과 여백의 방향으로 구체화했습니다.</span>
        </h2>

        <div className={styles.visualFlow}>
          <SpaceBlock
            articleRef={visitingRef}
            image={VISITING_IMAGE}
            imageAlt="웰산후조리원 방문실 공간"
            label="SPACE / 01 — VISITING ROOM"
            swatch="#4B8174"
            name="MUTED GREEN"
            description="공간의 차분한 인상을 화면의 주요 색으로 연결"
            className={styles.greenBlock}
          />

          <SpaceBlock
            articleRef={roomRef}
            image={ROOM_IMAGE}
            imageAlt="웰산후조리원 객실 공간"
            label="SPACE / 02 — ROOM"
            swatch="#DEAD8D"
            name="WARM NEUTRAL"
            description="공간의 따뜻한 인상을 편안한 배경 톤으로 연결"
            className={styles.neutralBlock}
          />
        </div>
      </Container>

      <div className={styles.summaryBand}>
        <Container>
          <div ref={summaryRef} className={styles.summaryGrid}>
            {principles.map((item) => (
              <div key={item.index} className={styles.summaryItem}>
                <span className={styles.summaryIndex}>{item.index}</span>

                <div className={styles.summaryContent}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
