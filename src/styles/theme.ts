// Vercel-inspired theme with black and white colors
export const theme = {
  colors: {
    black: '#000000',
    white: '#ffffff',
    gray: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
    },
    red: {
      50: '#fef2f2',
      200: '#fecaca',
      500: '#ef4444',
      600: '#dc2626',
    },
    green: {
      50: '#f0fdf4',
      200: '#bbf7d0',
      500: '#22c55e',
      600: '#16a34a',
    },
  },
  fonts: {
    mono: '"SF Mono", "Monaco", "Inconsolata", "Roboto Mono", "Source Code Pro", monospace',
    sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  spacing: {
    xs: '0.25rem', // 1
    sm: '0.5rem', // 2
    md: '0.75rem', // 3
    lg: '1rem', // 4
    xl: '1.25rem', // 5
    '2xl': '1.5rem', // 6
    '3xl': '2rem', // 8
    '4xl': '2.5rem', // 10
    '5xl': '3rem', // 12
    '6xl': '4rem', // 16
    '7xl': '5rem', // 20
    // Numbered spacing for array-like access
    1: '0.25rem', // xs
    2: '0.5rem', // sm
    3: '0.75rem', // md
    4: '1rem', // lg
    5: '1.25rem', // xl
    6: '1.5rem', // 2xl
    8: '2rem', // 3xl
    10: '2.5rem', // 4xl
    12: '3rem', // 5xl
    16: '4rem', // 6xl
    20: '5rem', // 7xl
  },
  borderRadius: {
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
};
