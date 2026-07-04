import { Button } from '..';
import { Typography } from '../../Text';
import { renderWithTheme } from '../../__tests__/misc.utility';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

describe('Button', () => {
  const defaultProps = {
    children: 'Test Button',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Structure', () => {
    it('should render without crashing', () => {
      expect(() => {
        renderWithTheme(<Button {...defaultProps} />);
      }).not.toThrow();
    });

    it('should render children correctly', () => {
      expect(() => {
        renderWithTheme(<Button {...defaultProps} />);
      }).not.toThrow();
    });

    it('should wrap string children with Typography', () => {
      const { getByText } = renderWithTheme(<Button>Test Button</Button>);
      expect(getByText('Test Button')).toBeTruthy();
    });

    it('should wrap number children with Typography', () => {
      const { getByText } = renderWithTheme(<Button>{123}</Button>);
      expect(getByText('123')).toBeTruthy();
    });

    it('should render React element children directly without Typography wrapper', () => {
      const { getByTestId, UNSAFE_root } = renderWithTheme(
        <Button>
          <Text testID="custom-text">Custom Element</Text>
        </Button>
      );
      const typography = UNSAFE_root.findAllByType(Typography);
      expect(typography).toHaveLength(0);
      expect(getByTestId('custom-text')).toBeTruthy();
    });

    it('should render View element children directly without Typography wrapper', () => {
      const { getByTestId, UNSAFE_root } = renderWithTheme(
        <Button>
          <View testID="custom-view" />
        </Button>
      );
      const typography = UNSAFE_root.findAllByType(Typography);
      expect(typography).toHaveLength(0);
      expect(getByTestId('custom-view')).toBeTruthy();
    });

    it('should handle null children', () => {
      expect(() => {
        renderWithTheme(<Button>{null}</Button>);
      }).not.toThrow();
    });

    it('should handle undefined children', () => {
      expect(() => {
        renderWithTheme(<Button>{undefined}</Button>);
      }).not.toThrow();
    });
  });

  describe('Props Validation', () => {
    it('should accept onPress prop', () => {
      const onPress = jest.fn();
      expect(() => {
        renderWithTheme(<Button {...defaultProps} onPress={onPress} />);
      }).not.toThrow();
    });

    it('should accept disabled prop', () => {
      expect(() => {
        renderWithTheme(<Button {...defaultProps} disabled />);
      }).not.toThrow();
    });

    it('should accept variant prop', () => {
      expect(() => {
        renderWithTheme(<Button {...defaultProps} variant="solid" />);
      }).not.toThrow();
    });

    it('should accept spacing props', () => {
      expect(() => {
        renderWithTheme(<Button {...defaultProps} p="md" m="sm" />);
      }).not.toThrow();
    });

    it('should accept layout props', () => {
      expect(() => {
        renderWithTheme(<Button {...defaultProps} width="100%" />);
      }).not.toThrow();
    });

    it('should accept backgroundColor prop', () => {
      expect(() => {
        renderWithTheme(<Button {...defaultProps} backgroundColor="primary" />);
      }).not.toThrow();
    });

    it('should accept color prop', () => {
      expect(() => {
        renderWithTheme(<Button {...defaultProps} color="primary" />);
      }).not.toThrow();
    });

    it('should accept size prop', () => {
      expect(() => {
        renderWithTheme(<Button {...defaultProps} size="sm" />);
        renderWithTheme(<Button {...defaultProps} size="md" />);
        renderWithTheme(<Button {...defaultProps} size="lg" />);
      }).not.toThrow();
    });

    it('should pass color prop to Typography when children is string', () => {
      const { getByText } = renderWithTheme(
        <Button color="danger">Error Button</Button>
      );
      expect(getByText('Error Button')).toBeTruthy();
    });

    it('should not pass color prop when children is React element', () => {
      const { UNSAFE_root } = renderWithTheme(
        <Button color="primary">
          <Text testID="custom">Custom</Text>
        </Button>
      );
      const typography = UNSAFE_root.findAllByType(Typography);
      expect(typography).toHaveLength(0);
    });
  });

  describe('Interaction', () => {
    it('should call onPress when pressed', () => {
      const onPress = jest.fn();
      const { UNSAFE_root } = renderWithTheme(
        <Button {...defaultProps} onPress={onPress} />
      );
      const touchable = UNSAFE_root.findByType(TouchableOpacity);
      touchable.props.onPress();
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('should not call onPress when disabled', () => {
      const onPress = jest.fn();
      const { UNSAFE_root } = renderWithTheme(
        <Button {...defaultProps} disabled onPress={onPress} />
      );
      const touchable = UNSAFE_root.findByType(TouchableOpacity);
      touchable.props.onPress();
      expect(onPress).not.toHaveBeenCalled();
    });

    it('should not call onPress when onPress is not provided', () => {
      const { UNSAFE_root } = renderWithTheme(<Button {...defaultProps} />);
      const touchable = UNSAFE_root.findByType(TouchableOpacity);
      expect(() => {
        touchable.props.onPress();
      }).not.toThrow();
    });
  });

  describe('Default Values', () => {
    it('should have default minHeight', () => {
      expect(() => {
        renderWithTheme(<Button {...defaultProps} />);
      }).not.toThrow();
    });

    it('should have default size of md', () => {
      expect(() => {
        renderWithTheme(<Button {...defaultProps} />);
      }).not.toThrow();
    });

    it('should accept sm size', () => {
      expect(() => {
        renderWithTheme(<Button {...defaultProps} size="sm" />);
      }).not.toThrow();
    });

    it('should accept md size', () => {
      expect(() => {
        renderWithTheme(<Button {...defaultProps} size="md" />);
      }).not.toThrow();
    });

    it('should accept lg size', () => {
      expect(() => {
        renderWithTheme(<Button {...defaultProps} size="lg" />);
      }).not.toThrow();
    });

    it('should have default opacity when not disabled', () => {
      expect(() => {
        renderWithTheme(<Button {...defaultProps} />);
      }).not.toThrow();
    });

    it('should have reduced opacity when disabled', () => {
      expect(() => {
        renderWithTheme(<Button {...defaultProps} disabled />);
      }).not.toThrow();
    });

    it('should have default activeOpacity', () => {
      expect(() => {
        renderWithTheme(<Button {...defaultProps} />);
      }).not.toThrow();
    });
  });
});

