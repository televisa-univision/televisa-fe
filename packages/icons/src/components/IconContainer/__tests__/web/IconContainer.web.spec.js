import React from 'react';
import { shallow } from 'enzyme';

import IconContainer, { getIconStatic } from '../..';

describe('IconContainer on web', () => {
  it('should return the icon loader', () => {
    const wrapper = shallow(<IconContainer iconName="phone" />);

    expect(wrapper.find('lazy')).toHaveLength(1);
  });

  it('should return null if not found icon', () => {
    const wrapper = shallow(<IconContainer iconName="phoneNotFound" />);

    expect(wrapper.html()).toBeNull();
  });

  it('should return fallback on SSR', () => {
    const { window } = global;
    delete global.window;
    const wrapper = shallow(<IconContainer iconName="phone" />);

    expect(wrapper.find('FallbackSvg')).toHaveLength(1);
    global.window = window;
  });

  describe('getIconStatic helper', () => {
    it('should return icon markup as string with default props', async () => {
      const iconString = await getIconStatic('timer');
      expect(iconString).toEqual(expect.any(String));
      expect(iconString).toContain('<svg height="32" width="32" viewBox="0 0 256 256"><g fill="none" fill-rule="evenodd"><circle stroke="#000000" stroke-width="9.0066"');
    });

    it('should return icon markup as string with props', async () => {
      const iconString = await getIconStatic('timer', {
        size: 'small',
        fill: '#FFF',
      });
      expect(iconString).toEqual(expect.any(String));
      expect(iconString).toContain('<svg height="24" width="24" viewBox="0 0 256 256"><g fill="none" fill-rule="evenodd"><circle stroke="#000000" stroke-width="9.0066"');
    });

    it('should return icon markup as string with extra custom props', async () => {
      const iconString = await getIconStatic('timer', {
        stroke: '#FFF',
      });
      expect(iconString).toEqual(expect.any(String));
      expect(iconString).toContain('<svg height="32" width="32" viewBox="0 0 256 256"><g fill="none" fill-rule="evenodd"><circle stroke="#000000" stroke-width="9.0066"');
    });

    it('should return empty string if icon is not found', async () => {
      const iconString = await getIconStatic('not found icon');
      expect(iconString).toBe('');
    });
  });
});
