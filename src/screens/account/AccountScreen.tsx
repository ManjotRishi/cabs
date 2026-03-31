import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../../components/Button';
import Header from '../../components/Header';
import { accountMenuItems } from '../../constants/rides';
import { AccountStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

type Props = NativeStackScreenProps<AccountStackParamList, 'AccountHome'>;

function AccountScreen({ navigation }: Props) {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Header title="Account" subtitle="Manage your profile and preferences" />

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AJ</Text>
          </View>
          <Text style={styles.name}>Alex Johnson</Text>
          <Text style={styles.email}>alex@example.com</Text>
        </View>

        <View style={styles.menuCard}>
          {accountMenuItems.map(item => (
            <Pressable
              key={item.id}
              onPress={() => {
                if (item.id === 'profile') {
                  navigation.navigate('Profile');
                }

                if (item.id === 'settings') {
                  navigation.navigate('Settings');
                }
              }}
              style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <MaterialCommunityIcons
                  color={colors.textSecondary}
                  name={item.icon}
                  size={20}
                />
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <MaterialCommunityIcons
                color={colors.textMuted}
                name="chevron-right"
                size={22}
              />
            </Pressable>
          ))}
        </View>

        <Button label="Sign Out" onPress={() => {}} variant="secondary" />
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
  profileCard: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xxl,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 30,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  avatarText: {
    color: colors.primary,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  name: {
    color: colors.text,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  email: {
    color: colors.textSecondary,
    fontSize: typography.sizes.md,
    marginTop: spacing.xs,
  },
  menuCard: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuLabel: {
    color: colors.text,
    fontSize: typography.sizes.md,
    marginLeft: spacing.md,
  },
});

export default AccountScreen;
