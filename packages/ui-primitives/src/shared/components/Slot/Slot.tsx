/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Children,
  cloneElement,
  ComponentPropsWithRef,
  ElementType,
  Fragment,
  isValidElement,
  ReactNode,
  Ref,
  RefCallback,
} from 'react';
import {
  type PressableStateCallbackType,
  type ImageStyle as RNImageStyle,
  type PressableProps as RNPressableProps,
  type StyleProp,
} from 'react-native';

function Slot<T extends ElementType>(props: ComponentPropsWithRef<T>) {
  const { children, ref: forwardedRef, ...restOfProps } = props;

  if (!isValidElement(children)) {
    console.log('Slot - Invalid asChild element', children);
    return null;
  }

  if (isTextChildren(children)) {
    console.log('Slot - Text children are not supported', children);
    return null;
  }

  const childrenProps = (children.props as Record<string, any>) ?? {};

  if (children.type === Fragment) {
    return (
      <>
        {Children.toArray(childrenProps.children).map((child): any =>
          isValidElement(child)
            ? Slot({ ...restOfProps, children: child, ref: forwardedRef })
            : child
        )}
      </>
    );
  }

  const { ref: childRef, ...childProps } = childrenProps;

  return cloneElement(children, {
    ...mergeProps(restOfProps, childProps),
    ref: forwardedRef ? composeRefs(forwardedRef, childRef) : childRef,
  } as unknown as Partial<ComponentPropsWithRef<T>>);
}

Slot.displayName = 'Slot';

export { Slot };

function setRef<T>(
  ref: Ref<T> | undefined,
  value: T | null
): (() => void) | void {
  if (typeof ref === 'function') {
    const cleanup = ref(value);

    if (typeof cleanup === 'function') {
      return cleanup;
    }

    return;
  }

  if (ref != null) {
    ref.current = value;
    return () => {
      ref.current = null;
    };
  }
}

function composeRefs<T>(...refs: Array<Ref<T> | undefined>): RefCallback<T> {
  let cleanups: Array<() => void> = [];

  return (node) => {
    cleanups.forEach((cleanup) => cleanup());
    cleanups = [];

    if (node == null) {
      refs.forEach((ref) => {
        if (typeof ref === 'function') {
          ref(null);
        } else if (ref != null) {
          ref.current = null;
        }
      });
      return;
    }

    cleanups = refs
      .map((ref) => setRef(ref, node))
      .filter((cleanup): cleanup is () => void => cleanup != null);
  };
}

type AnyProps = Record<string, any>;

function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
  // all child props should override
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      // if the handler exists on both, we compose them
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      }
      // but if it exists only on the slot, we use only this one
      else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    }
    // if it's `style`, we merge them
    else if (propName === 'style') {
      overrideProps[propName] = combineStyles(slotPropValue, childPropValue);
    } else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue]
        .filter(Boolean)
        .join(' ');
    }
  }

  return { ...slotProps, ...overrideProps };
}

type PressableStyle = RNPressableProps['style'];
type ImageStyle = StyleProp<RNImageStyle>;
type Style = PressableStyle | ImageStyle;

function combineStyles(slotStyle?: Style, childValue?: Style) {
  if (typeof slotStyle === 'function' && typeof childValue === 'function') {
    return (state: PressableStateCallbackType) => {
      return [slotStyle(state), childValue(state)];
    };
  }
  if (typeof slotStyle === 'function') {
    return (state: PressableStateCallbackType) => {
      return childValue ? [slotStyle(state), childValue] : slotStyle(state);
    };
  }
  if (typeof childValue === 'function') {
    return (state: PressableStateCallbackType) => {
      return slotStyle ? [slotStyle, childValue(state)] : childValue(state);
    };
  }

  if (slotStyle && childValue) {
    return [slotStyle, childValue];
  }

  return slotStyle ?? childValue;
}

export function isTextChildren(
  children: ReactNode | ((state: PressableStateCallbackType) => ReactNode)
) {
  return Array.isArray(children)
    ? children.every((child) => typeof child === 'string')
    : typeof children === 'string';
}
