import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import { colors } from '@/constants/colors';
import { typography, type TypographyToken } from '@/constants/typography';

type AppTextProps = TextProps & {
  variant?: TypographyToken;
  color?: keyof typeof colors;
};

export function AppText({
  variant = 'body',
  color = 'textPrimary',
  style,
  ...textProps
}: AppTextProps) {
  return (
    <RNText
      style={[typography[variant] as TextStyle, { color: colors[color] }, style]}
      {...textProps}
    />
  );
}
