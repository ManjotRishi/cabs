import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/auth/SplashScreen';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [isReady, setIsReady] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isReady ? (
        <Stack.Screen name="Splash" component={SplashScreen} />
      ) : !isAuthenticated ? (
        <Stack.Screen name="Auth">
          {() => <AuthNavigator onSignIn={() => setIsAuthenticated(true)} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="MainTabs" component={TabNavigator} />
      )}
    </Stack.Navigator>
  );
}

export default RootNavigator;
