import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabIcon from '../components/TabIcon';
import AccountScreen from '../screens/account/AccountScreen';
import ProfileScreen from '../screens/account/ProfileScreen';
import SettingsScreen from '../screens/account/SettingsScreen';
import MyRideDetailsScreen from '../screens/myRides/MyRideDetailsScreen';
import MyRidesScreen from '../screens/myRides/MyRidesScreen';
import PublishRideScreen from '../screens/publishRide/PublishRideScreen';
import PublishSuccessScreen from '../screens/publishRide/PublishSuccessScreen';
import { colors } from '../theme/colors';
import RideStack from './RideStack';
import {
  AccountStackParamList,
  MyRidesStackParamList,
  PublishRideStackParamList,
  TabParamList,
} from './types';

const Tab = createBottomTabNavigator<TabParamList>();
const MyRidesStack = createNativeStackNavigator<MyRidesStackParamList>();
const PublishRideStack = createNativeStackNavigator<PublishRideStackParamList>();
const AccountStack = createNativeStackNavigator<AccountStackParamList>();

function MyRidesNavigator() {
  return (
    <MyRidesStack.Navigator screenOptions={{ headerShown: false }}>
      <MyRidesStack.Screen name="MyRidesHome" component={MyRidesScreen} />
      <MyRidesStack.Screen
        name="MyRideDetails"
        component={MyRideDetailsScreen}
      />
    </MyRidesStack.Navigator>
  );
}

function PublishNavigator() {
  return (
    <PublishRideStack.Navigator screenOptions={{ headerShown: false }}>
      <PublishRideStack.Screen
        name="PublishRideHome"
        component={PublishRideScreen}
      />
      <PublishRideStack.Screen
        name="PublishSuccess"
        component={PublishSuccessScreen}
      />
    </PublishRideStack.Navigator>
  );
}

function AccountNavigator() {
  return (
    <AccountStack.Navigator screenOptions={{ headerShown: false }}>
      <AccountStack.Screen name="AccountHome" component={AccountScreen} />
      <AccountStack.Screen name="Profile" component={ProfileScreen} />
      <AccountStack.Screen name="Settings" component={SettingsScreen} />
    </AccountStack.Navigator>
  );
}

function TabNavigator() {
  const tabConfig: Record<
    keyof TabParamList,
    { icon: string; label: string }
  > = {
    BookRideTab: { icon: 'car-clock', label: 'Book' },
    MyRidesTab: { icon: 'clipboard-list-outline', label: 'My Rides' },
    PublishRideTab: { icon: 'plus-circle-outline', label: 'Publish' },
    AccountTab: { icon: 'account-outline', label: 'Account' },
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 84,
          paddingTop: 10,
          paddingBottom: 14,
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        tabBarIcon: ({ focused }) => {
          const config = tabConfig[route.name];

          return (
            <TabIcon
              focused={focused}
              icon={config.icon}
              label={config.label}
            />
          );
        },
      })}>
      <Tab.Screen name="BookRideTab" component={RideStack} />
      <Tab.Screen name="MyRidesTab" component={MyRidesNavigator} />
      <Tab.Screen name="PublishRideTab" component={PublishNavigator} />
      <Tab.Screen name="AccountTab" component={AccountNavigator} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
