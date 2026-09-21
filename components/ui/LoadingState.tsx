import { ActivityIndicator, View, type ViewStyle } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

import { AppText } from './AppText';

type LoadingStateProps = {
  label?: string;
};

export function LoadingState({ label = 'Loading…' }: LoadingStateProps) {
  return (
    <View style={styles.container} accessibilityLabel={label}>
      <ActivityIndicator color={colors.textPrimary} />
      <AppText variant="secondary" color="textSecondary">
        {label}
      </AppText>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  } satisfies ViewStyle,
};
