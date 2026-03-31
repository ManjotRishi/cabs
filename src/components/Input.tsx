import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type InputProps = TextInputProps & {
  label: string;
  helperText?: string;
  rightText?: string;
};

function Input({ label, helperText, rightText, style, ...props }: InputProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        {rightText ? <Text style={styles.rightText}>{rightText}</Text> : null}
      </View>
      <TextInput
        placeholderTextColor={colors.textMuted}
        style={[styles.input, style]}
        {...props}
      />
      {helperText ? <Text style={styles.helperText}>{helperText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    color: colors.text,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  rightText: {
    color: colors.primary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  input: {
    minHeight: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    fontSize: typography.sizes.md,
    color: colors.text,
  },
  helperText: {
    marginTop: spacing.sm,
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
  },
});

export default Input;
