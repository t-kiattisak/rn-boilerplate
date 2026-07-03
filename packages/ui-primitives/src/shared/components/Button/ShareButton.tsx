import React, { FC } from 'react';

import { externalLinkingContant } from '@/app/constants/externalLinking.constant';
import { useTheme } from '@/app/hooks/core';
import { Box } from '@/shared/components/Box';
import { UnstyleButton } from '@/shared/components/Button/UnstyleButton';
import { Icon } from '@/shared/components/Icon';
import { shareUrl } from '@/shared/utility/share';

interface ShareButtonProps {
  url?: keyof typeof externalLinkingContant;
  shareMessage?: string;
}
export const ShareButton: FC<ShareButtonProps> = ({
  url = 'facebook',
  shareMessage,
}) => {
  const theme = useTheme();

  return (
    <Box flexDirection="row" p="md">
      <Box width={8} />
      <UnstyleButton
        onPress={() => {
          void shareUrl(externalLinkingContant[url], {
            message:
              shareMessage ??
              `บทความนี้คุณควรอ่าน ${externalLinkingContant[url]}`,
          });
        }}
      >
        <Icon color={theme.colors.gray800} name="more-vertical" size={24} />
      </UnstyleButton>
    </Box>
  );
};
