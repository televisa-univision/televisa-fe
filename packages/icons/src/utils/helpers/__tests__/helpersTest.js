import { GREY_BLACK, WHITE } from '../../../constants/colors';
import * as helpers from '..';

module.exports = () => {
  /** @test {helpers} */
  describe('getIconSize helper', () => {
    it('should return a number size from string size', () => {
      expect(helpers.getIconSize('large')).toEqual({ width: 50, height: 50 });
    });
    it('should return the same value if is a valid number', () => {
      expect(helpers.getIconSize(10)).toEqual({ width: 10, height: 10 });
      expect(helpers.getIconSize('10')).toEqual({ width: '10', height: '10' });
    });
    it('should return de default valie "medium" on invalid size', () => {
      expect(helpers.getIconSize('invalid')).toEqual({ width: 32, height: 32 });
    });
    it('should return the same value if is a valid Array', () => {
      expect(helpers.getIconSize([20, 30])).toEqual({ width: 20, height: 30 });
    });
  });

  describe('getIconVariant helper', () => {
    it('should return the dark variant', () => {
      expect(helpers.getIconVariant('dark')).toBe(GREY_BLACK);
    });
    it('should return the light variant', () => {
      expect(helpers.getIconVariant('light')).toBe(WHITE);
    });
  });
  describe('getIconsWithType helper', () => {
    it('should return the icons list', () => {
      expect(helpers.getIconsWithType()).toEqual(expect.objectContaining({
        close: 'general',
        goal: 'sports',
        univision: 'channels',
        sunny: 'weather',
      }));
    });
  });
  describe('formatIconProps helper', () => {
    it('should return expected format for icon props with defaults', () => {
      const props = {
        name: 'icon-name-test',
        fill: 'red',
      };
      expect(helpers.formatIconProps(props)).toEqual({
        iconName: 'iconNameTest',
        iconProps: {
          className: undefined,
          'data-name': 'iconNameTest',
          fill: 'red',
          height: 32,
          style: {},
          viewBox: '0 0 256 256',
          width: 32,
        },
      });
    });
    it('should return expected format for icon props overwriting defaults', () => {
      const props = {
        name: 'icon-name-test',
        fill: 'red',
        size: 'xsmall',
        viewBox: '0 0 24 24',
        className: 'class-name',
      };
      expect(helpers.formatIconProps(props)).toEqual({
        iconName: 'iconNameTest',
        iconProps: {
          className: 'class-name',
          'data-name': 'iconNameTest',
          fill: 'red',
          height: 16,
          style: {},
          viewBox: '0 0 24 24',
          width: 16,
        },
      });
    });
  });
};
