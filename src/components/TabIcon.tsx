import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type TabIconProps = {
  focused: boolean;
  icon: string;
  label: string;
};

function TabIcon({ focused, icon, label }: TabIconProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.iconWrap, focused && styles.focusedWrap]}>
        <MaterialCommunityIcons
          color={focused ? colors.primary : colors.textMuted}
          name={icon}
          size={22}
        />
      </View>
      <Text style={[styles.label, focused && styles.focusedLabel]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    minWidth: 64,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusedWrap: {
    backgroundColor: colors.primarySoft,
  },
  label: {
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    fontWeight: typography.weights.medium,
  },
  focusedLabel: {
    color: colors.primary,
  },
});

export default TabIcon;
