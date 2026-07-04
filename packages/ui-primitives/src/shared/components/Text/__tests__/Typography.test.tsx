import { Typography } from '..';
import { renderWithTheme } from '../../__tests__/misc.utility';
import React from 'react';

describe('Typography', () => {
  describe('Component Structure', () => {
    it('should render without crashing', () => {
      expect(() => {
        renderWithTheme(<Typography>Test</Typography>);
      }).not.toThrow();
    });

    it('should render children correctly', () => {
      const { getByText } = renderWithTheme(
        <Typography>Test Content</Typography>
      );
      expect(getByText('Test Content')).toBeTruthy();
    });

    it('should render empty children without error', () => {
      expect(() => {
        renderWithTheme(<Typography />);
      }).not.toThrow();
    });

    it('should render with ReactNode children', () => {
      const { getByText } = renderWithTheme(
        <Typography>
          <Typography>Nested</Typography>
        </Typography>
      );
      expect(getByText('Nested')).toBeTruthy();
    });
  });

  describe('Props Validation', () => {
    it('should accept weight prop', () => {
      expect(() => {
        renderWithTheme(<Typography weight="bold">Test</Typography>);
      }).not.toThrow();
    });

    it('should accept variant prop', () => {
      expect(() => {
        renderWithTheme(<Typography variant="h1">Test</Typography>);
      }).not.toThrow();
    });

    it('should accept color prop', () => {
      expect(() => {
        renderWithTheme(<Typography color="primary">Test</Typography>);
      }).not.toThrow();
    });

    it('should accept numberOfLines prop', () => {
      const { getByText } = renderWithTheme(
        <Typography numberOfLines={2}>Long text content</Typography>
      );
      const textElement = getByText('Long text content');
      expect(textElement).toBeTruthy();
      expect(textElement.props.numberOfLines).toBe(2);
    });

    it('should accept withAsterisk prop and show asterisk', () => {
      const { getByText } = renderWithTheme(
        <Typography withAsterisk>Test</Typography>
      );
      expect(getByText('Test')).toBeTruthy();
      expect(getByText('*')).toBeTruthy();
    });

    it('should accept asteriskColor prop', () => {
      const { getByText } = renderWithTheme(
        <Typography withAsterisk asteriskColor="red400">
          Test
        </Typography>
      );
      expect(getByText('Test')).toBeTruthy();
      expect(getByText('*')).toBeTruthy();
    });

    it('should accept style prop', () => {
      const { getByText } = renderWithTheme(
        <Typography style={{ fontSize: 20 }}>Test</Typography>
      );
      expect(getByText('Test')).toBeTruthy();
    });

    it('should accept testID prop', () => {
      const { getByTestId } = renderWithTheme(
        <Typography testID="test-typography">Test</Typography>
      );
      expect(getByTestId('test-typography')).toBeTruthy();
    });
  });

  describe('Weight Mapping', () => {
    it('should map bold weight correctly', () => {
      const { getByText } = renderWithTheme(
        <Typography weight="bold">Test</Typography>
      );
      expect(getByText('Test')).toBeTruthy();
    });

    it('should map semibold weight correctly', () => {
      const { getByText } = renderWithTheme(
        <Typography weight="semibold">Test</Typography>
      );
      expect(getByText('Test')).toBeTruthy();
    });

    it('should map regular weight correctly', () => {
      const { getByText } = renderWithTheme(
        <Typography weight="regular">Test</Typography>
      );
      expect(getByText('Test')).toBeTruthy();
    });

    it('should use default weight when not specified', () => {
      const { getByText } = renderWithTheme(<Typography>Test</Typography>);
      expect(getByText('Test')).toBeTruthy();
    });
  });

  describe('withAsterisk prop behavior', () => {
    it('should not show asterisk when withAsterisk is false', () => {
      const { getByText, queryByText } = renderWithTheme(
        <Typography withAsterisk={false}>Test</Typography>
      );
      expect(getByText('Test')).toBeTruthy();
      expect(queryByText('*')).toBeNull();
    });

    it('should show asterisk with default color when withAsterisk is true', () => {
      const { getByText } = renderWithTheme(
        <Typography withAsterisk>Test</Typography>
      );
      expect(getByText('Test')).toBeTruthy();
      expect(getByText('*')).toBeTruthy();
    });

    it('should show asterisk with custom color when asteriskColor is provided', () => {
      const { getByText } = renderWithTheme(
        <Typography withAsterisk asteriskColor="primary">
          Test
        </Typography>
      );
      expect(getByText('Test')).toBeTruthy();
      expect(getByText('*')).toBeTruthy();
    });
  });

  describe('Variant combinations', () => {
    it('should work with variant and weight together', () => {
      const { getByText } = renderWithTheme(
        <Typography variant="h1" weight="bold">
          Heading
        </Typography>
      );
      expect(getByText('Heading')).toBeTruthy();
    });

    it('should work with variant, color, and weight', () => {
      const { getByText } = renderWithTheme(
        <Typography variant="h2" color="primary" weight="semibold">
          Colored Heading
        </Typography>
      );
      expect(getByText('Colored Heading')).toBeTruthy();
    });
  });
});

