import {
  createVariants,
  type VariantConfig,
} from '@/shared/utility/factories/createVariants.factory';

describe('createVariants', () => {
  describe('base styles', () => {
    it('should return base styles when no variants are provided', () => {
      const config: VariantConfig<{ color: string; size: number }> = {
        base: { color: 'blue', size: 16 },
      };

      const getStyles = createVariants(config);
      const result = getStyles();

      expect(result).toEqual({ color: 'blue', size: 16 });
    });

    it('should return empty object when no base and no variants are provided', () => {
      const config: VariantConfig<Record<string, never>> = {};

      const getStyles = createVariants(config);
      const result = getStyles();

      expect(result).toEqual({});
    });

    it('should handle base with nested properties', () => {
      const config: VariantConfig<{
        style: { color: string; fontSize: number };
      }> = {
        base: { style: { color: 'red', fontSize: 14 } },
      };

      const getStyles = createVariants(config);
      const result = getStyles();

      expect(result).toEqual({ style: { color: 'red', fontSize: 14 } });
    });
  });

  describe('variants', () => {
    it('should apply variant styles when variant is selected', () => {
      const config: VariantConfig<
        { color: string; size: number },
        {
          variant: {
            primary: { color: string };
            secondary: { color: string };
          };
        }
      > = {
        base: { color: 'black', size: 16 },
        variants: {
          variant: {
            primary: { color: 'blue' },
            secondary: { color: 'red' },
          },
        },
      };

      const getStyles = createVariants(config);
      const primaryResult = getStyles({ variant: 'primary' });
      const secondaryResult = getStyles({ variant: 'secondary' });

      expect(primaryResult).toEqual({ color: 'blue', size: 16 });
      expect(secondaryResult).toEqual({ color: 'red', size: 16 });
    });

    it('should merge multiple variant properties', () => {
      const config: VariantConfig<
        { color: string; size: number; padding: number },
        {
          variant: {
            primary: { color: string };
            secondary: { color: string };
          };
          size: {
            small: { size: number; padding: number };
            large: { size: number; padding: number };
          };
        }
      > = {
        base: { color: 'black', size: 16, padding: 8 },
        variants: {
          variant: {
            primary: { color: 'blue' },
            secondary: { color: 'red' },
          },
          size: {
            small: { size: 12, padding: 4 },
            large: { size: 24, padding: 16 },
          },
        },
      };

      const getStyles = createVariants(config);
      const result = getStyles({ variant: 'primary', size: 'small' });

      expect(result).toEqual({ color: 'blue', size: 12, padding: 4 });
    });

    it('should return base styles when variant is not provided', () => {
      const config: VariantConfig<
        { color: string; size: number },
        {
          variant: {
            primary: { color: string };
            secondary: { color: string };
          };
        }
      > = {
        base: { color: 'black', size: 16 },
        variants: {
          variant: {
            primary: { color: 'blue' },
            secondary: { color: 'red' },
          },
        },
      };

      const getStyles = createVariants(config);
      const result = getStyles();

      expect(result).toEqual({ color: 'black', size: 16 });
    });

    it('should handle undefined variant value', () => {
      const config: VariantConfig<
        { color: string; size: number },
        {
          variant: {
            primary: { color: string };
            secondary: { color: string };
          };
        }
      > = {
        base: { color: 'black', size: 16 },
        variants: {
          variant: {
            primary: { color: 'blue' },
            secondary: { color: 'red' },
          },
        },
      };

      const getStyles = createVariants(config);
      const result = getStyles({ variant: undefined });

      expect(result).toEqual({ color: 'black', size: 16 });
    });
  });

  describe('defaultVariants', () => {
    it('should apply default variant when no props are provided', () => {
      const config: VariantConfig<
        { color: string; size: number },
        {
          variant: {
            primary: { color: string };
            secondary: { color: string };
          };
        }
      > = {
        base: { color: 'black', size: 16 },
        variants: {
          variant: {
            primary: { color: 'blue' },
            secondary: { color: 'red' },
          },
        },
        defaultVariants: {
          variant: 'primary',
        },
      };

      const getStyles = createVariants(config);
      const result = getStyles();

      expect(result).toEqual({ color: 'blue', size: 16 });
    });

    it('should override default variant when props are provided', () => {
      const config: VariantConfig<
        { color: string; size: number },
        {
          variant: {
            primary: { color: string };
            secondary: { color: string };
          };
        }
      > = {
        base: { color: 'black', size: 16 },
        variants: {
          variant: {
            primary: { color: 'blue' },
            secondary: { color: 'red' },
          },
        },
        defaultVariants: {
          variant: 'primary',
        },
      };

      const getStyles = createVariants(config);
      const result = getStyles({ variant: 'secondary' });

      expect(result).toEqual({ color: 'red', size: 16 });
    });

    it('should apply multiple default variants', () => {
      const config: VariantConfig<
        { color: string; size: number; padding: number },
        {
          variant: {
            primary: { color: string };
            secondary: { color: string };
          };
          size: {
            small: { size: number; padding: number };
            large: { size: number; padding: number };
          };
        }
      > = {
        base: { color: 'black', size: 16, padding: 8 },
        variants: {
          variant: {
            primary: { color: 'blue' },
            secondary: { color: 'red' },
          },
          size: {
            small: { size: 12, padding: 4 },
            large: { size: 24, padding: 16 },
          },
        },
        defaultVariants: {
          variant: 'primary',
          size: 'small',
        },
      };

      const getStyles = createVariants(config);
      const result = getStyles();

      expect(result).toEqual({ color: 'blue', size: 12, padding: 4 });
    });
  });

  describe('compoundVariants', () => {
    it('should apply compound variant when all conditions match', () => {
      const config: VariantConfig<
        { color: string; size: number; border: string },
        {
          variant: {
            primary: { color: string };
            secondary: { color: string };
          };
          size: {
            small: { size: number };
            large: { size: number };
          };
        }
      > = {
        base: { color: 'black', size: 16, border: 'none' },
        variants: {
          variant: {
            primary: { color: 'blue' },
            secondary: { color: 'red' },
          },
          size: {
            small: { size: 12 },
            large: { size: 24 },
          },
        },
        compoundVariants: [
          {
            conditions: { variant: 'primary', size: 'large' },
            style: { border: '2px solid blue' },
          },
        ],
      };

      const getStyles = createVariants(config);
      const result = getStyles({ variant: 'primary', size: 'large' });

      expect(result).toEqual({
        color: 'blue',
        size: 24,
        border: '2px solid blue',
      });
    });

    it('should not apply compound variant when conditions do not match', () => {
      const config: VariantConfig<
        { color: string; size: number; border: string },
        {
          variant: {
            primary: { color: string };
            secondary: { color: string };
          };
          size: {
            small: { size: number };
            large: { size: number };
          };
        }
      > = {
        base: { color: 'black', size: 16, border: 'none' },
        variants: {
          variant: {
            primary: { color: 'blue' },
            secondary: { color: 'red' },
          },
          size: {
            small: { size: 12 },
            large: { size: 24 },
          },
        },
        compoundVariants: [
          {
            conditions: { variant: 'primary', size: 'large' },
            style: { border: '2px solid blue' },
          },
        ],
      };

      const getStyles = createVariants(config);
      const result = getStyles({ variant: 'primary', size: 'small' });

      expect(result).toEqual({
        color: 'blue',
        size: 12,
        border: 'none',
      });
    });

    it('should apply multiple compound variants when conditions match', () => {
      const config: VariantConfig<
        { color: string; size: number; border: string; borderRadius: number },
        {
          variant: {
            primary: { color: string };
            secondary: { color: string };
          };
          size: {
            small: { size: number };
            large: { size: number };
          };
        }
      > = {
        base: { color: 'black', size: 16, border: 'none', borderRadius: 0 },
        variants: {
          variant: {
            primary: { color: 'blue' },
            secondary: { color: 'red' },
          },
          size: {
            small: { size: 12 },
            large: { size: 24 },
          },
        },
        compoundVariants: [
          {
            conditions: { variant: 'primary', size: 'large' },
            style: { border: '2px solid blue', borderRadius: 8 },
          },
          {
            conditions: { variant: 'secondary', size: 'small' },
            style: { border: '1px solid red', borderRadius: 4 },
          },
        ],
      };

      const getStyles = createVariants(config);
      const primaryLarge = getStyles({ variant: 'primary', size: 'large' });
      const secondarySmall = getStyles({ variant: 'secondary', size: 'small' });

      expect(primaryLarge).toEqual({
        color: 'blue',
        size: 24,
        border: '2px solid blue',
        borderRadius: 8,
      });
      expect(secondarySmall).toEqual({
        color: 'red',
        size: 12,
        border: '1px solid red',
        borderRadius: 4,
      });
    });

    it('should merge compound variant with base and regular variants', () => {
      const config: VariantConfig<
        { color: string; size: number; padding: number; border: string },
        {
          variant: {
            primary: { color: string };
            secondary: { color: string };
          };
          size: {
            small: { size: number; padding: number };
            large: { size: number; padding: number };
          };
        }
      > = {
        base: { color: 'black', size: 16, padding: 8, border: 'none' },
        variants: {
          variant: {
            primary: { color: 'blue' },
            secondary: { color: 'red' },
          },
          size: {
            small: { size: 12, padding: 4 },
            large: { size: 24, padding: 16 },
          },
        },
        compoundVariants: [
          {
            conditions: { variant: 'primary', size: 'large' },
            style: { border: '2px solid blue' },
          },
        ],
      };

      const getStyles = createVariants(config);
      const result = getStyles({ variant: 'primary', size: 'large' });

      expect(result).toEqual({
        color: 'blue',
        size: 24,
        padding: 16,
        border: '2px solid blue',
      });
    });
  });

  describe('complex scenarios', () => {
    it('should handle all features together: base, variants, defaults, and compounds', () => {
      const config: VariantConfig<
        {
          color: string;
          size: number;
          padding: number;
          margin: number;
          border: string;
        },
        {
          variant: {
            primary: { color: string };
            secondary: { color: string };
          };
          size: {
            small: { size: number; padding: number };
            large: { size: number; padding: number };
          };
        }
      > = {
        base: { color: 'black', size: 16, padding: 8, margin: 0, border: 'none' },
        variants: {
          variant: {
            primary: { color: 'blue' },
            secondary: { color: 'red' },
          },
          size: {
            small: { size: 12, padding: 4 },
            large: { size: 24, padding: 16 },
          },
        },
        defaultVariants: {
          variant: 'primary',
          size: 'small',
        },
        compoundVariants: [
          {
            conditions: { variant: 'primary', size: 'large' },
            style: { border: '2px solid blue', margin: 4 },
          },
        ],
      };

      const getStyles = createVariants(config);

      const defaultResult = getStyles();
      expect(defaultResult).toEqual({
        color: 'blue',
        size: 12,
        padding: 4,
        margin: 0,
        border: 'none',
      });

      const compoundResult = getStyles({ variant: 'primary', size: 'large' });
      expect(compoundResult).toEqual({
        color: 'blue',
        size: 24,
        padding: 16,
        margin: 4,
        border: '2px solid blue',
      });

      const overrideResult = getStyles({ variant: 'secondary', size: 'large' });
      expect(overrideResult).toEqual({
        color: 'red',
        size: 24,
        padding: 16,
        margin: 0,
        border: 'none',
      });
    });

    it('should handle partial compound variant conditions', () => {
      const config: VariantConfig<
        { color: string; size: number; border: string },
        {
          variant: {
            primary: { color: string };
            secondary: { color: string };
          };
          size: {
            small: { size: number };
            large: { size: number };
          };
        }
      > = {
        base: { color: 'black', size: 16, border: 'none' },
        variants: {
          variant: {
            primary: { color: 'blue' },
            secondary: { color: 'red' },
          },
          size: {
            small: { size: 12 },
            large: { size: 24 },
          },
        },
        compoundVariants: [
          {
            conditions: { variant: 'primary' },
            style: { border: '1px solid blue' },
          },
        ],
      };

      const getStyles = createVariants(config);
      const result1 = getStyles({ variant: 'primary', size: 'small' });
      const result2 = getStyles({ variant: 'primary', size: 'large' });
      const result3 = getStyles({ variant: 'secondary', size: 'small' });

      expect(result1).toEqual({ color: 'blue', size: 12, border: '1px solid blue' });
      expect(result2).toEqual({ color: 'blue', size: 24, border: '1px solid blue' });
      expect(result3).toEqual({ color: 'red', size: 12, border: 'none' });
    });
  });
});

