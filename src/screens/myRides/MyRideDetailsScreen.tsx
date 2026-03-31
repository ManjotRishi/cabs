import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../components/Header';
import { myPastRides, myUpcomingRides } from '../../constants/rides';
import { MyRidesStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { formatPrice } from '../../utils/formatters';

type Props = NativeStackScreenProps<MyRidesStackParamList, 'MyRideDetails'>;

function MyRideDetailsScreen({ navigation, route }: Props) {
  const ride =
    [...myUpcomingRides, ...myPastRides].find(item => item.id === route.params.rideId) ??
    myUpcomingRides[0];

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Header
          title="Ride Details"
          subtitle="Trip overview and booking info"
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.card}>
          <Text style={styles.status}>{ride.status}</Text>
          <Text style={styles.route}>
            {ride.from} to {ride.to}
          </Text>
          <Text style={styles.meta}>
            {ride.date}, {ride.time}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Driver</Text>
            <Text style={styles.value}>{ride.driverName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Vehicle</Text>
            <Text style={styles.value}>{ride.carModel}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Fare paid</Text>
            <Text style={styles.value}>{formatPrice(ride.price)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Seat count</Text>
            <Text style={styles.value}>{ride.seatsAvailable}</Text>
          </View>
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
    backgroundColor: colors.primary,
    borderRadius: 28,
    padding: spacing.xxl,
    marginBottom: spacing.xl,
  },
  status: {
    color: colors.surface,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  route: {
    color: colors.surface,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    marginTop: spacing.md,
  },
  meta: {
    color: '#DDE7FF',
    fontSize: typography.sizes.md,
    marginTop: spacing.sm,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoRow: {
    marginBottom: spacing.lg,
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

export default MyRideDetailsScreen;
