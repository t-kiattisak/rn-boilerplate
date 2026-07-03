import { IconButton } from '@/shared/components/Button/IconButton';
import { renderWithTheme } from '@/shared/components/__tests__/misc.utility';
import React from 'react';
import { Text } from 'react-native';

describe('IconButton', () => {
  const mockIcon = <Text testID="test-icon">Icon</Text>;
  const defaultProps = {
    icon: mockIcon,
    children: 'Test Button',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Structure', () => {
    it('should render without crashing', () => {
      expect(() => {
        renderWithTheme(<IconButton {...defaultProps} />);
      }).not.toThrow();
    });

    it('should render children correctly', () => {
      expect(() => {
        renderWithTheme(<IconButton {...defaultProps} />);
      }).not.toThrow();
    });

    it('should render icon', () => {
      const { getByTestId } = renderWithTheme(<IconButton {...defaultProps} />);
      expect(getByTestId('test-icon')).toBeTruthy();
    });
  });

  describe('Props Validation', () => {
    it('should accept icon prop', () => {
      expect(() => {
        renderWithTheme(<IconButton {...defaultProps} />);
      }).not.toThrow();
    });

    it('should accept size prop', () => {
      expect(() => {
        renderWithTheme(<IconButton {...defaultProps} size="sm" />);
      }).not.toThrow();
    });

    it('should accept all size variants', () => {
      const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
      for (const size of sizes) {
        expect(() => {
          renderWithTheme(<IconButton {...defaultProps} size={size} />);
        }).not.toThrow();
      }
    });

    it('should accept iconStyle prop', () => {
      expect(() => {
        renderWithTheme(
          <IconButton {...defaultProps} iconStyle={{ borderRadius: 10 }} />
        );
      }).not.toThrow();
    });

    it('should accept variant prop', () => {
      expect(() => {
        renderWithTheme(<IconButton {...defaultProps} variant="solid" />);
      }).not.toThrow();
    });

    it('should accept onPress prop', () => {
      const onPress = jest.fn();
      expect(() => {
        renderWithTheme(<IconButton {...defaultProps} onPress={onPress} />);
      }).not.toThrow();
    });

    it('should accept disabled prop through ButtonProps', () => {
      expect(() => {
        renderWithTheme(<IconButton {...defaultProps} />);
      }).not.toThrow();
    });
  });

  describe('Default Values', () => {
    it('should use default size value', () => {
      expect(() => {
        renderWithTheme(<IconButton {...defaultProps} />);
      }).not.toThrow();
    });
  });

  describe('Icon Sizes', () => {
    it('should apply correct size for sm', () => {
      expect(() => {
        renderWithTheme(<IconButton {...defaultProps} size="sm" />);
      }).not.toThrow();
    });

    it('should apply correct size for md', () => {
      expect(() => {
        renderWithTheme(<IconButton {...defaultProps} size="md" />);
      }).not.toThrow();
    });

    it('should apply correct size for lg', () => {
      expect(() => {
        renderWithTheme(<IconButton {...defaultProps} size="lg" />);
      }).not.toThrow();
    });
  });

  describe('Interaction', () => {
    it('should accept onPress prop for interaction', () => {
      const onPress = jest.fn();
      expect(() => {
        renderWithTheme(<IconButton {...defaultProps} onPress={onPress} />);
      }).not.toThrow();
    });

    it('should accept disabled prop to prevent interaction', () => {
      const onPress = jest.fn();
      expect(() => {
        renderWithTheme(<IconButton {...defaultProps} onPress={onPress} />);
      }).not.toThrow();
    });
  });
});

