import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../components/Header';
import { AccountStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

type Props = NativeStackScreenProps<AccountStackParamList, 'Settings'>;

function SettingsScreen({ navigation }: Props) {
  const items = [
    'Push notifications',
    'Location access',
    'Saved payment methods',
    'Language preferences',
  ];

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Header
          title="Settings"
          subtitle="Control app preferences"
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.card}>
          {items.map(item => (
            <View key={item} style={styles.row}>
              <Text style={styles.itemText}>{item}</Text>
              <View style={styles.togglePlaceholder} />
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
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemText: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
  },
  togglePlaceholder: {
    width: 44,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export default SettingsScreen;
