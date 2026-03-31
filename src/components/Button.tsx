import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  style?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
};

function Button({
  label,
  onPress,
  variant = 'primary',
  style,
  disabled = false,
  loading = false,
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        isPrimary && styles.primary,
        isSecondary && styles.secondary,
        variant === 'ghost' && styles.ghost,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={isPrimary ? colors.surface : colors.primary} />
      ) : (
        <Text
          style={[
            styles.label,
            isPrimary && styles.primaryLabel,
            !isPrimary && styles.secondaryLabel,
          ]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  primary: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  primaryLabel: {
    color: colors.surface,
  },
  secondaryLabel: {
    color: colors.primary,
  },
});

export default Button;
