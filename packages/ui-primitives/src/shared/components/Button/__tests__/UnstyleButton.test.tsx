import { UnstyleButton } from '..';
import { act, renderWithTheme } from '../../__tests__/misc.utility';
import React from 'react';
import { Keyboard, Pressable } from 'react-native';

describe('UnstyleButton', () => {
  describe('Component Structure', () => {
    it('should render without crashing', () => {
      expect(() => {
        renderWithTheme(<UnstyleButton>Test</UnstyleButton>);
      }).not.toThrow();
    });

    it('should render children correctly', () => {
      expect(() => {
        renderWithTheme(<UnstyleButton>Test Content</UnstyleButton>);
      }).not.toThrow();
    });
  });

  describe('Props Validation', () => {
    it('should accept onPress prop', () => {
      const onPress = jest.fn();
      expect(() => {
        renderWithTheme(
          <UnstyleButton onPress={onPress}>Test</UnstyleButton>
        );
      }).not.toThrow();
    });

    it('should accept disabled prop', () => {
      expect(() => {
        renderWithTheme(<UnstyleButton disabled>Test</UnstyleButton>);
      }).not.toThrow();
    });

    it('should accept style prop', () => {
      expect(() => {
        renderWithTheme(
          <UnstyleButton style={{ padding: 10 }}>Test</UnstyleButton>
        );
      }).not.toThrow();
    });

    it('should accept style as function', () => {
      const styleFn = jest.fn(() => ({ padding: 10 }));
      expect(() => {
        renderWithTheme(
          <UnstyleButton style={styleFn}>Test</UnstyleButton>
        );
      }).not.toThrow();
    });
  });

  describe('Interaction', () => {
    it('should call onPress when pressed', () => {
      const onPress = jest.fn();
      const { UNSAFE_root } = renderWithTheme(
        <UnstyleButton onPress={onPress}>Test</UnstyleButton>
      );
      const pressable = UNSAFE_root.findByType(Pressable);
      pressable.props.onPress();
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('should accept disabled prop to prevent interaction', () => {
      const onPress = jest.fn();
      expect(() => {
        renderWithTheme(
          <UnstyleButton disabled onPress={onPress}>
            Test
          </UnstyleButton>
        );
      }).not.toThrow();
    });

    it('should call style function with state', () => {
      const styleFn = jest.fn(() => ({ padding: 10 }));
      renderWithTheme(<UnstyleButton style={styleFn}>Test</UnstyleButton>);
      expect(styleFn).toHaveBeenCalled();
    });

    it('should support Promise in onPress and disable the button while loading', async () => {
      let resolvePromise: (value: unknown) => void = () => {};
      const promise = new Promise((resolve) => {
        resolvePromise = resolve;
      });
      const onPress = jest.fn().mockReturnValue(promise);

      const { UNSAFE_root } = renderWithTheme(
        <UnstyleButton onPress={onPress}>Test</UnstyleButton>
      );
      const pressable = UNSAFE_root.findByType(Pressable);

      // Trigger the press
      await act(async () => {
        pressable.props.onPress();
      });

      // The button should be disabled now
      expect(pressable.props.disabled).toBe(true);

      // Subsequent presses should not trigger onPress again
      await act(async () => {
        pressable.props.onPress();
      });
      expect(onPress).toHaveBeenCalledTimes(1);

      // Resolve the promise
      await act(async () => {
        resolvePromise(null);
      });

      // The button should be enabled again
      expect(pressable.props.disabled).toBe(false);
    });

    it('should re-enable the button even if promise rejects', async () => {
      let rejectPromise: (reason?: any) => void = () => {};
      const promise = new Promise((_, reject) => {
        rejectPromise = reject;
      });
      const onPress = jest.fn().mockReturnValue(promise);

      const { UNSAFE_root } = renderWithTheme(
        <UnstyleButton onPress={onPress}>Test</UnstyleButton>
      );
      const pressable = UNSAFE_root.findByType(Pressable);

      let pressPromise: Promise<void> | null = null;
      // Trigger the press
      await act(async () => {
        pressPromise = pressable.props.onPress();
      });

      expect(pressable.props.disabled).toBe(true);

      // Reject the promise and handle the rejection of pressPromise
      await act(async () => {
        rejectPromise(new Error('Rejected'));
        await expect(pressPromise).rejects.toThrow('Rejected');
      });

      expect(pressable.props.disabled).toBe(false);
    });

    it('should dismiss keyboard by default on press', async () => {
      const dismissSpy = jest.spyOn(Keyboard, 'dismiss');
      const onPress = jest.fn();
      const { UNSAFE_root } = renderWithTheme(
        <UnstyleButton onPress={onPress}>Test</UnstyleButton>
      );
      const pressable = UNSAFE_root.findByType(Pressable);

      await act(async () => {
        pressable.props.onPress();
      });

      expect(dismissSpy).toHaveBeenCalled();
      dismissSpy.mockRestore();
    });

    it('should not dismiss keyboard if dismissKeyboard is false', async () => {
      const dismissSpy = jest.spyOn(Keyboard, 'dismiss');
      const onPress = jest.fn();
      const { UNSAFE_root } = renderWithTheme(
        <UnstyleButton onPress={onPress} dismissKeyboard={false}>
          Test
        </UnstyleButton>
      );
      const pressable = UNSAFE_root.findByType(Pressable);

      await act(async () => {
        pressable.props.onPress();
      });

      expect(dismissSpy).not.toHaveBeenCalled();
      dismissSpy.mockRestore();
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref correctly', () => {
      const ref = React.createRef<any>();
      expect(() => {
        renderWithTheme(<UnstyleButton ref={ref}>Test</UnstyleButton>);
      }).not.toThrow();
    });
  });
});


