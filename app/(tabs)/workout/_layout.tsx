import { Stack } from 'expo-router';

import { colors } from '@/constants/colors';

export default function WorkoutTabLayout() {
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
      <Stack.Screen name="start" options={{ title: 'Start workout' }} />
      <Stack.Screen name="exercises" options={{ title: 'Exercises' }} />
      <Stack.Screen name="active" options={{ title: 'Workout' }} />
      <Stack.Screen name="finish" options={{ title: 'Finish workout' }} />
      <Stack.Screen name="summary" options={{ title: 'Summary' }} />
      <Stack.Screen name="history" options={{ title: 'History' }} />
      <Stack.Screen name="[id]" options={{ title: 'Workout' }} />
    </Stack>
  );
}
