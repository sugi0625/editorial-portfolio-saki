"use client";

import { useLayoutEffect, useRef } from "react";
import { Container, EditorialHeading } from "@/components/editorial";
import { gsap } from "@/lib/gsap";
import styles from "./Hero.module.css";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const backgroundNameRef = useRef<HTMLParagraphElement>(null);
  const backgroundRoleRef = useRef<HTMLParagraphElement>(null);
  const backgroundSinceRef = useRef<HTMLParagraphElement>(null);
  const runningTitleRef = useRef<HTMLParagraphElement>(null);
  const metadataRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const statement = hero.querySelector<HTMLElement>("#hero-title");
    const statementLines = statement
      ? Array.from(statement.querySelectorAll<HTMLElement>("span"))
      : [];
    const foregroundText = [
      runningTitleRef.current,
      ...statementLines,
      metadataRef.current,
    ];
    const backgroundLines = [
      backgroundNameRef.current,
      backgroundRoleRef.current,
      backgroundSinceRef.current,
    ];
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      gsap.set([...backgroundLines, ...foregroundText], {
        clearProps: "opacity,transform",
      });

      return;
    }

    const motion = gsap.context(() => {
      const mobile = window.matchMedia("(max-width: 47.999rem)").matches;
      const backgroundMotion = [
        {
          element: backgroundNameRef.current,
          distance: mobile ? -91 : -140,
          duration: 22,
        },
        {
          element: backgroundRoleRef.current,
          distance: mobile ? 117 : 180,
          duration: 20,
        },
        {
          element: backgroundSinceRef.current,
          distance: mobile ? -78 : -120,
          duration: 24,
        },
      ];

      backgroundMotion.forEach(({ element, distance, duration }) => {
        gsap.fromTo(
          element,
          { x: 0 },
          {
            x: distance,
            duration,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          },
        );
      });

      const entrance = gsap.timeline();

      entrance.fromTo(
        backgroundLines,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 1.6,
          ease: "power2.out",
        },
        0,
      );

      entrance.fromTo(
        runningTitleRef.current,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 1,
          ease: "power2.out",
        },
        0.35,
      );

      entrance.fromTo(
        statementLines,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          force3D: false,
          modifiers: {
            y: (value) => `${Math.round(Number.parseFloat(value))}px`,
          },
          stagger: 0.3,
        },
        0.55,
      );

      entrance.set(
        statementLines,
        { clearProps: "transform,translate,rotate,scale" },
        2.6,
      );

      entrance.fromTo(
        metadataRef.current,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 1,
          ease: "power2.out",
        },
        1.35,
      );
    }, hero);

    return () => motion.revert();
  }, []);

  return (
    <section ref={heroRef} className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.background} aria-hidden="true">
        <div className={styles.backgroundCanvas} lang="en">
          <p
            ref={backgroundNameRef}
            className={`${styles.backgroundType} ${styles.backgroundName}`}
          >
            LEE&nbsp;&nbsp;HYE&nbsp;&nbsp;SUK
          </p>
          <p
            ref={backgroundRoleRef}
            className={`${styles.backgroundType} ${styles.backgroundRole}`}
          >
            UI DESIGNER
          </p>
          <p
            ref={backgroundSinceRef}
            className={`${styles.backgroundType} ${styles.backgroundSince}`}
          >
            SINCE 2005
          </p>
        </div>
      </div>

      <Container className={styles.composition}>
        <p ref={runningTitleRef} className={styles.runningTitle} lang="en">
          LEE HYE SUK · EDITORIAL PORTFOLIO
        </p>

        <div className={styles.main}>
          <EditorialHeading
            className={styles.statement}
            id="hero-title"
            level={1}
            size="display"
          >
            <span className={styles.statementLine}>정보를 이해하고</span>
            <span className={styles.statementLine}>구조를 설계하고</span>
            <span className={styles.statementLine}>화면을 만듭니다.</span>
          </EditorialHeading>

          <p ref={metadataRef} className={styles.metadata} lang="en">
            LEE HYE SUK · UI DESIGNER · SINCE 2005
          </p>
        </div>
      </Container>
    </section>
  );
}
