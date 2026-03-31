import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type HeaderProps = {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
  rightIcon?: string;
};

function Header({ title, subtitle, onBackPress, rightIcon }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {onBackPress ? (
          <Pressable onPress={onBackPress} style={styles.backButton}>
            <MaterialCommunityIcons
              color={colors.text}
              name="arrow-left"
              size={22}
            />
          </Pressable>
        ) : null}
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      {rightIcon ? (
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons
            color={colors.textSecondary}
            name={rightIcon}
            size={20}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.md,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export default Header;
