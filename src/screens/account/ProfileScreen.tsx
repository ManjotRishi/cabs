import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../components/Header';
import { AccountStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

type Props = NativeStackScreenProps<AccountStackParamList, 'Profile'>;

function ProfileScreen({ navigation }: Props) {
  const items = [
    { label: 'Full Name', value: 'Alex Johnson' },
    { label: 'Email', value: 'alex@example.com' },
    { label: 'Phone', value: '+1 555 012 3456' },
    { label: 'Preferred Vehicle', value: 'Sedan' },
  ];

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Header
          title="My Profile"
          subtitle="Personal and rider details"
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.card}>
          {items.map(item => (
            <View key={item.label} style={styles.infoRow}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          ))}
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
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoRow: {
    marginBottom: spacing.xl,
  },
  label: {
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  value: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
});

export default ProfileScreen;
