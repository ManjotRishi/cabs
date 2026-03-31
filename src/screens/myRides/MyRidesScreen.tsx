import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../components/Header';
import RideCard from '../../components/RideCard';
import { myPastRides, myUpcomingRides } from '../../constants/rides';
import { MyRidesStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

type Props = NativeStackScreenProps<MyRidesStackParamList, 'MyRidesHome'>;

function MyRidesScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = React.useState<'Upcoming' | 'Past'>('Upcoming');
  const data = activeTab === 'Upcoming' ? myUpcomingRides : myPastRides;

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <RideCard
            compact
            onPress={() =>
              navigation.navigate('MyRideDetails', {
                rideId: item.id,
              })
            }
            ride={item}
          />
        )}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <Header title="My Rides" subtitle="Track your upcoming and past trips" />
            <View style={styles.segmented}>
              {(['Upcoming', 'Past'] as const).map(tab => {
                const isActive = activeTab === tab;
                return (
                  <Pressable
                    key={tab}
                    onPress={() => setActiveTab(tab)}
                    style={[styles.segment, isActive && styles.segmentActive]}>
                    <Text
                      style={[
                        styles.segmentText,
                        isActive && styles.segmentTextActive,
                      ]}>
                      {tab}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </>
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
  segmented: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xs,
    marginBottom: spacing.xl,
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: 14,
    alignItems: 'center',
  },
  segmentActive: {
    backgroundColor: colors.primarySoft,
  },
  segmentText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },
  segmentTextActive: {
    color: colors.primary,
  },
});

export default MyRidesScreen;
