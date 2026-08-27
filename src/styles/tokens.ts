export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1440,
} as const;

export const motion = {
  duration: {
    fast: 0.2,
    base: 0.8,
    slow: 1.2,
    background: 25,
  },
  ease: [0.22, 1, 0.36, 1] as const,
  distance: 20,
} as const;

export const layers = {
  base: 0,
  content: 10,
  sticky: 20,
  navigation: 40,
  overlay: 60,
  modal: 80,
} as const;
