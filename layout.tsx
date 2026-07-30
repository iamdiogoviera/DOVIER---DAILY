@import 'tailwindcss';
@import 'tw-animate-css';
@import 'shadcn/tailwind.css';

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;

  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --color-foreground: var(--foreground);
  --color-background: var(--background);

  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
}

/* Always-dark premium theme: black + white + neon green. */
:root,
.dark {
  color-scheme: dark;
  --background: oklch(0.08 0 0);
  --foreground: oklch(0.98 0 0);
  --card: oklch(0.13 0 0);
  --card-foreground: oklch(0.98 0 0);
  --popover: oklch(0.13 0 0);
  --popover-foreground: oklch(0.98 0 0);
  --primary: oklch(0.87 0.23 148);
  --primary-foreground: oklch(0.13 0.03 150);
  --secondary: oklch(0.17 0 0);
  --secondary-foreground: oklch(0.98 0 0);
  --muted: oklch(0.17 0 0);
  --muted-foreground: oklch(0.62 0 0);
  --accent: oklch(0.87 0.23 148);
  --accent-foreground: oklch(0.13 0.03 150);
  --destructive: oklch(0.63 0.24 27);
  --border: oklch(1 0 0 / 9%);
  --input: oklch(1 0 0 / 12%);
  --ring: oklch(0.87 0.23 148);
  --radius: 1rem;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  html {
    @apply bg-background;
  }
  body {
    @apply bg-background text-foreground;
    -webkit-tap-highlight-color: transparent;
  }
}

/* Utility: subtle neon glow used for accents. */
@utility neon-glow {
  box-shadow: 0 0 0 1px oklch(0.87 0.23 148 / 0.35),
    0 0 24px oklch(0.87 0.23 148 / 0.25);
}
