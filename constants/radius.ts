export const radius = {
  small: 8,
  medium: 12,
  large: 16,
  pill: 999,
} as const;

export type RadiusToken = keyof typeof radius;
