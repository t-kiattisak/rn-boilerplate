import React, { useEffect } from 'react';
import Animated, {
  Easing,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAsync, useTheme } from '@/app/hooks/core';
import { useGeocoding } from '@/app/hooks/core/useGeocoding';
import PendingLocationImage from '@/assets/images/location/bg-pending-location.png';
import {
  AlertDialogPortal,
  AlertDialogRoot,
} from '@/shared/components/AlertDialog';
import { Box } from '@/shared/components/Box';
import { Icon } from '@/shared/components/Icon';
import { FastImage } from '@/shared/components/Image';
import { Typography } from '@/shared/components/Text';
import { isNumber } from '@/shared/utility/validators';

interface LoadingLocationProps {
  latitude?: number;
  longitude?: number;
  visible?: boolean;
}

const LoadingLocationContent = ({
  latitude,
  longitude,
}: Omit<LoadingLocationProps, 'visible'>) => {
  const theme = useTheme();
  const { getAddressFromCoordinates, isInitialized } = useGeocoding();
  const waveA = useSharedValue(0);
  const waveB = useSharedValue(0);
  const waveC = useSharedValue(0);

  const startWave = (wave: SharedValue<number>, delay: number) => {
    wave.value = withRepeat(
      withSequence(
        withDelay(
          delay,
          withTiming(1, { duration: 2200, easing: Easing.out(Easing.ease) })
        ),
        withTiming(0, { duration: 0 })
      ),
      -1,
      false
    );
  };

  useEffect(() => {
    startWave(waveA, 0);
    startWave(waveB, 700);
    startWave(waveC, 1400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const waveAStyle = useAnimatedStyle(() => ({
    opacity: 0.55 - waveA.value * 0.55,
    transform: [{ scale: 0.62 + waveA.value * 0.46 }],
  }));
  const waveBStyle = useAnimatedStyle(() => ({
    opacity: 0.55 - waveB.value * 0.55,
    transform: [{ scale: 0.62 + waveB.value * 0.46 }],
  }));
  const waveCStyle = useAnimatedStyle(() => ({
    opacity: 0.55 - waveC.value * 0.55,
    transform: [{ scale: 0.62 + waveC.value * 0.46 }],
  }));

  const { data } = useAsync(async () => {
    if (!isInitialized) {
      return null;
    }

    if (!isNumber(latitude) || !isNumber(longitude)) {
      return null;
    }

    return await getAddressFromCoordinates(latitude, longitude);
  }, [isInitialized, latitude, longitude, getAddressFromCoordinates]);

  return (
    <Box bg="blue600" flex={1} px="md">
      <SafeAreaView style={{ flex: 1 }}>
        <Box alignItems="center" flex={1} justifyContent="center">
          <Box
            alignItems="center"
            height={280}
            justifyContent="center"
            width={280}
          >
            <Animated.View
              style={[
                {
                  borderColor: theme.colors.blue300,
                  borderRadius: 140,
                  borderWidth: 22,
                  height: 280,
                  position: 'absolute',
                  width: 280,
                },
                waveAStyle,
              ]}
            />
            <Animated.View
              style={[
                {
                  borderColor: theme.colors.blue300,
                  borderRadius: 140,
                  borderWidth: 22,
                  height: 280,
                  position: 'absolute',
                  width: 280,
                },
                waveBStyle,
              ]}
            />
            <Animated.View
              style={[
                {
                  borderColor: theme.colors.blue300,
                  borderRadius: 140,
                  borderWidth: 22,
                  height: 280,
                  position: 'absolute',
                  width: 280,
                },
                waveCStyle,
              ]}
            />
            <Box borderRadius="full" height={240} overflow="hidden" width={240}>
              <FastImage
                resizeMode="cover"
                source={PendingLocationImage}
                style={{
                  borderRadius: theme.borderRadii.full,
                  height: '100%',
                  width: 240,
                }}
              />
            </Box>
          </Box>
        </Box>

        {data && (
          <Box
            alignItems="center"
            bottom={0}
            gap="sm"
            left={0}
            pb="xxxl"
            position="absolute"
            px="md"
            right={0}
          >
            <Box
              alignItems="center"
              bg="white"
              borderRadius="full"
              height={40}
              justifyContent="center"
              width={40}
            >
              <Icon
                color={theme.colors.blue600}
                iconSet="MaterialIcons"
                name="place"
                size={22}
              />
            </Box>
            <Typography color="white" variant="h5" weight="semibold">
              จัดส่งที่
            </Typography>
            <Typography color="white" textAlign="center">
              {data}
            </Typography>
          </Box>
        )}
      </SafeAreaView>
    </Box>
  );
};

export const LoadingLocation = ({
  latitude,
  longitude,
  visible = true,
}: LoadingLocationProps) => {
  return (
    <AlertDialogRoot open={visible} onOpenChange={() => {}}>
      <AlertDialogPortal style={{ padding: 0 }}>
        <LoadingLocationContent latitude={latitude} longitude={longitude} />
      </AlertDialogPortal>
    </AlertDialogRoot>
  );
};
