import { Stack } from 'expo-router';

import { colors } from '@/constants/colors';

export default function ProgressTabLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.textPrimary,
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="photos" options={{ title: 'Progress photos' }} />
      <Stack.Screen name="add-photo" options={{ title: 'Add photo' }} />
      <Stack.Screen name="compare" options={{ title: 'Compare' }} />
      <Stack.Screen name="weight" options={{ title: 'Weight' }} />
      <Stack.Screen name="measurements" options={{ title: 'Measurements' }} />
      <Stack.Screen name="records" options={{ title: 'Personal records' }} />
    </Stack>
  );
}
