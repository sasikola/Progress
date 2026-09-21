import { View, type ViewProps, type ViewStyle } from 'react-native';

import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';

type CardProps = ViewProps & {
  padded?: boolean;
};

export function Card({ padded = true, style, children, ...viewProps }: CardProps) {
  return (
    <View
      style={[styles.card, padded ? styles.padded : null, style]}
      {...viewProps}
    >
      {children}
    </View>
  );
}

const styles = {
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.large,
  } satisfies ViewStyle,
  padded: {
    padding: spacing.lg,
  } satisfies ViewStyle,
};
