import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import RideCard from '../../components/RideCard';
import { rideSearchDefaults, rides } from '../../constants/rides';
import { BookRideStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

type Props = NativeStackScreenProps<BookRideStackParamList, 'BookRideHome'>;

function BookRideScreen({ navigation }: Props) {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Header
          title="Book a Ride"
          subtitle="Choose your route and find nearby rides"
          rightIcon="bell-outline"
        />

        <View style={styles.searchCard}>
          <Input label="Pickup location" placeholder={rideSearchDefaults.pickup} />
          <Input label="Drop-off location" placeholder={rideSearchDefaults.dropoff} />
          <View style={styles.row}>
            <View style={styles.half}>
              <Input label="Date" placeholder={rideSearchDefaults.date} />
            </View>
            <View style={styles.half}>
              <Input label="Time" placeholder={rideSearchDefaults.time} />
            </View>
          </View>
          <Button
            label="Search Rides"
            onPress={() => navigation.navigate('RideListing')}
          />
        </View>

        <Text style={styles.sectionTitle}>Available now</Text>
        <RideCard
          compact
          onPress={() =>
            navigation.navigate('RideDetails', {
              rideId: rides[0].id,
            })
          }
          ride={rides[0]}
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
  searchCard: {
    backgroundColor: colors.surface,
    borderRadius: 26,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xxl,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  half: {
    flex: 1,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.md,
  },
});

export default BookRideScreen;
