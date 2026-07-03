import React, { ReactNode } from 'react';
import { Platform, ViewProps } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { useElementSize, useTheme } from '@/app/hooks/core';
import { Box } from '@/shared/components/Box';
import { Card } from '@/shared/components/Card';
import { KeyboardAwareStickyView } from '@/shared/components/KeyboardAware';
import {
  ScrollViewRefresh,
  ScrollViewRefreshProps,
} from '@/shared/components/ScrollViewRefresh';

interface ScreenWithFooterProps
  extends Pick<ViewProps, 'style'>,
    ScrollViewRefreshProps {
  children: ReactNode;
  footer: ReactNode;
  scrollable?: boolean;
  contentPaddingHorizontal?: number;
  extraFooterBottomInset?: number;
}

export const ScreenWithFooterLayout = ({
  children,
  footer,
  scrollable = true,
  style,
  contentPaddingHorizontal = 16,
  extraFooterBottomInset = 24,
  onRefresh,
  refreshing,
}: ScreenWithFooterProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { size, onLayout } = useElementSize();

  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={[{ backgroundColor: theme.colors.white, flex: 1 }, style]}
    >
      <Box style={{ flex: 1, paddingBottom: size.height }}>
        {scrollable ? (
          <ScrollViewRefresh
            contentContainerStyle={{
              paddingHorizontal: contentPaddingHorizontal,
            }}
            refreshing={refreshing}
            onRefresh={onRefresh}
          >
            {children}
          </ScrollViewRefresh>
        ) : (
          <Box flex={1} style={{ paddingHorizontal: contentPaddingHorizontal }}>
            {children}
          </Box>
        )}
      </Box>
      {footer && (
        <Box bottom={0} left={0} position="absolute" right={0}>
          <KeyboardAwareStickyView onLayout={onLayout}>
            <Card
              p="zero"
              shadow="top"
              style={{
                paddingBottom: Platform.select({
                  android: Math.max(insets.bottom, extraFooterBottomInset),
                  ios: extraFooterBottomInset,
                }),
                paddingHorizontal: contentPaddingHorizontal,
                paddingTop: extraFooterBottomInset,
              }}
            >
              {footer}
            </Card>
          </KeyboardAwareStickyView>
        </Box>
      )}
    </SafeAreaView>
  );
};
