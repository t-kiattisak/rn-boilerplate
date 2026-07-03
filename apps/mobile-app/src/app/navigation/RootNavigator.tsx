import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import { RootStackParamList } from '../types/navigation';
import { theme } from '@boilerplate/ui-primitives';
import { navigationRef } from '@/shared/utility/navigation';

// Lazy load feature screens (created in step 8)
import DashboardScreen from '../../features/device/screens/DashboardScreen';
import DeviceScanScreen from '../../features/device/screens/DeviceScanScreen';
import DeviceMeasurementScreen from '../../features/device/screens/DeviceMeasurementScreen';

const Stack = createStackNavigator<RootStackParamList>();

const appNavigationTheme: ReactNavigation.Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.white,
  },
};

export const RootNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef} theme={appNavigationTheme}>
      <StatusBar
        animated
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: 'Home Dashboard' }}
        />
        <Stack.Screen
          name="DeviceScan"
          component={DeviceScanScreen}
          options={{ title: 'Scan Nearby Sensors' }}
        />
        <Stack.Screen
          name="DeviceMeasurement"
          component={DeviceMeasurementScreen}
          options={{ title: 'Taking Measurement' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
