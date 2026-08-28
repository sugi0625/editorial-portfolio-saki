import { gsap } from "@/lib/gsap";

type RevealYOptions = {
  y: number;
  duration: number;
  start?: string;
  trigger?: HTMLElement;
  delay?: number;
  ease?: string;
};

type StaggerYOptions = RevealYOptions & {
  stagger: number;
};

export function resetMotionElements(elements: HTMLElement[]) {
  gsap.set(elements, {
    clearProps: "opacity,transform,visibility",
  });
}

export function revealY(element: HTMLElement, options: RevealYOptions) {
  const {
    y,
    duration,
    start = "top 86%",
    trigger = element,
    delay = 0,
    ease = "power2.out",
  } = options;

  return gsap.fromTo(
    element,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger,
        start,
        once: true,
      },
    },
  );
}

export function staggerY(elements: HTMLElement[], options: StaggerYOptions) {
  const {
    y,
    duration,
    stagger,
    start = "top 86%",
    trigger = elements[0],
    delay = 0,
    ease = "power2.out",
  } = options;

  return gsap.fromTo(
    elements,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: {
        trigger,
        start,
        once: true,
      },
    },
  );
}
