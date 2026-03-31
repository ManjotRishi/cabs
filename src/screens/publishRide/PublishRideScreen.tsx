import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { PublishRideStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

type Props = NativeStackScreenProps<
  PublishRideStackParamList,
  'PublishRideHome'
>;

function PublishRideScreen({ navigation }: Props) {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Header title="Publish a Ride" subtitle="Offer a ride in a few quick steps" />

        <View style={styles.formCard}>
          <Input label="From" placeholder="Pickup location" />
          <Input label="To" placeholder="Destination" />
          <View style={styles.row}>
            <View style={styles.half}>
              <Input label="Date & Time" placeholder="Today, 5:00 PM" />
            </View>
            <View style={styles.half}>
              <Input label="Seats Available" placeholder="3" />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.half}>
              <Input label="Fare per Seat" placeholder="$10.00" />
            </View>
            <View style={styles.half}>
              <Input label="Vehicle" placeholder="Toyota Camry" />
            </View>
          </View>
          <Button
            label="Publish Ride"
            onPress={() => navigation.navigate('PublishSuccess')}
          />
        </View>

        <Text style={styles.tipTitle}>Publishing tip</Text>
        <Text style={styles.tipText}>
          Clear pickup details and accurate seat counts help riders book faster.
        </Text>
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
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  half: {
    flex: 1,
  },
  tipTitle: {
    marginTop: spacing.xxl,
    color: colors.text,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  tipText: {
    marginTop: spacing.sm,
    color: colors.textSecondary,
    fontSize: typography.sizes.md,
    lineHeight: 22,
  },
});

export default PublishRideScreen;
