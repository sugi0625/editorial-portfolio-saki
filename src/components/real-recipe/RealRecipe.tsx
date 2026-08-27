"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { Container } from "@/components/editorial/Container";
import { gsap } from "@/lib/gsap";

import styles from "./RealRecipe.module.css";

const projectImages = [
  {
    src: "/media/real_recipe/ui_img01.png",
    alt: "Real Recipe 메인 레시피 화면",
  },
  {
    src: "/media/real_recipe/ui_img02.png",
    alt: "Real Recipe 레시피 작성 화면",
  },
  {
    src: "/media/real_recipe/ui_img03.png",
    alt: "Real Recipe 레시피 상세 화면",
  },
  {
    src: "/media/real_recipe/ui_img04.png",
    alt: "Real Recipe 스크랩 화면",
  },
] as const;

export default function RealRecipe() {
  const sectionRef = useRef<HTMLElement>(null);

  const topMetaRef = useRef<HTMLDivElement>(null);
  const projectIndexRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const screenGridRef = useRef<HTMLDivElement>(null);
  const screenRefs = useRef<(HTMLElement | null)[]>([]);

  const projectMetaRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const topMeta = topMetaRef.current;
    const projectIndex = projectIndexRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;

    const screenGrid = screenGridRef.current;

    const screens = screenRefs.current.filter(
      (screen): screen is HTMLElement => screen !== null,
    );

    const projectMeta = projectMetaRef.current;

    if (
      !section ||
      !topMeta ||
      !projectIndex ||
      !title ||
      !description ||
      !screenGrid ||
      screens.length !== projectImages.length ||
      !projectMeta
    ) {
      return;
    }

    const revealElements = [
      topMeta,
      projectIndex,
      title,
      description,
      ...screens,
      projectMeta,
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
      /* ---------------------------------
         TOP META
         SELECTED WORK / PRODUCT UI
      ---------------------------------- */

      gsap.set(topMeta, {
        autoAlpha: 0,
        y: 16,
      });

      gsap.to(topMeta, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: topMeta,
          start: "top 88%",
          once: true,
        },
      });

      /* ---------------------------------
         PROJECT INDEX
         01 / PERSONAL PROJECT
      ---------------------------------- */

      gsap.set(projectIndex, {
        autoAlpha: 0,
        y: 18,
      });

      gsap.to(projectIndex, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: projectIndex,
          start: "top 87%",
          once: true,
        },
      });

      /* ---------------------------------
         REAL RECIPE TITLE
      ---------------------------------- */

      gsap.set(title, {
        autoAlpha: 0,
        y: 36,
      });

      gsap.to(title, {
        autoAlpha: 1,
        y: 0,
        duration: 1.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: title,
          start: "top 84%",
          once: true,
        },
      });

      /* ---------------------------------
         DESCRIPTION
      ---------------------------------- */

      gsap.set(description, {
        autoAlpha: 0,
        y: 28,
      });

      gsap.to(description, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: description,
          start: "top 86%",
          once: true,
        },
      });

      /* ---------------------------------
         UI SCREENS
         모두 아래 → 위
         01 → 02 → 03 → 04
         0.15초 간격
      ---------------------------------- */

      gsap.set(screens, {
        autoAlpha: 0,
        y: 44,
      });

      gsap.to(screens, {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        delay: 0.3,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: screenGrid,
          start: "top 82%",
          once: true,
        },
      });

      /* ---------------------------------
         BOTTOM META
      ---------------------------------- */

      gsap.set(projectMeta, {
        autoAlpha: 0,
        y: 18,
      });

      gsap.to(projectMeta, {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        ease: "power2.out",
        scrollTrigger: {
          trigger: projectMeta,
          start: "top 90%",
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
      aria-labelledby="real-recipe-title"
    >
      <Container>
        <div ref={topMetaRef} className={styles.topMeta}>
          <p className={styles.sectionLabel}>SELECTED WORK</p>

          <p className={styles.category}>PRODUCT UI / MOBILE</p>
        </div>

        <div className={styles.intro}>
          <div className={styles.titleGroup}>
            <p ref={projectIndexRef} className={styles.projectIndex}>
              01 / PERSONAL PROJECT
            </p>

            <h2 ref={titleRef} id="real-recipe-title" className={styles.title}>
              <span>REAL</span>
              <span>RECIPE</span>
            </h2>
          </div>

          <div ref={descriptionRef} className={styles.descriptionGroup}>
            <p className={styles.lead}>
              <span>레시피를 찾는 것부터</span>
              <span>작성하고 공유하는 과정까지.</span>
            </p>

            <p className={styles.description}>
              <span>검색, 레시피 작성, 재료 등록, 댓글, 공유, 스크랩 등</span>
              <span>주요 화면을 직접 기획하고 디자인했습니다.</span>
            </p>
          </div>
        </div>

        <div className={styles.visualArea}>
          <div ref={screenGridRef} className={styles.screenGrid}>
            {projectImages.map((image, index) => (
              <figure
                key={image.src}
                ref={(node) => {
                  screenRefs.current[index] = node;
                }}
                className={`${styles.screenItem} ${
                  index === 1 || index === 3 ? styles.screenOffset : ""
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={336}
                  height={690}
                  className={styles.screenImage}
                  sizes="
                    (max-width: 640px) calc(50vw - 36px),
                    (max-width: 1024px) calc(50vw - 64px),
                    336px
                  "
                />
              </figure>
            ))}
          </div>

          <p ref={projectMetaRef} className={styles.projectMeta}>
            PERSONAL PROJECT · PLANNING
            <br />
            UI DESIGN · PIXSO
          </p>
        </div>
      </Container>
    </section>
  );
}
