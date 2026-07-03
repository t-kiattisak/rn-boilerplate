/* eslint-disable @typescript-eslint/naming-convention */
import { createTheme } from '@shopify/restyle';

import { palette } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export const theme = createTheme({
  borderRadii: {
    '2xl': 24,
    full: 9999,
    lg: 12,
    md: 8,
    none: 0,
    sm: 4,
    xl: 16,
  },
  breakpoints: {
    desktop: 1024,
    phone: 0,
    tablet: 768,
  },
  buttonVariants: {
    danger: {
      backgroundColor: 'danger',
      borderRadius: 'lg',
      padding: 'sm2',
    },
    defaults: {
      alignItems: 'center',
      backgroundColor: 'primary',
      borderRadius: 'lg',
      flex: 1,
      justifyContent: 'center',
      padding: 'sm2',
    },
    ghost: {
      backgroundColor: 'transparent',
      borderRadius: 'lg',
      padding: 'sm2',
    },
    light: {
      backgroundColor: 'blue100',
      borderRadius: 'lg',
      padding: 'sm2',
    },
    outline: {
      backgroundColor: 'white',
      borderColor: 'darkGray100',
      borderRadius: 'lg',
      borderWidth: 1,
      padding: 'sm2',
    },
    plain: {
      backgroundColor: 'white',
      borderRadius: 'lg',
      padding: 'sm2',
    },
    solid: {
      backgroundColor: 'primary',
      borderRadius: 'lg',
      padding: 'sm2',
    },
  },
  colors: {
    ...palette,
    background: palette.background,
    text: palette.gray800,
  },
  fontFamily: typography,
  fontWeights: {
    black: '900',
    blackName: 'black',
    bold: 'bold',
    bold700: '700',
    condensed: 'condensed',
    condensedBold: 'condensedBold',
    extraBold: '800',
    extraLight: '200',
    heavy: 'heavy',
    light: '300',
    lightName: 'light',
    medium: '500',
    mediumName: 'medium',
    normal: 'normal',
    regular: '400',
    regularName: 'regular',
    semiBold: '600',
    semibold: 'semibold',
    thin: '100',
    thinName: 'thin',
    ultralight: 'ultralight',
  },
  spacing: {
    ...spacing,
  },
  textVariants: {
    body: {
      color: 'text',
      fontFamily: typography.regular,
      fontSize: 14,
      lineHeight: 21,
    },
    bodyLarge: {
      color: 'text',
      fontFamily: typography.regular,
      fontSize: 16,
      lineHeight: 24,
    },
    bodySmall: {
      color: 'text',
      fontFamily: typography.regular,
      fontSize: 12,
      lineHeight: 18,
    },
    bold: {
      color: 'text',
      fontFamily: typography.bold,
      fontSize: 14,
      lineHeight: 21,
    },
    buttonText: {
      color: 'white',
      fontFamily: typography.semiBold,
      fontSize: 18,
      lineHeight: 24,
    },
    caption: {
      color: 'gray500',
      fontFamily: typography.regular,
      fontSize: 12,
      lineHeight: 18,
    },
    captionSmall: {
      color: 'gray500',
      fontFamily: typography.regular,
      fontSize: 10,
      lineHeight: 15,
    },
    defaults: {
      color: 'text',
      fontFamily: typography.default,
      fontSize: 14,
    },
    h1: {
      color: 'text',
      fontFamily: typography.default,
      fontSize: 32,
      lineHeight: 48,
    },
    h2: {
      color: 'text',
      fontFamily: typography.default,
      fontSize: 28,
      lineHeight: 42,
    },
    h3: {
      color: 'text',
      fontFamily: typography.semiBold,
      fontSize: 24,
      lineHeight: 36,
    },
    h4: {
      color: 'text',
      fontFamily: typography.semiBold,
      fontSize: 20,
      lineHeight: 30,
    },
    h5: {
      color: 'text',
      fontFamily: typography.semiBold,
      fontSize: 18,
      lineHeight: 27,
    },
    h6: {
      color: 'text',
      fontFamily: typography.semiBold,
      fontSize: 16,
      lineHeight: 24,
    },
    label: {
      color: 'text',
      fontFamily: typography.semiBold,
      fontSize: 14,
      lineHeight: 21,
    },
    link: {
      color: 'primary',
      fontFamily: typography.semiBold,
      fontSize: 14,
      lineHeight: 21,
      textDecorationLine: 'underline',
    },
    medium: {
      color: 'text',
      fontFamily: typography.default,
      fontSize: 14,
      lineHeight: 21,
    },
    navBarTitle: {
      color: 'text',
      fontFamily: typography.bold,
      fontSize: 18,
      lineHeight: 27,
    },
    regular: {
      color: 'text',
      fontFamily: typography.regular,
      fontSize: 14,
      lineHeight: 21,
    },
    semibold: {
      color: 'text',
      fontFamily: typography.semiBold,
      fontSize: 14,
      lineHeight: 21,
    },
    tiny: {
      color: 'gray500',
      fontFamily: typography.regular,
      fontSize: 8,
      lineHeight: 12,
    },
  },
  zIndices: {
    backdrop: 9999,
    dropdown: 10,
    modal: 20,
    toast: 30,
    tooltip: 40,
  },
});

export type Theme = typeof theme;
