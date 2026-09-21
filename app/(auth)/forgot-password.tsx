import { router } from 'expo-router';
import { useState } from 'react';
import { View, type ViewStyle } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { AppText, Button, Screen } from '@/components/ui';
import { spacing } from '@/constants/spacing';
import { FormTextField } from '@/features/auth/form-text-field';
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '@/features/auth/auth-schema';
import { sendPasswordResetEmail } from '@/features/auth/auth-service';

export default function ForgotPasswordScreen() {
  const [formError, setFormError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = handleSubmit(async ({ email }) => {
    setFormError(null);
    setInfoMessage(null);
    try {
      await sendPasswordResetEmail(email);
      setInfoMessage(
        'If an account exists for that email, we sent reset instructions.',
      );
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : 'Unable to send reset email.',
      );
    }
  });

  return (
    <Screen scroll>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText variant="heading">Forgot password</AppText>
          <AppText variant="secondary" color="textSecondary">
            Enter your email and we’ll send a reset link if an account exists.
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
            label="Send reset email"
            loading={isSubmitting}
            onPress={() => {
              void onSubmit();
            }}
          />
          <Button label="Back" variant="ghost" onPress={() => router.back()} />
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
