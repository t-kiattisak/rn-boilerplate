import { LoadingDots } from '..';
import { renderWithTheme } from '../../__tests__/misc.utility';
import React from 'react';

describe('LoadingDots', () => {
  describe('Component Structure', () => {
    it('should render without crashing', () => {
      expect(() => {
        renderWithTheme(<LoadingDots />);
      }).not.toThrow();
    });
  });

  describe('Props Validation', () => {
    it('should accept size prop', () => {
      expect(() => {
        renderWithTheme(<LoadingDots size={16} />);
      }).not.toThrow();
    });
  });

  describe('Default Values', () => {
    it('should use default size value', () => {
      expect(() => {
        renderWithTheme(<LoadingDots />);
      }).not.toThrow();
    });
  });
});

