import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../../components/Button';
import Header from '../../components/Header';
import { rides } from '../../constants/rides';
import { BookRideStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { formatPrice, getInitials } from '../../utils/formatters';

type Props = NativeStackScreenProps<BookRideStackParamList, 'RideDetails'>;

function RideDetailsScreen({ navigation, route }: Props) {
  const ride = rides.find(item => item.id === route.params.rideId) ?? rides[0];

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Header
          title="Ride Details"
          subtitle="Review driver and fare information"
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.heroCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(ride.driverName)}</Text>
          </View>
          <Text style={styles.driverName}>{ride.driverName}</Text>
          <Text style={styles.driverMeta}>
            {ride.carModel} • {ride.driverRating.toFixed(1)} rating
          </Text>
        </View>

        <View style={styles.detailCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Route</Text>
            <Text style={styles.detailValue}>
              {ride.from} to {ride.to}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Departure</Text>
            <Text style={styles.detailValue}>
              {ride.date}, {ride.time}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Fare</Text>
            <Text style={styles.detailPrice}>{formatPrice(ride.price)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Seats available</Text>
            <Text style={styles.detailValue}>{ride.seatsAvailable}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Notes</Text>
            <Text style={styles.detailValue}>{ride.notes}</Text>
          </View>
        </View>

        <Button
          label="Book This Ride"
          onPress={() =>
            navigation.navigate('BookingConfirm', {
              rideId: ride.id,
            })
          }
        />
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
  heroCard: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: spacing.xxl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
    marginBottom: spacing.lg,
  },
  avatarText: {
    color: colors.primary,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  driverName: {
    color: colors.text,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  driverMeta: {
    color: colors.textSecondary,
    fontSize: typography.sizes.md,
    marginTop: spacing.xs,
  },
  detailCard: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  detailRow: {
    marginBottom: spacing.lg,
  },
  detailLabel: {
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: spacing.xs,
  },
  detailValue: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    lineHeight: 22,
  },
  detailPrice: {
    color: colors.primary,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
});

export default RideDetailsScreen;
