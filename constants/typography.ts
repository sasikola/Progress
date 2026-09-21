export const typography = {
  display: {
    fontSize: 34,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700' as const,
    lineHeight: 32,
  },
  section: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  secondary: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
} as const;

export type TypographyToken = keyof typeof typography;
