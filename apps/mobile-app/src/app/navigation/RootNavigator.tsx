import { theme } from '@boilerplate/ui-primitives';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar } from 'react-native';

import DashboardScreen from '../../features/device/screens/DashboardScreen';
import DeviceMeasurementScreen from '../../features/device/screens/DeviceMeasurementScreen';
import DeviceScanScreen from '../../features/device/screens/DeviceScanScreen';
import { RootStackParamList } from '../types/navigation';

import { navigationRef } from '@/shared/utility/navigation';

// Lazy load feature screens (created in st ep 8)

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
          component={DashboardScreen}
          name="Dashboard"
          options={{ title: 'Home Dashboard' }}
        />
        <Stack.Screen
          component={DeviceScanScreen}
          name="DeviceScan"
          options={{ title: 'Scan Nearby Sensors' }}
        />
        <Stack.Screen
          component={DeviceMeasurementScreen}
          name="DeviceMeasurement"
          options={{ title: 'Taking Measurement' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
