import { View, type ViewStyle } from 'react-native';

import { AppText, Button, Screen } from '@/components/ui';
import { spacing } from '@/constants/spacing';

export default function WorkoutTabScreen() {
  return (
    <Screen>
      <View style={styles.container}>
        <AppText variant="heading">Workout</AppText>
        <AppText variant="secondary" color="textSecondary">
          Start an empty workout. Logging will be added in a later milestone.
        </AppText>
        <Button label="Start Workout" disabled />
      </View>
    </Screen>
  );
}

const styles = {
  container: {
    gap: spacing.lg,
    paddingTop: spacing.sm,
  } satisfies ViewStyle,
};
