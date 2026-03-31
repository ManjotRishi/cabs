import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Ride } from '../constants/rides';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { formatPrice, getInitials } from '../utils/formatters';

type RideCardProps = {
  ride: Ride;
  onPress?: () => void;
  compact?: boolean;
};

function RideCard({ ride, onPress, compact = false }: RideCardProps) {
  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && onPress ? styles.pressed : null]}>
      <View style={styles.topRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{formatPrice(ride.price)}</Text>
        </View>
        <View style={styles.seatBadge}>
          <MaterialCommunityIcons
            color={colors.primary}
            name="seat-passenger"
            size={16}
          />
          <Text style={styles.seatText}>{ride.seatsAvailable} seats</Text>
        </View>
      </View>

      <View style={styles.routeRow}>
        <View style={styles.routeLine}>
          <View style={styles.routePoint} />
          <View style={styles.routeConnector} />
          <View style={[styles.routePoint, styles.routePointEnd]} />
        </View>
        <View style={styles.routeTextWrap}>
          <Text style={styles.locationLabel}>From</Text>
          <Text style={styles.locationValue}>{ride.from}</Text>
          <Text style={[styles.locationLabel, styles.destinationLabel]}>To</Text>
          <Text style={styles.locationValue}>{ride.to}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <MaterialCommunityIcons
            color={colors.textSecondary}
            name="calendar-blank-outline"
            size={16}
          />
          <Text style={styles.metaText}>{ride.date}</Text>
        </View>
        <View style={styles.metaItem}>
          <MaterialCommunityIcons
            color={colors.textSecondary}
            name="clock-time-four-outline"
            size={16}
          />
          <Text style={styles.metaText}>{ride.time}</Text>
        </View>
        {!compact ? (
          <View style={styles.metaItem}>
            <MaterialCommunityIcons
              color={colors.textSecondary}
              name="timer-outline"
              size={16}
            />
            <Text style={styles.metaText}>{ride.duration}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.divider} />

      <View style={styles.driverRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials(ride.driverName)}</Text>
        </View>
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>{ride.driverName}</Text>
          <Text style={styles.driverMeta}>
            {ride.carModel} • {ride.driverRating.toFixed(1)} rating
          </Text>
        </View>
        <MaterialCommunityIcons
          color={colors.textMuted}
          name="chevron-right"
          size={22}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
    shadowColor: colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  pressed: {
    opacity: 0.95,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 14,
  },
  badgeText: {
    color: colors.surface,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.md,
  },
  seatBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 14,
  },
  seatText: {
    color: colors.primary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },
  routeRow: {
    flexDirection: 'row',
  },
  routeLine: {
    width: 20,
    alignItems: 'center',
    marginRight: spacing.md,
    paddingTop: spacing.sm,
  },
  routePoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  routePointEnd: {
    backgroundColor: colors.warning,
  },
  routeConnector: {
    flex: 1,
    width: 2,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
    minHeight: 28,
  },
  routeTextWrap: {
    flex: 1,
  },
  locationLabel: {
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  destinationLabel: {
    marginTop: spacing.md,
  },
  locationValue: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    marginTop: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    color: colors.primary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    color: colors.text,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  driverMeta: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    marginTop: spacing.xs,
  },
});

export default RideCard;
