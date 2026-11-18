/**
 * Single source of truth for the visual and motion language.
 * CSS equivalents live in app/globals.css; keep both in sync.
 */
export const tokens = {
  color: {
    ink: '#0b0b0b',
    inkRaised: '#0e0e0e',
    surface: '#151515',
    paper: '#f3f1ec',
    grey: {
      muted: '#8c8c8c',
      soft: '#5e5e5e',
      line: '#2a2a2a',
    },
    /** Restrained, matching accents: growth, craft and structure. */
    accent: {
      sage: '#b7d36f',
      clay: '#d8a27b',
      slate: '#8fa6b8',
    },
    /** @deprecated Use accent.sage. Kept for existing utility styles. */
    signal: '#b7d36f',
  },
  type: {
    display: 'var(--font-display)',
    sans: 'var(--font-sans)',
    size: {
      xs: 'clamp(0.6875rem, 0.66rem + 0.12vw, 0.75rem)',
      sm: 'clamp(0.8125rem, 0.78rem + 0.16vw, 0.875rem)',
      base: 'clamp(0.9375rem, 0.9rem + 0.18vw, 1.0625rem)',
      lg: 'clamp(1.125rem, 1.05rem + 0.35vw, 1.375rem)',
      h3: 'clamp(1.75rem, 1.4rem + 1.6vw, 2.75rem)',
      h2: 'clamp(2.75rem, 1.8rem + 4.5vw, 6rem)',
      hero: 'clamp(3.25rem, 1.4rem + 9vw, 11.5rem)',
    },
  },
  grid: {
    columns: 12,
    gutter: 'clamp(12px, 1.6vw, 28px)',
    margin: 'clamp(20px, 5vw, 96px)',
    maxWidth: '1680px',
  },
  motion: {
    ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
    easeOut: 'cubic-bezier(0.22, 1, 0.36, 1)',
    duration: {
      instant: 0.18,
      fast: 0.4,
      base: 0.7,
      slow: 1.1,
      preloader: 1.4,
    },
  },
} as const;

/** Matches the CSS media query used for reduced motion. */
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
export const TOUCH_QUERY = '(hover: none), (pointer: coarse)';
