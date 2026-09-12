import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#08090a',
        carbon: '#0f1011',
        obsidian: '#161718',
        graphite: '#23252a',
        smoke: '#383b3f',
        ash: '#62666d',
        fog: '#8a8f98',
        mist: '#d0d6e0',
        bone: '#e5e5e6',
        paper: '#ffffff',
        accent: '#e4f222',
        pulse: '#27a644',
        coral: '#eb5757',
        signal: '#02b8cc',
        iris: '#6366f1',
        lavender: '#8b5cf6',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        lab: '1200px',
      },
      borderRadius: {
        lab: '6px',
        panel: '12px',
      },
      boxShadow: {
        hairline: 'inset 0 0 0 1px rgba(35, 37, 42, 1)',
        lift: '0 2px 4px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
