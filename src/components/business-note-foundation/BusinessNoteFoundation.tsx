"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { Container } from "@/components/editorial/Container";
import { gsap } from "@/lib/gsap";

import styles from "./BusinessNoteFoundation.module.css";

const foundations = [
  {
    number: "01",
    title: "BASE",
    description: "Button · Input · App Bar · Tab · Icon",
  },
  {
    number: "02",
    title: "STATES",
    description: "Default · Focus · Disabled · Error",
  },
  {
    number: "03",
    title: "EXTEND",
    description: "화면에 필요한 UI 추가",
  },
] as const;

export function BusinessNoteFoundation() {
  const sectionRef = useRef<HTMLElement>(null);

  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const boardRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLElement>(null);
  const tabRef = useRef<HTMLElement>(null);

  const foundationListRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const label = labelRef.current;
      const title = titleRef.current;
      const description = descriptionRef.current;

      const board = boardRef.current;
      const input = inputRef.current;
      const modal = modalRef.current;
      const button = buttonRef.current;
      const tab = tabRef.current;

      const foundationItems = foundationListRef.current
        ? Array.from(foundationListRef.current.children)
        : [];

      /*
       * Reduced Motion
       */
      if (reduceMotion) {
        gsap.set(
          [
            label,
            title,
            description,
            board,
            input,
            modal,
            button,
            tab,
            ...foundationItems,
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
       * UI FOUNDATION TITLE
       */
      if (title) {
        gsap.fromTo(
          title,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: title,
              start: "top 86%",
              once: true,
            },
          },
        );
      }

      /*
       * DESCRIPTION
       */
      if (description) {
        gsap.fromTo(
          description,
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
              trigger: description,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      /*
       * BOARD
       * ----------------------------------------
       * 이동 없이 Fade Only
       */
      if (board) {
        gsap.fromTo(
          board,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: board,
              start: "top 84%",
              once: true,
            },
          },
        );
      }

      /*
       * INPUT
       * ----------------------------------------
       * 위에서 아래로
       */
      if (input) {
        gsap.fromTo(
          input,
          {
            opacity: 0,
            y: -42,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            delay: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: input,
              start: "top 86%",
              once: true,
            },
          },
        );
      }

      /*
       * BUTTON
       * ----------------------------------------
       * 왼쪽에서 오른쪽
       */
      if (button) {
        gsap.fromTo(
          button,
          {
            opacity: 0,
            x: -48,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.05,
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
       * MODAL
       * ----------------------------------------
       * 오른쪽에서 왼쪽
       */
      if (modal) {
        gsap.fromTo(
          modal,
          {
            opacity: 0,
            x: 48,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: modal,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      /*
       * TAB
       * ----------------------------------------
       * Modal과 같은 방향이지만
       * 조금 더 늦게 등장
       */
      if (tab) {
        gsap.fromTo(
          tab,
          {
            opacity: 0,
            x: 48,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 0.24,
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
       * FOUNDATION LIST
       * ----------------------------------------
       * 01 → 02 → 03
       */
      if (foundationItems.length > 0) {
        gsap.fromTo(
          foundationItems,
          {
            opacity: 0,
            y: 22,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: foundationListRef.current,
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
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="business-note-foundation-title"
    >
      <Container>
        <p ref={labelRef} className={styles.label}>
          CASE 02 / UI FOUNDATION
        </p>

        <div className={styles.intro}>
          <h2
            ref={titleRef}
            id="business-note-foundation-title"
            className={styles.title}
          >
            UI FOUNDATION
          </h2>

          <p ref={descriptionRef} className={styles.description}>
            <span>기본 UI와 상태를 먼저 정의하고,</span>
            <span>화면에 필요한 요소를 같은 규칙 안에서 확장했습니다.</span>
          </p>
        </div>

        <div className={styles.composition}>
          {/* BOARD */}
          <figure ref={boardRef} className={`${styles.visual} ${styles.board}`}>
            <picture>
              <source
                media="(max-width: 900px)"
                srcSet="/media/4uplab/section03_system_m.png"
                width={660}
                height={900}
              />

              <Image
                src="/media/4uplab/section03_system.png"
                alt="사업노트 UI 디자인 시스템 전체 보드"
                width={1330}
                height={875}
                sizes="70vw"
              />
            </picture>
          </figure>

          {/* INPUT */}
          <figure
            ref={inputRef}
            className={`${styles.visual} ${styles.visualCard} ${styles.input}`}
          >
            <Image
              src="/media/4uplab/section03_item01.png"
              alt="Input 컴포넌트 상태 예시"
              width={380}
              height={464}
              sizes="(max-width: 900px) min(calc(100vw - 64px), 380px), 19.79vw"
            />
          </figure>

          {/* MODAL */}
          <figure
            ref={modalRef}
            className={`${styles.visual} ${styles.visualCard} ${styles.modal}`}
          >
            <Image
              src="/media/4uplab/section03_item02.png"
              alt="Modal 컴포넌트 예시"
              width={320}
              height={193}
              sizes="(max-width: 900px) min(calc(100vw - 64px), 320px), 19vw"
            />
          </figure>

          {/* BUTTON */}
          <figure
            ref={buttonRef}
            className={`${styles.visual} ${styles.visualCard} ${styles.button}`}
          >
            <Image
              src="/media/4uplab/opening_img01.png"
              alt="Button 컴포넌트 예시"
              width={508}
              height={272}
              sizes="(max-width: 900px) min(calc(100vw - 64px), 508px), 26.5vw"
            />
          </figure>

          {/* TAB */}
          <figure
            ref={tabRef}
            className={`${styles.visual} ${styles.visualCard} ${styles.tab}`}
          >
            <Image
              src="/media/4uplab/section03_item03.png"
              alt="Tab 컴포넌트 예시"
              width={356}
              height={126}
              sizes="(max-width: 900px) min(calc(100vw - 64px), 356px), 18.54vw"
            />
          </figure>
        </div>

        <div ref={foundationListRef} className={styles.foundationList}>
          {foundations.map((foundation) => (
            <div key={foundation.number} className={styles.foundationItem}>
              <h3 className={styles.foundationTitle}>
                {foundation.number}. {foundation.title}
              </h3>

              <p className={styles.foundationDescription}>
                {foundation.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
