import React from 'react';
import { ScrollView, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FocusAwareStatusBar from './FocusAwareStatusBar';

import { useTheme } from '@/app/hooks/core';
import { Box } from '@/shared/components/Box';
import { WelcomeCard } from '@/shared/core/Layouts/components/WelcomeCard';

interface AppLayoutProps {
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
  statusBarColor?: string;
  disableScrollView?: boolean;
}

const AppLayout = ({
  children,
  contentContainerStyle,
  statusBarColor = 'transparent',
  disableScrollView = false,
}: AppLayoutProps) => {
  const theme = useTheme();
  const { top, left, right } = useSafeAreaInsets();

  return (
    <Box
      style={{
        backgroundColor: theme.colors.white,
        flex: 1,
        paddingLeft: left,
        paddingRight: right,
        paddingTop: top,
      }}
    >
      <FocusAwareStatusBar
        backgroundColor={statusBarColor}
        barStyle="light-content"
        translucent
      />
      <WelcomeCard />
      {disableScrollView ? (
        children
      ) : (
        <ScrollView
          bounces={false}
          contentContainerStyle={[contentContainerStyle]}
          disableIntervalMomentum
          keyboardShouldPersistTaps="handled"
          overScrollMode="never"
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      )}
    </Box>
  );
};

export { AppLayout };
