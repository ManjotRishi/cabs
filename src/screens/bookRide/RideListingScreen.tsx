import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../components/Header';
import RideCard from '../../components/RideCard';
import { rides } from '../../constants/rides';
import { BookRideStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type Props = NativeStackScreenProps<BookRideStackParamList, 'RideListing'>;

function RideListingScreen({ navigation }: Props) {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <FlatList
        data={rides}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <RideCard
            onPress={() => navigation.navigate('RideDetails', { rideId: item.id })}
            ride={item}
          />
        )}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <Header
            title="Ride Listings"
            subtitle="Compare drivers, fares and seat availability"
            onBackPress={() => navigation.goBack()}
          />
        }
        showsVerticalScrollIndicator={false}
      />
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
});

export default RideListingScreen;
