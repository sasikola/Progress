export const colors = {
  background: '#0B0D10',
  surface: '#14171C',
  surfaceElevated: '#1B1F26',

  textPrimary: '#FFFFFF',
  textSecondary: '#A7ADB8',
  textMuted: '#6F7682',

  border: '#292E36',

  primary: '#FFFFFF',
  primaryText: '#0B0D10',

  success: '#35C759',
  warning: '#FFCC00',
  danger: '#FF453A',

  overlay: 'rgba(0,0,0,0.6)',
} as const;

export type ColorToken = keyof typeof colors;
