import { Card } from '..';
import { renderWithTheme } from '../../__tests__/misc.utility';
import React from 'react';

describe('Card', () => {
  describe('Component Structure', () => {
    it('should render without crashing', () => {
      expect(() => {
        renderWithTheme(<Card>Test</Card>);
      }).not.toThrow();
    });

    it('should render children correctly', () => {
      expect(() => {
        renderWithTheme(<Card>Test Content</Card>);
      }).not.toThrow();
    });
  });

  describe('Props Validation', () => {
    it('should accept shadow prop', () => {
      expect(() => {
        renderWithTheme(<Card shadow="md">Test</Card>);
      }).not.toThrow();
    });

    it('should accept all shadow variants', () => {
      const shadows: Array<'none' | 'md' | 'lg' | 'bottom' | 'avatar' | 'card' | 'top'> = [
        'none',
        'md',
        'lg',
        'bottom',
        'avatar',
        'card',
        'top',
      ];

      for (const shadow of shadows) {
        expect(() => {
          renderWithTheme(<Card shadow={shadow}>Test</Card>);
        }).not.toThrow();
      }
    });

    it('should accept backgroundColor prop', () => {
      expect(() => {
        renderWithTheme(<Card backgroundColor="primary">Test</Card>);
      }).not.toThrow();
    });

    it('should accept borderRadius prop', () => {
      expect(() => {
        renderWithTheme(<Card borderRadius="lg">Test</Card>);
      }).not.toThrow();
    });

    it('should accept padding prop', () => {
      expect(() => {
        renderWithTheme(<Card padding="lg">Test</Card>);
      }).not.toThrow();
    });

    it('should accept shadowColor prop', () => {
      expect(() => {
        renderWithTheme(<Card shadowColor="#000000">Test</Card>);
      }).not.toThrow();
    });

    it('should accept distance prop', () => {
      expect(() => {
        renderWithTheme(<Card distance={10}>Test</Card>);
      }).not.toThrow();
    });

    it('should accept style prop', () => {
      expect(() => {
        renderWithTheme(<Card style={{ marginTop: 10 }}>Test</Card>);
      }).not.toThrow();
    });
  });

  describe('Default Values', () => {
    it('should use default shadow value', () => {
      expect(() => {
        renderWithTheme(<Card>Test</Card>);
      }).not.toThrow();
    });

    it('should use default backgroundColor value', () => {
      expect(() => {
        renderWithTheme(<Card>Test</Card>);
      }).not.toThrow();
    });

    it('should use default borderRadius value', () => {
      expect(() => {
        renderWithTheme(<Card>Test</Card>);
      }).not.toThrow();
    });

    it('should use default padding value', () => {
      expect(() => {
        renderWithTheme(<Card>Test</Card>);
      }).not.toThrow();
    });
  });

  describe('Shadow Variants', () => {
    it('should render without shadow when shadow is none', () => {
      expect(() => {
        renderWithTheme(<Card shadow="none">Test</Card>);
      }).not.toThrow();
    });
  });
});

