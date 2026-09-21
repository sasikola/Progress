import { View, type ViewStyle } from 'react-native';

import { AppText, Card, EmptyState, Screen } from '@/components/ui';
import { spacing } from '@/constants/spacing';

export default function HomeScreen() {
  return (
    <Screen scroll>
      <View style={styles.container}>
        <AppText variant="heading">Home</AppText>
        <AppText variant="secondary" color="textSecondary">
          Your progress summary will appear here after workouts are logged.
        </AppText>
        <Card>
          <EmptyState
            title="Your progress starts here."
            message="Start your first workout and your progress will appear here."
          />
        </Card>
      </View>
    </Screen>
  );
}

const styles = {
  container: {
    gap: spacing.lg,
  } satisfies ViewStyle,
};
