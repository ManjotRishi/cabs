import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../../components/Button';
import { rides } from '../../constants/rides';
import { BookRideStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { formatPrice } from '../../utils/formatters';

type Props = NativeStackScreenProps<BookRideStackParamList, 'BookingConfirm'>;

function BookingConfirmScreen({ navigation, route }: Props) {
  const ride = rides.find(item => item.id === route.params.rideId) ?? rides[0];

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconWrap}>
          <Text style={styles.iconText}>OK</Text>
        </View>
        <Text style={styles.title}>Booking Confirmed</Text>
        <Text style={styles.subtitle}>
          Your seat is reserved from {ride.from} to {ride.to}.
        </Text>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>{ride.driverName}</Text>
          <Text style={styles.summaryText}>
            {ride.date}, {ride.time} • {formatPrice(ride.price)}
          </Text>
        </View>

        <Button
          label="Back to Book Ride"
          onPress={() => navigation.popToTop()}
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
    borderRadius: 30,
    backgroundColor: colors.surface,
    padding: spacing.xxxl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconWrap: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: colors.successSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  iconText: {
    color: colors.success,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.lg,
  },
  title: {
    color: colors.text,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.sizes.md,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: spacing.sm,
  },
  summaryBox: {
    width: '100%',
    backgroundColor: colors.surfaceMuted,
    borderRadius: 22,
    padding: spacing.lg,
    marginTop: spacing.xl,
  },
  summaryTitle: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  summaryText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    marginTop: spacing.xs,
  },
  action: {
    width: '100%',
    marginTop: spacing.xl,
  },
});

export default BookingConfirmScreen;
