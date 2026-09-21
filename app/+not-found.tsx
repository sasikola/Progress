import { Link, Stack } from 'expo-router';
import { View, type ViewStyle } from 'react-native';

import { AppText, Button, Screen } from '@/components/ui';
import { spacing } from '@/constants/spacing';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found', headerShown: true }} />
      <Screen>
        <View style={styles.container}>
          <AppText variant="heading">This screen doesn’t exist.</AppText>
          <AppText variant="secondary" color="textSecondary">
            Check the path or go back to the start of the app.
          </AppText>
          <Link href="/welcome" asChild>
            <Button label="Go to welcome" />
          </Link>
        </View>
      </Screen>
    </>
  );
}

const styles = {
  container: {
    gap: spacing.lg,
  } satisfies ViewStyle,
};
