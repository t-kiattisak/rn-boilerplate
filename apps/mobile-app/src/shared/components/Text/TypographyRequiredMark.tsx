import { createText } from '@shopify/restyle';
import React, { FC } from 'react';

import type { TypographyRequiredMarkProps } from '@/shared/components/Text/models/typography.model';
import { Theme } from '@/shared/theme';

const RText = createText<Theme>();

const Mark: FC<TypographyRequiredMarkProps> = ({
  color = 'gray400',
  testID,
  ...rest
}) => {
  return (
    <RText
      allowFontScaling={false}
      color={color}
      ml="xs"
      testID={testID}
      variant="body"
      {...rest}
    >
      *
    </RText>
  );
};

export const TypographyRequiredMark = React.memo(Mark);

TypographyRequiredMark.displayName = 'TypographyRequiredMark';
