"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/editorial/Container";
import { gsap } from "@/lib/gsap";
import styles from "./SeoDaeguRefine.module.css";

export function SeoDaeguRefine() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const keepImageRef = useRef<HTMLImageElement>(null);
  const keepCaptionRef = useRef<HTMLElement>(null);
  const changeImageRef = useRef<HTMLImageElement>(null);
  const changeCaptionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const statement = statementRef.current;
    const keepImage = keepImageRef.current;
    const keepCaption = keepCaptionRef.current;
    const changeImage = changeImageRef.current;
    const changeCaption = changeCaptionRef.current;

    if (
      !section ||
      !label ||
      !statement ||
      !keepImage ||
      !keepCaption ||
      !changeImage ||
      !changeCaption
    ) {
      return;
    }

    const revealElements = [
      label,
      statement,
      keepImage,
      keepCaption,
      changeImage,
      changeCaption,
    ];

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
        start: string,
      ) => {
        gsap.set(element, { autoAlpha: 0, y });
        gsap.to(element, {
          autoAlpha: 1,
          y: 0,
          duration,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start,
            once: true,
          },
        });
      };

      reveal(label, 20, 0.8, "top 88%");
      reveal(statement, 32, 1, "top 85%");
      reveal(keepImage, 32, 1, "top 86%");
      reveal(keepCaption, 24, 0.8, "top 88%");
      reveal(changeImage, 32, 1, "top 86%");
      reveal(changeCaption, 24, 0.8, "top 88%");
    }, section);

    return () => motion.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="seo-daegu-refine-title">
      <Container>
        <p ref={labelRef} className={styles.label}>CASE 01 / REFINE THE FLOW</p>

        <div className={styles.container}>
          <div className={styles.statementRow}>
            <h2 ref={statementRef} id="seo-daegu-refine-title" className={styles.statement}>
              <span>기능은 유지하고,</span>
              <span>사용 흐름을</span>
              <span>다시 정리했습니다.</span>
            </h2>
          </div>

          <div className={styles.comparison}>
            <figure className={styles.keepBlock}>
              <Image ref={keepImageRef} className={styles.keepImage} src="/media/icf/ict_img02.jpg" alt="기존 예약 및 회원관리 화면" width={800} height={1300} sizes="420px" />
              <figcaption ref={keepCaptionRef} className={styles.caption}>
                <strong className={styles.captionTitle}>KEEP</strong>
                <span className={styles.captionCopy}>기존 예약 · 회원관리 기능 유지</span>
              </figcaption>
            </figure>

            <figure className={styles.changeBlock}>
              <Image ref={changeImageRef} className={styles.changeImage} src="/media/icf/ict_img03.jpg" alt="개선된 대관 신청 화면" width={800} height={1120} sizes="570px" />
              <figcaption ref={changeCaptionRef} className={styles.caption}>
                <strong className={styles.captionTitle}>CHANGE</strong>
                <span className={styles.captionCopy}>불필요한 UI 정리<br />선택 · 입력 흐름 명확화</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
