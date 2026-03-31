import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { AuthStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'> & {
  onSignIn: () => void;
};

function SignUpScreen({ navigation, onSignIn }: Props) {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          <Input label="Full Name" placeholder="Enter your full name" />
          <Input
            keyboardType="email-address"
            label="Email"
            placeholder="alex@example.com"
          />
          <Input label="Password" placeholder="Create password" secureTextEntry />

          <Button label="Sign Up" onPress={onSignIn} style={styles.primaryAction} />
          <Button
            label="Back to Sign In"
            onPress={() => navigation.goBack()}
            style={styles.secondaryAction}
            variant="secondary"
          />

          <Text style={styles.legal}>
            By continuing, you agree to the Terms & Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: spacing.xxl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    color: colors.text,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.md,
    marginTop: spacing.xs,
    marginBottom: spacing.xxl,
  },
  primaryAction: {
    marginTop: spacing.sm,
  },
  secondaryAction: {
    marginTop: spacing.md,
  },
  legal: {
    marginTop: spacing.xl,
    color: colors.textMuted,
    textAlign: 'center',
    fontSize: typography.sizes.xs,
    lineHeight: 18,
  },
});

export default SignUpScreen;
