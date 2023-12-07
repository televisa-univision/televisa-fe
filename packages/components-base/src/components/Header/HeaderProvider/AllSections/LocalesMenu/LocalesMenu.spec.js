import React from 'react';
import { shallow } from 'enzyme';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';

import LocalesMenu from '.';

const props = {
  items: [
    {
      name: 'sub title',
      items: [
        {
          name: 'univision',
          href: '/',
          image: 'https://test.co/noticias.svg',
        },
        {
          name: '',
          href: '/networks/galavision',
          image: 'https://test.co/galavision.svg',
        },
        {
          name: 'Unimas',
          href: '/networks/unimas',
          image: '',
        },
      ],
    },
  ],
  localMarket: [
    {
      href: 'href',
      name: 'Entertainment1',
    },
    {
      href: 'href2',
      name: 'Entertainment2',
    },
  ],
};

describe('GlobalHeaders::LocalesMenu', () => {
  it('should render the locales menu', () => {
    const wrapper = shallow(<LocalesMenu {...props} />);
    const subtitle = wrapper.find('.localMarketSubtitle');
    const subItems = wrapper.find('.localMarketDefault');
    expect(subtitle).toHaveLength(1);
    expect(subtitle.text()).toBe('sub title');
    expect(subItems).toHaveLength(3);
    expect(subItems.first().children().props().href).toEqual('/');
    expect(subItems.first().find('Image').props().src).toEqual('https://test.co/noticias.svg');
  });
  it('should track the hamburger menu - localMarket', async () => {
    const trackSpy = jest.spyOn(NavigationTracker, 'track');
    const wrapper = shallow(<LocalesMenu {...props} />);
    const trackElement = wrapper.find('.localMarket .uvs-font-a-bold').first();
    trackElement.simulate('click');

    expect(trackSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: `hamburger-${props.localMarket[0].name.toLowerCase()}`,
    });
  });
  it('should track the hamburger menu - localMarketDefault', async () => {
    const trackSpy = jest.spyOn(NavigationTracker, 'track');
    const wrapper = shallow(<LocalesMenu {...props} />);
    const trackElement = wrapper.find('.localMarketDefault .uvs-font-a-bold').first();
    trackElement.simulate('click');

    expect(trackSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: `hamburger-${props.localMarket[0].name.toLowerCase()}`,
    });
  });
  it('should NOT render the menu', () => {
    const wrapper = shallow(<LocalesMenu />);
    const subtitle = wrapper.find('.localMarketSubtitle');
    const subItems = wrapper.find('.localMarketDefault');
    expect(subtitle).toHaveLength(0);
    expect(subItems).toHaveLength(0);
  });
});
