"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { Container } from "@/components/editorial/Container";
import { gsap } from "@/lib/gsap";

import styles from "./SmileFarm.module.css";

const showcaseItems = [
  {
    number: "01",
    title: "DEVICE STATUS",
    description: "Equipment · Status",
    src: "/media/smile_farm/ui_img01.png",
    alt: "Smile Farm 온실 장비 상태 확인 화면",
    className: styles.device,
  },
  {
    number: "02",
    title: "REMOTE CONTROL",
    description: "Window · Curtain · Ventilation",
    src: "/media/smile_farm/ui_img02.png",
    alt: "Smile Farm 온실 원격 제어 화면",
    className: styles.remote,
  },
  {
    number: "03",
    title: "CCTV / PTZ",
    description: "Monitor · Camera Control",
    src: "/media/smile_farm/ui_img03.png",
    alt: "Smile Farm CCTV 및 PTZ 관제 화면",
    className: styles.cctv,
  },
] as const;

export default function SmileFarm() {
  const sectionRef = useRef<HTMLElement>(null);

  const projectMetaRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const showcaseRef = useRef<HTMLDivElement>(null);
  const showcaseRefs = useRef<(HTMLElement | null)[]>([]);

  const footerMetaRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const projectMeta = projectMetaRef.current;
    const statement = statementRef.current;
    const stats = statsRef.current;
    const showcase = showcaseRef.current;

    const showcaseElements = showcaseRefs.current.filter(
      (item): item is HTMLElement => item !== null,
    );

    const footerMeta = footerMetaRef.current;

    if (
      !section ||
      !projectMeta ||
      !statement ||
      !stats ||
      !showcase ||
      showcaseElements.length !== showcaseItems.length ||
      !footerMeta
    ) {
      return;
    }

    const revealElements = [
      projectMeta,
      statement,
      stats,
      ...showcaseElements,
      footerMeta,
    ];

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      gsap.set(revealElements, {
        clearProps: "opacity,transform,visibility",
      });

      return;
    }

    const motion = gsap.context(() => {
      const revealFromBottom = (
        element: HTMLElement,
        y: number,
        duration: number,
        start: string,
      ) => {
        gsap.set(element, {
          autoAlpha: 0,
          y,
        });

        gsap.to(element, {
          autoAlpha: 1,
          y: 0,
          duration,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start,
            once: true,
          },
        });
      };

      // PROJECT META
      revealFromBottom(projectMeta, 20, 0.85, "top 88%");

      // MAIN STATEMENT
      revealFromBottom(statement, 32, 1.05, "top 84%");

      // STATS
      revealFromBottom(stats, 24, 0.9, "top 88%");

      // UI 01 → 02 → 03
      // 아래에서 위로 0.18초 간격
      gsap.set(showcaseElements, {
        autoAlpha: 0,
        y: 44,
      });

      gsap.to(showcaseElements, {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        delay: 0.3,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: showcase,
          start: "top 82%",
          once: true,
        },
      });

      // FOOTER META
      revealFromBottom(footerMeta, 18, 0.85, "top 90%");
    }, section);

    return () => motion.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="smile-farm-title"
    >
      <Container>
        <header className={styles.header}>
          {/* Project Information */}
          <div ref={projectMetaRef} className={styles.projectMeta}>
            <p className={styles.projectIndex}>02 / PRODUCT UI</p>

            <p className={styles.projectName}>SMART FARM CONTROL</p>
          </div>

          <div className={styles.intro}>
            {/* Main Statement */}
            <h2
              ref={statementRef}
              id="smile-farm-title"
              className={styles.statement}
            >
              <span>흩어진 온실을,</span>
              <span>하나의 화면에서 관제하다.</span>
            </h2>

            {/* Project Statistics */}
            <div ref={statsRef} className={styles.stats}>
              <div className={styles.stat}>
                <strong>24+</strong>
                <span>CONTROL DEVICES</span>
              </div>

              <div className={styles.stat}>
                <strong>18</strong>
                <span>VIDEO DEVICES</span>
              </div>
            </div>
          </div>
        </header>

        <div ref={showcaseRef} className={styles.showcase}>
          {showcaseItems.map((item, index) => (
            <article
              key={item.number}
              ref={(node) => {
                showcaseRefs.current[index] = node;
              }}
              className={`${styles.showcaseItem} ${item.className}`}
            >
              <div className={styles.itemMeta}>
                <h3>
                  <span>{item.number}</span>
                  <span>/</span>
                  <span>{item.title}</span>
                </h3>

                <p>{item.description}</p>
              </div>

              {/* UI Image */}
              <Image
                src={item.src}
                alt={item.alt}
                width={412}
                height={894}
                className={styles.screenImage}
                sizes="
                  (max-width: 640px) calc(100vw - 48px),
                  (max-width: 900px) min(calc(100vw - 64px), 420px),
                  22vw
                "
              />
            </article>
          ))}
        </div>

        <p ref={footerMetaRef} className={styles.footerMeta}>
          SMART FARM MOBILE UI · 2025
          <br />
          SUPPORT PROJECT · PRE-LAUNCH
        </p>
      </Container>
    </section>
  );
}
