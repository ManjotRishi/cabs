import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

function SplashScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.logoCard}>
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons color={colors.primary} name="car" size={34} />
        </View>
        <Text style={styles.title}>RideShare</Text>
        <Text style={styles.subtitle}>Book and publish rides with ease</Text>
        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  logoCard: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 30,
    backgroundColor: colors.surface,
    paddingVertical: 48,
    paddingHorizontal: spacing.xxl,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  iconWrap: {
    width: 82,
    height: 82,
    borderRadius: 28,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  subtitle: {
    marginTop: spacing.sm,
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  progressTrack: {
    width: 110,
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.border,
    marginTop: spacing.xxxl,
    overflow: 'hidden',
  },
  progressFill: {
    width: '45%',
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 999,
  },
});

export default SplashScreen;
