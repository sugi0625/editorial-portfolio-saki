"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/editorial/Container";
import { gsap } from "@/lib/gsap";
import styles from "./SeoDaeguFinal.module.css";

export function SeoDaeguFinal() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const heroRef = useRef<HTMLImageElement>(null);
  const ui01Ref = useRef<HTMLImageElement>(null);
  const ui02Ref = useRef<HTMLImageElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const viewRef = useRef<HTMLAnchorElement>(null);
  const endRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const hero = heroRef.current;
    const ui01 = ui01Ref.current;
    const ui02 = ui02Ref.current;
    const statement = statementRef.current;
    const view = viewRef.current;
    const end = endRef.current;

    if (
      !section ||
      !label ||
      !hero ||
      !ui01 ||
      !ui02 ||
      !statement ||
      !view ||
      !end
    ) {
      return;
    }

    const revealElements = [label, hero, ui01, ui02, statement, view, end];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(revealElements, {
        clearProps: "opacity,transform,visibility",
      });
      return;
    }

    const motion = gsap.context(() => {
      const reveal = (
        element: HTMLElement,
        y: number,
        duration: number,
        ease: string,
        start: string,
        scale?: number,
      ) => {
        gsap.set(element, {
          autoAlpha: 0,
          y,
          ...(scale === undefined ? {} : { scale }),
        });
        gsap.to(element, {
          autoAlpha: 1,
          y: 0,
          ...(scale === undefined ? {} : { scale: 1 }),
          duration,
          ease,
          scrollTrigger: {
            trigger: element,
            start,
            once: true,
          },
        });
      };

      reveal(label, 12, 0.8, "power2.out", "top 88%");
      reveal(hero, 36, 1.2, "power3.out", "top 84%", 0.985);
      reveal(ui01, 40, 1.1, "power3.out", "top 86%");
      reveal(ui02, 40, 1.1, "power3.out", "top 86%");
      reveal(statement, 24, 1, "power3.out", "top 85%");
      reveal(view, 12, 0.75, "power2.out", "top 92%");
      reveal(end, 12, 0.75, "power2.out", "top 92%");
    }, section);

    return () => motion.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="seo-daegu-final-title"
    >
      <Container>
        <p ref={labelRef} className={styles.label}>
          CASE 01 / FINAL INTERFACE
        </p>

        <div className={styles.heroVisual}>
          <Image
            ref={heroRef}
            className={styles.heroImage}
            src="/media/icf/ict_img04_02.jpg"
            alt="서대구산단 웹사이트의 데스크톱과 모바일 최종 인터페이스"
            width={1232}
            height={820}
            sizes="(max-width: 900px) calc(100vw - 48px), min(64.167vw, 1232px)"
          />
        </div>

        <div className={styles.showcase}>
          <figure className={styles.leftVisual}>
            <Image
              ref={ui01Ref}
              className={styles.showcaseImage}
              src="/media/icf/ict_img05.jpg"
              alt="서대구산단 미래2 시설 최종 화면"
              width={680}
              height={900}
              sizes="(max-width: 900px) calc(100vw - 48px), min(35.417vw, 680px)"
            />
          </figure>

          <figure className={styles.rightVisual}>
            <Image
              ref={ui02Ref}
              className={styles.showcaseImage}
              src="/media/icf/ict_img06.jpg"
              alt="서대구산단 미래홀 최종 화면"
              width={540}
              height={870}
              sizes="(max-width: 900px) calc(100vw - 48px), min(28.125vw, 540px)"
            />
          </figure>
        </div>

        <div className={styles.closing}>
          <div className={styles.closingCopy}>
            <h2
              ref={statementRef}
              id="seo-daegu-final-title"
              className={styles.statement}
            >
              <span>주어진 조건 안에서,</span>
              <span>필요한 변화를 선택했습니다.</span>
            </h2>

            <a
              ref={viewRef}
              className={styles.liveSite}
              href="https://sdg-future.kr/"
              target="_blank"
              rel="noreferrer"
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
            END OF CASE 01
          </p>
        </div>
      </Container>
    </section>
  );
}
