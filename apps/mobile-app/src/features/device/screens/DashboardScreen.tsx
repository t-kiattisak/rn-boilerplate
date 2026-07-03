import React from 'react';
import { Box, Text, Button, Card } from '@boilerplate/ui-primitives';
import { RootStackScreenProps } from '../../../app/types/navigation';
import { useTranslation } from 'react-i18next';

export default function DashboardScreen({
  navigation,
}: RootStackScreenProps<'Dashboard'>) {
  const { t } = useTranslation();

  return (
    <Box flex={1} bg="white" p="md" justifyContent="center" alignItems="center">
      <Card p="lg" gap="md" width="100%" maxWidth={400} elevation={3}>
        <Text variant="h3" color="text" textAlign="center">
          {t('common:appName')}
        </Text>
        
        <Text variant="body" color="text" textAlign="center" marginVertical="md">
          {t('device:searching')}
        </Text>

        <Button
          variant="solid"
          onPress={() => navigation.navigate('DeviceScan')}
        >
          <Text variant="buttonText">{t('device:scanTitle')}</Text>
        </Button>
      </Card>
    </Box>
  );
}
