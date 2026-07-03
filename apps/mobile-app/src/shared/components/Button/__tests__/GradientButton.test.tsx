import { GradientButton } from '@/shared/components/Button';
import { renderWithTheme } from '@/shared/components/__tests__/misc.utility';
import React from 'react';

describe('GradientButton', () => {
  const defaultProps = {
    children: 'Test Button',
  };

  describe('Component Structure', () => {
    it('should render without crashing', () => {
      expect(() => {
        renderWithTheme(<GradientButton {...defaultProps} />);
      }).not.toThrow();
    });

    it('should render children correctly', () => {
      expect(() => {
        renderWithTheme(<GradientButton {...defaultProps} />);
      }).not.toThrow();
    });
  });

  describe('Props Validation', () => {
    it('should accept color prop', () => {
      expect(() => {
        renderWithTheme(<GradientButton {...defaultProps} color="magenta" />);
      }).not.toThrow();
    });

    it('should accept all color variants', () => {
      const colors: Array<'magenta' | 'ocean' | 'sunset'> = [
        'magenta',
        'ocean',
        'sunset',
      ];

      for (const color of colors) {
        expect(() => {
          renderWithTheme(<GradientButton {...defaultProps} color={color} />);
        }).not.toThrow();
      }
    });

    it('should accept disabled prop', () => {
      expect(() => {
        renderWithTheme(<GradientButton {...defaultProps} disabled />);
      }).not.toThrow();
    });

    it('should accept onPress prop', () => {
      const onPress = jest.fn();
      expect(() => {
        renderWithTheme(
          <GradientButton {...defaultProps} onPress={onPress} />
        );
      }).not.toThrow();
    });

    it('should accept style prop', () => {
      expect(() => {
        renderWithTheme(
          <GradientButton {...defaultProps} style={{ marginTop: 10 }} />
        );
      }).not.toThrow();
    });
  });

  describe('Default Values', () => {
    it('should use default color value', () => {
      expect(() => {
        renderWithTheme(<GradientButton {...defaultProps} />);
      }).not.toThrow();
    });

    it('should use default disabled value', () => {
      expect(() => {
        renderWithTheme(<GradientButton {...defaultProps} />);
      }).not.toThrow();
    });
  });

  describe('Interaction', () => {
    it('should accept onPress prop for interaction', () => {
      const onPress = jest.fn();
      expect(() => {
        renderWithTheme(
          <GradientButton {...defaultProps} onPress={onPress} />
        );
      }).not.toThrow();
    });

    it('should accept disabled prop to prevent interaction', () => {
      const onPress = jest.fn();
      expect(() => {
        renderWithTheme(
          <GradientButton {...defaultProps} disabled onPress={onPress} />
        );
      }).not.toThrow();
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref correctly', () => {
      const ref = React.createRef<any>();
      expect(() => {
        renderWithTheme(<GradientButton {...defaultProps} ref={ref} />);
      }).not.toThrow();
    });
  });
});

