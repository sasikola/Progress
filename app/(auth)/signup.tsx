import { Link, router } from 'expo-router';
import { useState } from 'react';
import { View, type ViewStyle } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { AppText, Button, Screen } from '@/components/ui';
import { spacing } from '@/constants/spacing';
import { FormTextField } from '@/features/auth/form-text-field';
import { signupSchema, type SignupFormValues } from '@/features/auth/auth-schema';
import { signUpWithEmail } from '@/features/auth/auth-service';

export default function SignupScreen() {
  const [formError, setFormError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setFormError(null);
    setInfoMessage(null);
    try {
      const result = await signUpWithEmail(email, password);
      if (result.status === 'confirm_email') {
        setInfoMessage(
          'Account created. Check your email to confirm, then log in.',
        );
      }
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : 'Unable to create your account.',
      );
    }
  });

  return (
    <Screen scroll>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText variant="heading">Create account</AppText>
          <AppText variant="secondary" color="textSecondary">
            Use your email to start tracking workouts and progress.
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
            autoComplete="new-password"
            placeholder="At least 8 characters"
            error={errors.password?.message}
          />
          <FormTextField
            control={control}
            name="confirmPassword"
            label="Confirm password"
            secureTextEntry
            autoComplete="new-password"
            placeholder="Repeat password"
            error={errors.confirmPassword?.message}
          />
          {formError ? (
            <AppText variant="secondary" color="danger">
              {formError}
            </AppText>
          ) : null}
          {infoMessage ? (
            <AppText variant="secondary" color="textSecondary">
              {infoMessage}
            </AppText>
          ) : null}
        </View>

        <View style={styles.actions}>
          <Button
            label="Create account"
            loading={isSubmitting}
            onPress={() => {
              void onSubmit();
            }}
          />
          <Button label="Back" variant="ghost" onPress={() => router.back()} />
          <Link href="/login">
            <AppText variant="secondary" color="textSecondary">
              Already registered? Log in
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
