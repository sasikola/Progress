import { Redirect, Stack } from 'expo-router';

import { colors } from '@/constants/colors';
import { useAuth } from '@/features/auth/auth-provider';

export default function OnboardingLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/welcome" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}
