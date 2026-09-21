import { View, type ViewStyle } from 'react-native';

import { spacing } from '@/constants/spacing';

import { AppText } from './AppText';
import { Button } from './Button';

type EmptyStateProps = {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  title,
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <AppText variant="section">{title}</AppText>
      <AppText variant="secondary" color="textSecondary">
        {message}
      </AppText>
      {actionLabel && onAction ? (
        <Button label={actionLabel} onPress={onAction} />
      ) : null}
    </View>
  );
}

const styles = {
  container: {
    gap: spacing.md,
    paddingVertical: spacing.xxxl,
  } satisfies ViewStyle,
};
