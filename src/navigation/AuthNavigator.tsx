import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

type AuthNavigatorProps = {
  onSignIn: () => void;
};

function AuthNavigator({ onSignIn }: AuthNavigatorProps) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn">
        {props => <SignInScreen {...props} onSignIn={onSignIn} />}
      </Stack.Screen>
      <Stack.Screen name="SignUp">
        {props => <SignUpScreen {...props} onSignIn={onSignIn} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default AuthNavigator;
