import { forwardRef, type ComponentRef } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { colors } from '@/constants/colors';
import { radius } from '@/constants/radius';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

type ButtonProps = PressableProps & {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
};

const MIN_TOUCH_HEIGHT = 48;

export const Button = forwardRef<ComponentRef<typeof Pressable>, ButtonProps>(
  function Button(
    {
      label,
      variant = 'primary',
      loading = false,
      fullWidth = true,
      disabled,
      style,
      ...pressableProps
    },
    ref,
  ) {
    const isDisabled = Boolean(disabled || loading);
    const palette = variantStyles[variant];

    return (
      <Pressable
        ref={ref}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        disabled={isDisabled}
        style={(state) => [
          styles.base,
          { backgroundColor: palette.background, borderColor: palette.border },
          fullWidth ? styles.fullWidth : styles.fit,
          state.pressed && !isDisabled ? styles.pressed : null,
          isDisabled ? styles.disabled : null,
          typeof style === 'function' ? style(state) : style,
        ]}
        {...pressableProps}
      >
        <Text style={[styles.label, { color: palette.text }]}>
          {loading ? 'Please wait…' : label}
        </Text>
      </Pressable>
    );
  },
);

const variantStyles: Record<
  ButtonVariant,
  { background: string; text: string; border: string }
> = {
  primary: {
    background: colors.primary,
    text: colors.primaryText,
    border: colors.primary,
  },
  secondary: {
    background: colors.surfaceElevated,
    text: colors.textPrimary,
    border: colors.border,
  },
  danger: {
    background: colors.danger,
    text: colors.textPrimary,
    border: colors.danger,
  },
  ghost: {
    background: 'transparent',
    text: colors.textSecondary,
    border: 'transparent',
  },
};

const styles = StyleSheet.create({
  base: {
    minHeight: MIN_TOUCH_HEIGHT,
    borderRadius: radius.medium,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  } satisfies ViewStyle,
  fullWidth: {
    alignSelf: 'stretch',
  },
  fit: {
    alignSelf: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    ...typography.body,
    fontWeight: '600',
  } satisfies TextStyle,
});
