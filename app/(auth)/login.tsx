import { Link, router } from 'expo-router';
import { useState } from 'react';
import { View, type ViewStyle } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { AppText, Button, Screen } from '@/components/ui';
import { spacing } from '@/constants/spacing';
import { FormTextField } from '@/features/auth/form-text-field';
import { loginSchema, type LoginFormValues } from '@/features/auth/auth-schema';
import { signInWithEmail } from '@/features/auth/auth-service';

export default function LoginScreen() {
  const [formError, setFormError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setFormError(null);
    try {
      await signInWithEmail(email, password);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to log in.');
    }
  });

  return (
    <Screen scroll>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText variant="heading">Log in</AppText>
          <AppText variant="secondary" color="textSecondary">
            Welcome back. Continue tracking your progress.
          </AppText>
        </View>

        <View style={styles.form}>
          <FormTextField
            control={control}
            name="email"
            label="Email"
            autoComplete="email"
            keyboardType="email-address"
            placeholder="you@example.com"
            error={errors.email?.message}
          />
          <FormTextField
            control={control}
            name="password"
            label="Password"
            secureTextEntry
            autoComplete="password"
            placeholder="Your password"
            error={errors.password?.message}
          />
          {formError ? (
            <AppText variant="secondary" color="danger">
              {formError}
            </AppText>
          ) : null}
        </View>

        <View style={styles.actions}>
          <Button
            label="Log In"
            loading={isSubmitting}
            onPress={() => {
              void onSubmit();
            }}
          />
          <Button label="Back" variant="ghost" onPress={() => router.back()} />
          <Link href="/forgot-password">
            <AppText variant="secondary" color="textSecondary">
              Forgot password
            </AppText>
          </Link>
          <Link href="/signup">
            <AppText variant="secondary" color="textSecondary">
              Create account
            </AppText>
          </Link>
        </View>
      </View>
    </Screen>
  );
}

const styles = {
  container: {
    gap: spacing.xxxl,
    paddingTop: spacing.lg,
  } satisfies ViewStyle,
  header: {
    gap: spacing.sm,
  } satisfies ViewStyle,
  form: {
    gap: spacing.lg,
  } satisfies ViewStyle,
  actions: {
    gap: spacing.md,
    alignItems: 'center',
  } satisfies ViewStyle,
};
