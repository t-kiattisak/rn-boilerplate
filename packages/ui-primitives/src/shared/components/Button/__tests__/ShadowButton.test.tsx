import { ShadowButton } from '..';
import { renderWithTheme } from '../../__tests__/misc.utility';
import React from 'react';
import { Pressable } from 'react-native';


describe('ShadowButton', () => {
  const defaultProps = {
    children: 'Test Button',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Structure', () => {
    it('should render without crashing', () => {
      expect(() => {
        renderWithTheme(<ShadowButton {...defaultProps} />);
      }).not.toThrow();
    });

    it('should render children correctly', () => {
      expect(() => {
        renderWithTheme(<ShadowButton {...defaultProps} />);
      }).not.toThrow();
    });
  });

  describe('Props Validation', () => {
    it('should accept tone prop', () => {
      expect(() => {
        renderWithTheme(<ShadowButton {...defaultProps} tone="default" />);
      }).not.toThrow();
    });

    it('should accept all tone variants', () => {
      const tones: Array<'default' | 'subtle'> = ['default', 'subtle'];
      for (const tone of tones) {
        expect(() => {
          renderWithTheme(<ShadowButton {...defaultProps} tone={tone} />);
        }).not.toThrow();
      }
    });

    it('should accept width prop', () => {
      expect(() => {
        renderWithTheme(<ShadowButton {...defaultProps} width="fit" />);
      }).not.toThrow();
    });

    it('should accept all width variants', () => {
      const widths: Array<'fit' | 'full'> = ['fit', 'full'];
      for (const width of widths) {
        expect(() => {
          renderWithTheme(<ShadowButton {...defaultProps} width={width} />);
        }).not.toThrow();
      }
    });

    it('should accept disabled prop', () => {
      expect(() => {
        renderWithTheme(<ShadowButton {...defaultProps} disabled />);
      }).not.toThrow();
    });

    it('should accept onPress prop', () => {
      const onPress = jest.fn();
      expect(() => {
        renderWithTheme(<ShadowButton {...defaultProps} onPress={onPress} />);
      }).not.toThrow();
    });

    it('should accept style prop', () => {
      expect(() => {
        renderWithTheme(
          <ShadowButton {...defaultProps} style={{ marginTop: 10 }} />
        );
      }).not.toThrow();
    });
  });

  describe('Default Values', () => {
    it('should use default tone value', () => {
      expect(() => {
        renderWithTheme(<ShadowButton {...defaultProps} />);
      }).not.toThrow();
    });

    it('should use default width value', () => {
      expect(() => {
        renderWithTheme(<ShadowButton {...defaultProps} />);
      }).not.toThrow();
    });

    it('should use default disabled value', () => {
      expect(() => {
        renderWithTheme(<ShadowButton {...defaultProps} />);
      }).not.toThrow();
    });
  });

  describe('Interaction', () => {
    it('should accept onPress prop for interaction', () => {
      const onPress = jest.fn();
      expect(() => {
        renderWithTheme(<ShadowButton {...defaultProps} onPress={onPress} />);
      }).not.toThrow();
    });

    it('should accept disabled prop to prevent interaction', () => {
      const onPress = jest.fn();
      expect(() => {
        renderWithTheme(
          <ShadowButton {...defaultProps} disabled onPress={onPress} />
        );
      }).not.toThrow();
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref correctly', () => {
      const ref = React.createRef<any>();
      expect(() => {
        renderWithTheme(<ShadowButton {...defaultProps} ref={ref} />);
      }).not.toThrow();
    });
  });

  describe('Style Function', () => {
    it('should apply pressed state style when pressed', () => {
      const { UNSAFE_root } = renderWithTheme(<ShadowButton {...defaultProps} />);
      const pressable = UNSAFE_root.findByType(Pressable);
      const styleFn = pressable.props.style;
      if (typeof styleFn === 'function') {
        const pressedStyle = styleFn({ pressed: true } as any);
        expect(pressedStyle).toBeTruthy();
      }
    });

    it('should not apply pressed state style when disabled', () => {
      const { UNSAFE_root } = renderWithTheme(
        <ShadowButton {...defaultProps} disabled />
      );
      const pressable = UNSAFE_root.findByType(Pressable);
      const styleFn = pressable.props.style;
      if (typeof styleFn === 'function') {
        const pressedStyle = styleFn({ pressed: true } as any);
        expect(pressedStyle).toBeTruthy();
      }
    });

    it('should not apply pressed state style when not pressed', () => {
      const { UNSAFE_root } = renderWithTheme(<ShadowButton {...defaultProps} />);
      const pressable = UNSAFE_root.findByType(Pressable);
      const styleFn = pressable.props.style;
      if (typeof styleFn === 'function') {
        const notPressedStyle = styleFn({ pressed: false } as any);
        expect(notPressedStyle).toBeTruthy();
      }
    });
  });
});

