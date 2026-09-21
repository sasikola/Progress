import { useState } from 'react';
import { View, type ViewStyle } from 'react-native';

import { AppText, Button, Card, Screen } from '@/components/ui';
import { spacing } from '@/constants/spacing';
import { useAuth } from '@/features/auth/auth-provider';
import { getAuthErrorMessage } from '@/features/auth/map-auth-error';

export default function YouScreen() {
  const { userEmail, signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSignOut = async () => {
    setError(null);
    setIsSigningOut(true);
    try {
      await signOut();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : getAuthErrorMessage(caught));
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <AppText variant="heading">You</AppText>
        <AppText variant="secondary" color="textSecondary">
          Profile, units, privacy, and account controls will appear here.
        </AppText>
        <Card>
          <AppText variant="section">Profile</AppText>
          <AppText variant="secondary" color="textMuted">
            {userEmail ?? 'Signed in'}
          </AppText>
        </Card>
        {error ? (
          <AppText variant="secondary" color="danger">
            {error}
          </AppText>
        ) : null}
        <Button
          label="Log out"
          variant="secondary"
          loading={isSigningOut}
          onPress={() => {
            void onSignOut();
          }}
        />
      </View>
    </Screen>
  );
}

const styles = {
  container: {
    gap: spacing.lg,
  } satisfies ViewStyle,
};
