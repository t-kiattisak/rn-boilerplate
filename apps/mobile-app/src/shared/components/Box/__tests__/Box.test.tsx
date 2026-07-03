import { Box } from '@/shared/components/Box';
import { renderWithTheme } from '@/shared/components/__tests__/misc.utility';
import React from 'react';

describe('Box', () => {
  describe('Component Structure', () => {
    it('should render without crashing', () => {
      expect(() => {
        renderWithTheme(<Box />);
      }).not.toThrow();
    });

    it('should render children correctly', () => {
      expect(() => {
        renderWithTheme(
          <Box>
            <Box testID="child-box">Test Content</Box>
          </Box>
        );
      }).not.toThrow();
    });
  });

  describe('Props Validation', () => {
    it('should accept spacing props', () => {
      expect(() => {
        renderWithTheme(<Box p="md" m="sm" />);
      }).not.toThrow();
    });

    it('should accept layout props', () => {
      expect(() => {
        renderWithTheme(<Box width="100%" height={100} />);
      }).not.toThrow();
    });

    it('should accept backgroundColor prop', () => {
      expect(() => {
        renderWithTheme(<Box backgroundColor="primary" />);
      }).not.toThrow();
    });

    it('should accept flex props', () => {
      expect(() => {
        renderWithTheme(<Box flex={1} flexDirection="row" />);
      }).not.toThrow();
    });

    it('should accept border props', () => {
      expect(() => {
        renderWithTheme(
          <Box borderWidth={1} borderRadius="md" borderColor="gray200" />
        );
      }).not.toThrow();
    });
  });
});

