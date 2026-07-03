import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import { AppProviders } from './src/app/providers';
import { RootNavigator } from './src/app/navigation';

const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppProviders>
          <RootNavigator />
        </AppProviders>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
