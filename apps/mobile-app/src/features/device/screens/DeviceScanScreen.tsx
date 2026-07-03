import React, { useEffect } from 'react';
import { FlatList, ActivityIndicator, Pressable } from 'react-native';
import { Box, Text, Button, Card } from '@boilerplate/ui-primitives';
import { useDevice } from '@boilerplate/device-integration';
import { RootStackScreenProps } from '../../../app/types/navigation';
import { useTranslation } from 'react-i18next';

export default function DeviceScanScreen({
  navigation,
}: RootStackScreenProps<'DeviceScan'>) {
  const { t } = useTranslation();
  const {
    devices,
    isScanning,
    startScan,
    stopScan,
    connectDevice,
    phase,
  } = useDevice();

  useEffect(() => {
    startScan();
    return () => {
      stopScan();
    };
  }, [startScan, stopScan]);

  const handleConnect = async (deviceId: string) => {
    const success = await connectDevice(deviceId);
    if (success) {
      navigation.navigate('DeviceMeasurement', { deviceId });
    }
  };

  return (
    <Box flex={1} bg="white" p="md">
      <Box flexDirection="row" justifyContent="space-between" alignItems="center" mb="md">
        <Text variant="h4">{t('device:scanTitle')}</Text>
        {isScanning && <ActivityIndicator color="blue" />}
      </Box>

      <FlatList
        data={devices}
        keyExtractor={(item) => item.deviceId}
        ListEmptyComponent={
          <Box py="xl" alignItems="center">
            <Text variant="body" color="gray500">
              {isScanning ? t('device:searching') : t('device:noDevices')}
            </Text>
          </Box>
        }
        renderItem={({ item }) => (
          <Card p="md" mb="sm" flexDirection="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Text variant="semibold">{item.deviceName}</Text>
              <Text variant="caption">{item.deviceId}</Text>
            </Box>
            <Button
              variant="light"
              onPress={() => handleConnect(item.deviceId)}
              disabled={phase === 'connecting'}
            >
              <Text variant="bodySmall" color="primary">
                {phase === 'connecting' ? t('common:scanning') : t('common:connect')}
              </Text>
            </Button>
          </Card>
        )}
      />

      <Button
        variant="solid"
        onPress={isScanning ? stopScan : startScan}
        mt="md"
      >
        <Text variant="buttonText">
          {isScanning ? t('common:cancel') : t('common:retry')}
        </Text>
      </Button>
    </Box>
  );
}
