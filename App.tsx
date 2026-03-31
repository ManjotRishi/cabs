import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootNavigator from './src/navigation/RootNavigator';
import { colors } from './src/theme/colors';

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar
          backgroundColor={colors.background}
          barStyle="dark-content"
        />
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
