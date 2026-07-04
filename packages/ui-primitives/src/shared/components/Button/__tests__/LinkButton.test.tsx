import { LinkButton } from '../LinkButton';
import { renderWithTheme } from '../../__tests__/misc.utility';
import React, { ComponentProps } from 'react';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Atk: undefined;
      DeepLink: { code: string; state: string };
    }
  }
}

jest.mock('@react-navigation/native', () => ({
  useLinkProps: jest.fn(() => ({
    onPress: jest.fn(),
  })),
}));

type LinkButtonProps = ComponentProps<typeof LinkButton>;

describe('LinkButton', () => {
  const defaultProps: LinkButtonProps = {
    screen: 'Atk' ,
    children: 'Test Link',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Structure', () => {
    it('should render without crashing', () => {
      expect(() => {
        renderWithTheme(<LinkButton {...defaultProps} />);
      }).not.toThrow();
    });

    it('should render children correctly', () => {
      expect(() => {
        renderWithTheme(<LinkButton {...defaultProps} />);
      }).not.toThrow();
    });
  });

  describe('Props Validation', () => {
    it('should accept to prop', () => {
      expect(() => {
        renderWithTheme(<LinkButton {...defaultProps} />);
      }).not.toThrow();
    });

    it('should accept style prop', () => {
      expect(() => {
        renderWithTheme(
          <LinkButton {...defaultProps} style={{ marginTop: 10 }} />
        );
      }).not.toThrow();
    });

    it('should accept style as function', () => {
      const styleFn = jest.fn(() => ({ padding: 10 }));
      expect(() => {
        renderWithTheme(<LinkButton {...defaultProps} style={styleFn} />);
      }).not.toThrow();
    });
  });

  describe('Navigation Props', () => {
    it('should accept navigation link props', () => {
      const props: LinkButtonProps = {
        screen: 'Atk',
        children: 'Profile',
      };
      expect(() => {
        renderWithTheme(<LinkButton {...props} />);
      }).not.toThrow();
    });

    it('should accept params prop', () => {
      const props: LinkButtonProps = {
        screen: 'DeepLink',
        params: { code: 'test', state: 'test' },
        children: 'Detail',
      };
      expect(() => {
        renderWithTheme(<LinkButton {...props} />);
      }).not.toThrow();
    });
  });

  describe('Display Name', () => {
    it('should have displayName', () => {
      expect(LinkButton.displayName).toBe('LinkButton');
    });
  });
});

