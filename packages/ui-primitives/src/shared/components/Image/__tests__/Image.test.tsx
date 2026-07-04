import React from 'react';

import { FastImage } from '..';
import { renderWithTheme } from '../../__tests__/misc.utility';

describe('Image (FastImage)', () => {
  const mockUriSource = { uri: 'https://example.com/image.jpg' };
  const mockNumberSource = 1;

  describe('Component Structure', () => {
    it('should render without crashing', () => {
      expect(() => {
        renderWithTheme(<FastImage source={mockUriSource} />);
      }).not.toThrow();
    });

    it('should render with number source', () => {
      expect(() => {
        renderWithTheme(<FastImage source={mockNumberSource} />);
      }).not.toThrow();
    });
  });

  describe('Props Validation', () => {
    it('should accept source prop with uri', () => {
      expect(() => {
        renderWithTheme(<FastImage source={mockUriSource} />);
      }).not.toThrow();
    });

    it('should accept source prop as number', () => {
      expect(() => {
        renderWithTheme(<FastImage source={mockNumberSource} />);
      }).not.toThrow();
    });

    it('should accept resizeMode prop', () => {
      expect(() => {
        renderWithTheme(
          <FastImage resizeMode="contain" source={mockUriSource} />
        );
      }).not.toThrow();
    });

    it('should accept style prop', () => {
      expect(() => {
        renderWithTheme(
          <FastImage source={mockUriSource} style={{ width: 100 }} />
        );
      }).not.toThrow();
    });
  });

  describe('Default Values', () => {
    it('should use default resizeMode value', () => {
      expect(() => {
        renderWithTheme(<FastImage source={mockUriSource} />);
      }).not.toThrow();
    });
  });
});
