import { View, type ViewStyle } from 'react-native';

import { AppText, Card, Screen } from '@/components/ui';
import { spacing } from '@/constants/spacing';

export default function ProgressTabScreen() {
  return (
    <Screen scroll>
      <View style={styles.container}>
        <AppText variant="heading">Progress</AppText>
        <AppText variant="secondary" color="textSecondary">
          Weight, measurements, strength, photos, and PRs will live here.
        </AppText>
        <Card>
          <AppText variant="section">Weight</AppText>
          <AppText variant="secondary" color="textMuted">
            No entries yet
          </AppText>
        </Card>
        <Card>
          <AppText variant="section">Measurements</AppText>
          <AppText variant="secondary" color="textMuted">
            View measurements
          </AppText>
        </Card>
        <Card>
          <AppText variant="section">Photos</AppText>
          <AppText variant="secondary" color="textMuted">
            View photo timeline
          </AppText>
        </Card>
        <Card>
          <AppText variant="section">Personal Records</AppText>
          <AppText variant="secondary" color="textMuted">
            View PRs
          </AppText>
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
