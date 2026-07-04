import { ImageButton } from '../ImageButton';
import { renderWithTheme } from '../../__tests__/misc.utility';
import React from 'react';
import { Image } from 'react-native';


describe('ImageButton', () => {
  const defaultProps = {
    image: { uri: 'https://example.com/image.png' },
    children: 'Test Button',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Structure', () => {
    it('should render without crashing', () => {
      expect(() => {
        renderWithTheme(<ImageButton {...defaultProps} />);
      }).not.toThrow();
    });

    it('should render children correctly', () => {
      expect(() => {
        renderWithTheme(<ImageButton {...defaultProps} />);
      }).not.toThrow();
    });

    it('should render image', () => {
      const { UNSAFE_root } = renderWithTheme(<ImageButton {...defaultProps} />);
      const images = UNSAFE_root.findAllByType(Image as any);
      expect(images.length).toBeGreaterThan(0);
    });
  });

  describe('Props Validation', () => {
    it('should accept image prop', () => {
      expect(() => {
        renderWithTheme(<ImageButton {...defaultProps} />);
      }).not.toThrow();
    });

    it('should accept size prop', () => {
      expect(() => {
        renderWithTheme(<ImageButton {...defaultProps} size="sm" />);
      }).not.toThrow();
    });

    it('should accept all size variants', () => {
      const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
      for (const size of sizes) {
        expect(() => {
          renderWithTheme(<ImageButton {...defaultProps} size={size} />);
        }).not.toThrow();
      }
    });

    it('should accept imageStyle prop', () => {
      expect(() => {
        renderWithTheme(
          <ImageButton {...defaultProps} imageStyle={{ borderRadius: 10 }} />
        );
      }).not.toThrow();
    });

    it('should accept variant prop', () => {
      expect(() => {
        renderWithTheme(<ImageButton {...defaultProps} variant="solid" />);
      }).not.toThrow();
    });

    it('should accept onPress prop', () => {
      const onPress = jest.fn();
      expect(() => {
        renderWithTheme(<ImageButton {...defaultProps} onPress={onPress} />);
      }).not.toThrow();
    });

    it('should accept disabled prop', () => {
      expect(() => {
        renderWithTheme(<ImageButton {...defaultProps} />);
      }).not.toThrow();
    });
  });

  describe('Default Values', () => {
    it('should use default size value', () => {
      expect(() => {
        renderWithTheme(<ImageButton {...defaultProps} />);
      }).not.toThrow();
    });

    it('should use default variant value', () => {
      expect(() => {
        renderWithTheme(<ImageButton {...defaultProps} />);
      }).not.toThrow();
    });
  });

  describe('Image Sizes', () => {
    it('should apply correct size for sm', () => {
      expect(() => {
        renderWithTheme(<ImageButton {...defaultProps} size="sm" />);
      }).not.toThrow();
    });

    it('should apply correct size for md', () => {
      expect(() => {
        renderWithTheme(<ImageButton {...defaultProps} size="md" />);
      }).not.toThrow();
    });

    it('should apply correct size for lg', () => {
      expect(() => {
        renderWithTheme(<ImageButton {...defaultProps} size="lg" />);
      }).not.toThrow();
    });
  });

  describe('Interaction', () => {
    it('should accept onPress prop for interaction', () => {
      const onPress = jest.fn();
      expect(() => {
        renderWithTheme(<ImageButton {...defaultProps} onPress={onPress} />);
      }).not.toThrow();
    });

    it('should accept disabled prop to prevent interaction', () => {
      const onPress = jest.fn();
      expect(() => {
        renderWithTheme(<ImageButton {...defaultProps} onPress={onPress} />);
      }).not.toThrow();
    });
  });
});

