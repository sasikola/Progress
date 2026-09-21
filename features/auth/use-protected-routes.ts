import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';

export function useProtectedRoutes(isReady: boolean, isAuthenticated: boolean) {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/welcome');
      return;
    }

    if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, isReady, router, segments]);
}
