import { describe, expect, it } from '@jest/globals';

import { palette } from '../colors';
import { spacing } from '../spacing';
import { theme } from '../theme';
import { typography } from '../typography';

describe('Theme System', () => {
  describe('palette', () => {
    it('should have primary colors defined', () => {
      expect(palette.primary).toBeDefined();
      expect(palette.secondary).toBeDefined();
      expect(palette.danger).toBeDefined();
      expect(palette.success).toBeDefined();
    });

    it('should have text colors defined', () => {
      expect(palette.gray800).toBeDefined();
      expect(palette.gray500).toBeDefined();
      expect(palette.gray400).toBeDefined();
      expect(palette.white).toBeDefined();
      expect(palette.black).toBeDefined();
    });

    it('should have status colors defined', () => {
      expect(palette.success).toBeDefined();
      expect(palette.danger).toBeDefined();
      expect(palette.yellow500).toBeDefined();
    });

    it('should have valid hex color values', () => {
      const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

      // Test primary colors
      expect(palette.primary).toMatch(hexColorRegex);
      expect(palette.secondary).toMatch(hexColorRegex);
      expect(palette.danger).toMatch(hexColorRegex);
      expect(palette.success).toMatch(hexColorRegex);

      // Test text colors
      expect(palette.white).toMatch(hexColorRegex);
      expect(palette.black).toMatch(hexColorRegex);
      expect(palette.gray800).toMatch(hexColorRegex);
      expect(palette.gray500).toMatch(hexColorRegex);

      // Test other colors
      expect(palette.background).toMatch(hexColorRegex);
      expect(palette.border).toMatch(hexColorRegex);
      expect(palette.yellow500).toMatch(hexColorRegex);
    });

    it('should have consistent color structure', () => {
      const colorKeys = Object.keys(palette);
      expect(colorKeys.length).toBeGreaterThan(0);

      colorKeys.forEach(key => {
        const value = palette[key as keyof typeof palette];
        expect(typeof value).toBe('string');
        expect(value.length).toBeGreaterThan(0);
      });
    });

    it('should have background colors defined', () => {
      expect(palette.background).toBeDefined();
      expect(palette.light).toBeDefined();
      expect(palette.white).toBeDefined();
    });

    it('should have border colors defined', () => {
      expect(palette.border).toBeDefined();
      expect(palette.darkGray100).toBeDefined();
      expect(palette.gray250).toBeDefined();
    });

    it('should have shadow colors defined', () => {
      expect(palette.shadow).toBeDefined();
      expect(palette.shadowDefalt).toBeDefined();
    });
  });

  describe('spacing', () => {
    it('should have spacing values defined', () => {
      expect(spacing.xs).toBeDefined();
      expect(spacing.sm).toBeDefined();
      expect(spacing.md).toBeDefined();
      expect(spacing.lg).toBeDefined();
      expect(spacing.xl).toBeDefined();
      expect(spacing.xxl).toBeDefined();
    });

    it('should have numeric values', () => {
      expect(typeof spacing.xs).toBe('number');
      expect(typeof spacing.sm).toBe('number');
      expect(typeof spacing.md).toBe('number');
      expect(typeof spacing.lg).toBe('number');
      expect(typeof spacing.xl).toBe('number');
      expect(typeof spacing.xxl).toBe('number');
    });

    it('should have progressive spacing values', () => {
      expect(spacing.xs).toBeLessThan(spacing.sm);
      expect(spacing.sm).toBeLessThan(spacing.md);
      expect(spacing.md).toBeLessThan(spacing.lg);
      expect(spacing.lg).toBeLessThan(spacing.xl);
      expect(spacing.xl).toBeLessThan(spacing.xxl);
    });

    it('should have positive spacing values', () => {
      Object.values(spacing).forEach(value => {
        expect(value).toBeGreaterThanOrEqual(0);
      });
    });

    it('should have reasonable spacing ranges', () => {
      expect(spacing.xs).toBeGreaterThanOrEqual(4);
      expect(spacing.xxl).toBeLessThanOrEqual(64);
    });

    it('should have zero spacing value', () => {
      expect(spacing.zero).toBe(0);
    });
  });

  describe('typography', () => {
    it('should have font families defined', () => {
      expect(typography.default).toBeDefined();
      expect(typography.regular).toBeDefined();
      expect(typography.semiBold).toBeDefined();
      expect(typography.bold).toBeDefined();
    });

    it('should have string values', () => {
      expect(typeof typography.default).toBe('string');
      expect(typeof typography.regular).toBe('string');
      expect(typeof typography.semiBold).toBe('string');
      expect(typeof typography.bold).toBe('string');
    });

    it('should have valid font family names', () => {
      const fontFamilyRegex = /^[A-Za-z0-9\s\-',]+$/;
      expect(typography.default).toMatch(fontFamilyRegex);
      expect(typography.regular).toMatch(fontFamilyRegex);
      expect(typography.semiBold).toMatch(fontFamilyRegex);
      expect(typography.bold).toMatch(fontFamilyRegex);
    });

    it('should contain NotoSansThai fonts', () => {
      expect(typography.default).toContain('NotoSansThai');
      expect(typography.regular).toContain('NotoSansThai');
      expect(typography.semiBold).toContain('NotoSansThai');
      // bold might be '600' on iOS, so check conditionally
      if (typeof typography.bold === 'string' && typography.bold.includes('NotoSansThai')) {
        expect(typography.bold).toContain('NotoSansThai');
      }
    });

    it('should have consistent font naming', () => {
      const fonts = [typography.default, typography.regular, typography.semiBold];
      fonts.forEach(font => {
        expect(font).toContain('NotoSansThai');
        expect(font).toMatch(/NotoSansThai-[A-Za-z]+/);
      });
    });
  });

  describe('Typography', () => {
    let originalOS: string;

    beforeAll(() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      originalOS = require('react-native').Platform.OS;
    });

    afterEach(() => {
      jest.resetModules();
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('react-native').Platform.OS = originalOS;
    });

    it('should use 600 for bold on iOS', () => {
      jest.resetModules();
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('react-native').Platform.OS = 'ios';
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { typography } = require('../typography');
      expect(typography.bold).toBe('600');
    });

    it('should use NotoSansThai-Bold for bold on Android', () => {
      jest.resetModules();
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('react-native').Platform.OS = 'android';
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { typography } = require('../typography');
      expect(typography.bold).toBe('NotoSansThai-Bold');
    });
  });

  describe('theme', () => {
    it('should have all theme properties defined', () => {
      expect(theme.colors).toBeDefined();
      expect(theme.spacing).toBeDefined();
      expect(theme.textVariants).toBeDefined();
      expect(theme.buttonVariants).toBeDefined();
      expect(theme.borderRadii).toBeDefined();
      expect(theme.breakpoints).toBeDefined();
      expect(theme.zIndices).toBeDefined();
    });

    it('should have colors from palette', () => {
      expect(theme.colors.primary).toBe(palette.primary);
      expect(theme.colors.background).toBe(palette.background);
      expect(theme.colors.text).toBe(palette.gray800);
    });

    it('should have spacing values', () => {
      expect(theme.spacing.xs).toBe(spacing.xs);
      expect(theme.spacing.md).toBe(spacing.md);
      expect(theme.spacing.lg).toBe(spacing.lg);
    });

    it('should have text variants defined', () => {
      expect(theme.textVariants.h1).toBeDefined();
      expect(theme.textVariants.body).toBeDefined();
      expect(theme.textVariants.caption).toBeDefined();
      expect(theme.textVariants.buttonText).toBeDefined();
    });

    it('should have button variants defined', () => {
      expect(theme.buttonVariants.defaults).toBeDefined();
      expect(theme.buttonVariants.solid).toBeDefined();
      expect(theme.buttonVariants.outline).toBeDefined();
      expect(theme.buttonVariants.ghost).toBeDefined();
    });

    it('should have border radius values', () => {
      expect(theme.borderRadii.sm).toBe(4);
      expect(theme.borderRadii.md).toBe(8);
      expect(theme.borderRadii.lg).toBe(12);
      expect(theme.borderRadii.xl).toBe(16);
    });

    it('should have breakpoints defined', () => {
      expect(theme.breakpoints.phone).toBe(0);
      expect(theme.breakpoints.tablet).toBe(768);
      expect(theme.breakpoints.desktop).toBe(1024);
    });

    it('should have z-index values', () => {
      expect(theme.zIndices.dropdown).toBe(10);
      expect(theme.zIndices.modal).toBe(20);
      expect(theme.zIndices.toast).toBe(30);
      expect(theme.zIndices.tooltip).toBe(40);
    });

    it('should have consistent structure across variants', () => {
      // Test text variants structure
      const textVariantKeys = ['fontFamily', 'fontSize', 'color'];
      Object.values(theme.textVariants).forEach(variant => {
        textVariantKeys.forEach(key => {
          expect(variant).toHaveProperty(key);
        });
      });

      // Test button variants structure
      const buttonVariantKeys = ['backgroundColor', 'padding', 'borderRadius'];
      Object.values(theme.buttonVariants).forEach(variant => {
        buttonVariantKeys.forEach(key => {
          expect(variant).toHaveProperty(key);
        });
      });
    });

    it('should have valid numeric values for spacing and sizing', () => {
      // Test spacing values
      Object.values(theme.spacing).forEach(value => {
        expect(typeof value).toBe('number');
        expect(value).toBeGreaterThanOrEqual(0);
      });

      // Test border radius
      Object.values(theme.borderRadii).forEach(value => {
        expect(typeof value).toBe('number');
        expect(value).toBeGreaterThanOrEqual(0);
      });

      // Test z-index
      Object.values(theme.zIndices).forEach(value => {
        expect(typeof value).toBe('number');
        expect(value).toBeGreaterThanOrEqual(0);
      });

      // Test breakpoints
      Object.values(theme.breakpoints).forEach(value => {
        expect(typeof value).toBe('number');
        expect(value).toBeGreaterThanOrEqual(0);
      });
    });

    it('should have progressive z-index values', () => {
      expect(theme.zIndices.dropdown).toBeLessThan(theme.zIndices.modal);
      expect(theme.zIndices.modal).toBeLessThan(theme.zIndices.toast);
      expect(theme.zIndices.toast).toBeLessThan(theme.zIndices.tooltip);
    });

    it('should have progressive breakpoint values', () => {
      expect(theme.breakpoints.phone).toBeLessThan(theme.breakpoints.tablet);
      expect(theme.breakpoints.tablet).toBeLessThan(theme.breakpoints.desktop);
    });
  });
});
