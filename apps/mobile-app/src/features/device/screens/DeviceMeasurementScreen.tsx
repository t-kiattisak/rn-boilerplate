import React from 'react';
import { Box, Text, Button, Card } from '@boilerplate/ui-primitives';
import { useDevice } from '@boilerplate/device-integration';
import { RootStackScreenProps } from '../../../app/types/navigation';
import { useTranslation } from 'react-i18next';

export default function DeviceMeasurementScreen({
  navigation,
  route,
}: RootStackScreenProps<'DeviceMeasurement'>) {
  const { t } = useTranslation();
  const { deviceId } = route.params;
  const {
    activeDevice,
    measurement,
    phase,
    clearMeasurement,
    disconnectDevice,
    startMeasure,
  } = useDevice();

  const handleBack = async () => {
    await disconnectDevice();
    navigation.goBack();
  };

  return (
    <Box flex={1} bg="white" p="md" justifyContent="space-between">
      <Box gap="md" alignItems="center">
        <Text variant="h4">{t('device:measurementTitle')}</Text>
        <Text variant="caption">{deviceId}</Text>

        <Card p="lg" width="100%" maxWidth={400} alignItems="center" gap="md" mt="xl">
          <Text variant="semibold">
            Status: {phase.toUpperCase()}
          </Text>

          {phase === 'listening' && (
            <Box py="lg" alignItems="center" gap="sm">
              <Text variant="body">{t('device:waiting')}</Text>
              <Button variant="solid" onPress={startMeasure}>
                <Text variant="buttonText">Trigger Mock Sensor Reading</Text>
              </Button>
            </Box>
          )}

          {phase === 'received' && measurement && (
            <Box py="lg" alignItems="center" gap="sm">
              <Text variant="h1" color="primary">
                {measurement.value}
              </Text>
              <Text variant="bodyLarge" color="text">
                {measurement.unit}
              </Text>
              <Text variant="captionSmall">
                Measured at: {measurement.timestamp}
              </Text>
            </Box>
          )}
        </Card>
      </Box>

      <Box gap="sm">
        {phase === 'received' && (
          <Button variant="outline" onPress={clearMeasurement}>
            <Text variant="body">{t('common:retry')}</Text>
          </Button>
        )}
        <Button variant="solid" onPress={handleBack}>
          <Text variant="buttonText">{t('common:disconnect')}</Text>
        </Button>
      </Box>
    </Box>
  );
}
