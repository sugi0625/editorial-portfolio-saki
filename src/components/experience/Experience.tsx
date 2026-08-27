"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/editorial";
import { gsap } from "@/lib/gsap";
import styles from "./Experience.module.css";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const numberRef = useRef<HTMLImageElement>(null);
  const yearsRef = useRef<HTMLImageElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const capabilitiesRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const number = numberRef.current;
    const years = yearsRef.current;
    const statement = statementRef.current;
    const description = descriptionRef.current;
    const capabilities = capabilitiesRef.current;

    if (
      !section ||
      !label ||
      !number ||
      !years ||
      !statement ||
      !description ||
      !capabilities
    )
      return;

    const revealElements = [
      label,
      number,
      years,
      statement,
      description,
      capabilities,
    ];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(revealElements, {
        clearProps: "opacity,transform,visibility",
      });
      return;
    }

    const motion = gsap.context(() => {
      gsap.set([label, number, years, statement, description, capabilities], {
        autoAlpha: 0,
      });
      gsap.set([number, years], { x: 32 });
      gsap.set(statement, { y: 12 });
      gsap.set(capabilities, { y: 16 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: label,
          start: "top 75%",
          once: true,
        },
      });

      timeline.to(label, { autoAlpha: 1, duration: 0.75, ease: "power2.out" });

      timeline.to(
        number,
        { autoAlpha: 1, x: 0, duration: 1.35, ease: "power2.out" },
        0.12,
      );
      timeline.to(
        years,
        { autoAlpha: 1, x: 0, duration: 1, ease: "power2.out" },
        0.27,
      );
      timeline.to(
        statement,
        { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" },
        0.48,
      );
      timeline.to(
        description,
        { autoAlpha: 1, duration: 0.9, ease: "power2.out" },
        0.68,
      );
      gsap.to(capabilities, {
        autoAlpha: 1,
        y: 0,
        duration: 0.95,
        ease: "power2.out",
        scrollTrigger: {
          trigger: capabilities,
          start: "top 85%",
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
      aria-labelledby="experience-title"
    >
      <Container className={styles.container}>
        <p ref={labelRef} className={styles.label} lang="en">
          <span>03</span>
          <span aria-hidden="true">/</span>
          <span>EXPERIENCE</span>
        </p>

        <p className={styles.experienceMark} aria-label="18 YEARS" lang="en">
          <Image
            ref={numberRef}
            className={styles.number}
            src="/media/about/text_18.png"
            alt=""
            width={1022}
            height={968}
            aria-hidden="true"
          />
          <Image
            ref={yearsRef}
            className={styles.years}
            src="/media/about/text_years.png"
            alt=""
            width={1022}
            height={968}
            aria-hidden="true"
          />
        </p>

        <div className={styles.supporting}>
          <div className={styles.copyGroup}>
            <h2
              ref={statementRef}
              className={styles.statement}
              id="experience-title"
            >
              화면을 만드는 일은
              <br />
              화면에서 끝나지 않았습니다.
            </h2>
            <p ref={descriptionRef} className={styles.description}>
              기획과 UI 디자인부터 HTML/CSS 퍼블리싱,
              <br />
              검수와 클라이언트 커뮤니케이션까지.
              <br />
              프로젝트가 실제 화면이 되는 과정을 직접 경험해왔습니다.
            </p>
          </div>

          <p ref={capabilitiesRef} className={styles.capabilities} lang="en">
            PLANNING&nbsp;&nbsp;—&nbsp;&nbsp;UI
            DESIGN&nbsp;&nbsp;—&nbsp;&nbsp;HTML/CSS&nbsp;&nbsp;—&nbsp;&nbsp;RESPONSIVE
            WEB&nbsp;&nbsp;—&nbsp;&nbsp;QA&nbsp;&nbsp;—&nbsp;&nbsp;COMMUNICATION
          </p>
        </div>
      </Container>
    </section>
  );
}
