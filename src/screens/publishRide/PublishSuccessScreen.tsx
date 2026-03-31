import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../../components/Button';
import { PublishRideStackParamList, TabParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

type Props = CompositeScreenProps<
  NativeStackScreenProps<PublishRideStackParamList, 'PublishSuccess'>,
  BottomTabScreenProps<TabParamList>
>;

function PublishSuccessScreen({ navigation }: Props) {
  const handleViewRides = () => {
    const parentNavigation = navigation.getParent<BottomTabNavigationProp<TabParamList>>();
    parentNavigation?.navigate('MyRidesTab', {
      screen: 'MyRidesHome',
    });
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconWrap}>
          <Text style={styles.iconText}>OK</Text>
        </View>
        <Text style={styles.title}>Ride Published!</Text>
        <Text style={styles.subtitle}>
          Your ride is now live and visible to other riders.
        </Text>
        <Button
          label="View My Rides"
          onPress={handleViewRides}
          style={styles.action}
        />
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
    padding: spacing.xl,
  },
  card: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: 30,
    padding: spacing.xxxl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.successSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: colors.success,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  title: {
    color: colors.text,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    marginTop: spacing.xl,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.md,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: spacing.sm,
  },
  action: {
    width: '100%',
    marginTop: spacing.xl,
  },
});

export default PublishSuccessScreen;
