import React from 'react';
import { Text, View } from 'react-native';

import { isSafeElement } from '../isSafeElement.validator';

describe('isSafeElement', () => {
  describe('valid React elements', () => {
    it('should return true for JSX elements', () => {
      expect(isSafeElement(<View />)).toBe(true);
      expect(isSafeElement(<Text>Hello</Text>)).toBe(true);
      expect(isSafeElement(<View testID="test" />)).toBe(true);
    });

    it('should return true for React.createElement', () => {
      expect(isSafeElement(React.createElement(View))).toBe(true);
      expect(isSafeElement(React.createElement(Text, null, 'Hello'))).toBe(true);
    });

    it('should return true for elements with children', () => {
      expect(isSafeElement(
        <View>
          <Text>Child</Text>
        </View>
      )).toBe(true);
    });

    it('should return true for elements with props', () => {
      expect(isSafeElement(<View style={{ flex: 1 }} />)).toBe(true);
      expect(isSafeElement(<Text testID="text" numberOfLines={2} />)).toBe(true);
    });
  });

  describe('invalid values', () => {
    it('should return false for strings', () => {
      expect(isSafeElement('Hello')).toBe(false);
      expect(isSafeElement('')).toBe(false);
      expect(isSafeElement('123')).toBe(false);
    });

    it('should return false for numbers', () => {
      expect(isSafeElement(123)).toBe(false);
      expect(isSafeElement(0)).toBe(false);
      expect(isSafeElement(-1)).toBe(false);
      expect(isSafeElement(Number.NaN)).toBe(false);
    });

    it('should return false for null and undefined', () => {
      expect(isSafeElement(null)).toBe(false);
      expect(isSafeElement(undefined)).toBe(false);
    });

    it('should return false for booleans', () => {
      expect(isSafeElement(true)).toBe(false);
      expect(isSafeElement(false)).toBe(false);
    });

    it('should return false for arrays', () => {
      expect(isSafeElement([])).toBe(false);
      expect(isSafeElement([1, 2, 3])).toBe(false);
      expect(isSafeElement([<View key="1" />, <View key="2" />])).toBe(false);
    });

    it('should return false for objects', () => {
      expect(isSafeElement({})).toBe(false);
      expect(isSafeElement({ type: 'View', props: {} })).toBe(false);
    });

    it('should return false for functions', () => {
      expect(isSafeElement(() => <View />)).toBe(false);
      expect(isSafeElement(function Component() {
        return <View />;
      })).toBe(false);
    });
  });

  describe('ReactNode edge cases', () => {
    it('should return false for ReactNode that are not elements', () => {
      expect(isSafeElement('text' as React.ReactNode)).toBe(false);
      expect(isSafeElement(123 as React.ReactNode)).toBe(false);
      expect(isSafeElement(null as React.ReactNode)).toBe(false);
      expect(isSafeElement(undefined as React.ReactNode)).toBe(false);
      expect(isSafeElement(true as React.ReactNode)).toBe(false);
      expect(isSafeElement(false as React.ReactNode)).toBe(false);
    });

    it('should return true for valid ReactNode that are elements', () => {
      expect(isSafeElement(<View /> as React.ReactNode)).toBe(true);
      expect(isSafeElement(<Text>Test</Text> as React.ReactNode)).toBe(true);
    });
  });

  describe('type narrowing', () => {
    it('should narrow type correctly when used in type guard', () => {
      const value: unknown = <View testID="test" />;

      if (isSafeElement(value)) {
        expect(value.type).toBeDefined();
        expect(value.props).toBeDefined();
      } else {
        expect(true).toBe(false);
      }
    });

    it('should not narrow type for non-elements', () => {
      const value: unknown = 'not an element';

      if (isSafeElement(value)) {
        expect(true).toBe(false);
      } else {
        expect(typeof value).toBe('string');
      }
    });
  });
});

