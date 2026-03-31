import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BookingConfirmScreen from '../screens/bookRide/BookingConfirmScreen';
import BookRideScreen from '../screens/bookRide/BookRideScreen';
import RideDetailsScreen from '../screens/bookRide/RideDetailsScreen';
import RideListingScreen from '../screens/bookRide/RideListingScreen';
import { BookRideStackParamList } from './types';

const Stack = createNativeStackNavigator<BookRideStackParamList>();

function RideStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BookRideHome" component={BookRideScreen} />
      <Stack.Screen name="RideListing" component={RideListingScreen} />
      <Stack.Screen name="RideDetails" component={RideDetailsScreen} />
      <Stack.Screen name="BookingConfirm" component={BookingConfirmScreen} />
    </Stack.Navigator>
  );
}

export default RideStack;
