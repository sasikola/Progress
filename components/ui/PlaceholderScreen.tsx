import { View, type ViewStyle } from 'react-native';

import { spacing } from '@/constants/spacing';

import { AppText } from './AppText';
import { Screen } from './Screen';

type PlaceholderScreenProps = {
  title: string;
  description: string;
};

export function PlaceholderScreen({ title, description }: PlaceholderScreenProps) {
  return (
    <Screen>
      <View style={styles.container}>
        <AppText variant="heading">{title}</AppText>
        <AppText variant="secondary" color="textSecondary">
          {description}
        </AppText>
      </View>
    </Screen>
  );
}

const styles = {
  container: {
    gap: spacing.md,
  } satisfies ViewStyle,
};
