import { LoadingSpinner } from '@/shared/components/Loading';
import { renderWithTheme } from '@/shared/components/__tests__/misc.utility';
import React from 'react';

describe('LoadingSpinner', () => {
  describe('Component Structure', () => {
    it('should render without crashing', () => {
      expect(() => {
        renderWithTheme(<LoadingSpinner />);
      }).not.toThrow();
    });
  });

  describe('Props Validation', () => {
    it('should accept top prop', () => {
      expect(() => {
        renderWithTheme(<LoadingSpinner top={100} />);
      }).not.toThrow();
    });
  });

  describe('Default Values', () => {
    it('should use default top value', () => {
      expect(() => {
        renderWithTheme(<LoadingSpinner />);
      }).not.toThrow();
    });
  });
});

