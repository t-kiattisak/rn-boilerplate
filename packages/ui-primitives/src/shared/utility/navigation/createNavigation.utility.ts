import { createNavigationContainerRef } from '@react-navigation/native';

import { RootStackParamList } from '@/app/types/navigation';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();
