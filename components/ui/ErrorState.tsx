import { View, type ViewStyle } from 'react-native';

import { spacing } from '@/constants/spacing';

import { AppText } from './AppText';
import { Button } from './Button';

type ErrorStateProps = {
  title?: string;
  message: string;
  actionLabel?: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = 'Something went wrong',
  message,
  actionLabel = 'Try again',
  onRetry,
}: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <AppText variant="section">{title}</AppText>
      <AppText variant="secondary" color="textSecondary">
        {message}
      </AppText>
      {onRetry ? <Button label={actionLabel} onPress={onRetry} /> : null}
    </View>
  );
}

const styles = {
  container: {
    gap: spacing.md,
    paddingVertical: spacing.xxxl,
  } satisfies ViewStyle,
};
