import { router } from 'expo-router';
import { View, type ViewStyle } from 'react-native';

import { AppText, Button, Screen } from '@/components/ui';
import { spacing } from '@/constants/spacing';

export default function WelcomeScreen() {
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.hero}>
          <AppText variant="display">Progress</AppText>
          <AppText variant="section" color="textSecondary">
            Train. Track. Progress.
          </AppText>
        </View>

        <View style={styles.copy}>
          <AppText color="textSecondary">Track your workouts.</AppText>
          <AppText color="textSecondary">See your progress.</AppText>
          <AppText color="textSecondary">Build consistency.</AppText>
        </View>

        <View style={styles.actions}>
          <Button label="Get Started" onPress={() => router.push('/signup')} />
          <Button
            label="Log In"
            variant="secondary"
            onPress={() => router.push('/login')}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: spacing.huge,
    paddingBottom: spacing.lg,
  } satisfies ViewStyle,
  hero: {
    gap: spacing.sm,
  } satisfies ViewStyle,
  copy: {
    gap: spacing.sm,
  } satisfies ViewStyle,
  actions: {
    gap: spacing.md,
  } satisfies ViewStyle,
};
