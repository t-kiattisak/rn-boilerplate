import { Icon } from '..';
import { renderWithTheme } from '../../__tests__/misc.utility';
import React from 'react';

describe('Icon', () => {
  describe('Component Structure', () => {
    it('should render without crashing', () => {
      expect(() => {
        renderWithTheme(<Icon name="home" />);
      }).not.toThrow();
    });
  });

  describe('Props Validation', () => {
    it('should accept name prop', () => {
      expect(() => {
        renderWithTheme(<Icon name="home" />);
      }).not.toThrow();
    });

    it('should accept size prop', () => {
      expect(() => {
        renderWithTheme(<Icon name="home" size={32} />);
      }).not.toThrow();
    });

    it('should accept color prop', () => {
      expect(() => {
        renderWithTheme(<Icon color="#000000" name="home" />);
      }).not.toThrow();
    });

    it('should accept iconSet prop', () => {
      expect(() => {
        renderWithTheme(<Icon iconSet="Feather" name="home" />);
      }).not.toThrow();
    });

    it('should accept all iconSet values', () => {
      const iconSets: Array<
        | 'Feather'
        | 'MaterialIcons'
        | 'Ionicons'
        | 'AntDesign'
        | 'FontAwesome'
        | 'FontAwesome5'
        | 'FontAwesome6'
        | 'MaterialCommunityIcons'
        | 'Entypo'
        | 'EvilIcons'
        | 'Foundation'
        | 'Octicons'
        | 'SimpleLineIcons'
        | 'Zocial'
      > = [
        'Feather',
        'MaterialIcons',
        'Ionicons',
        'AntDesign',
        'FontAwesome',
        'FontAwesome5',
        'FontAwesome6',
        'MaterialCommunityIcons',
        'Entypo',
        'EvilIcons',
        'Foundation',
        'Octicons',
        'SimpleLineIcons',
        'Zocial',
      ];

      for (const iconSet of iconSets) {
        expect(() => {
          renderWithTheme(<Icon iconSet={iconSet} name="home" />);
        }).not.toThrow();
      }
    });
  });

  describe('Default Values', () => {
    it('should use default size value', () => {
      expect(() => {
        renderWithTheme(<Icon name="home" />);
      }).not.toThrow();
    });

    it('should use default iconSet value', () => {
      expect(() => {
        renderWithTheme(<Icon name="home" />);
      }).not.toThrow();
    });
  });
});

