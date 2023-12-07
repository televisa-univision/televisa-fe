import React from 'react';
import { shallow, mount } from 'enzyme';

import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import features from '@univision/fe-commons/dist/config/features';

import TopicBar from '.';

/**
 * Mocked content items for test with just one item
 * @type {Array}
 */
let props = {};
beforeEach(() => {
  props = {
    settings: {
      title: 'Widget title',
      titleLink: {
        uri:
          'http://www.univision.com/programas/series/julian-gil-prepara-su-regreso-a-la-actuacion-con-nueva-serie-fotos',
        href:
          'http://www.univision.com/programas/series/julian-gil-prepara-su-regreso-a-la-actuacion-con-nueva-serie-fotos',
      },
    },
  };
});

/** @test {Icon} */
describe('TopicBar ', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<TopicBar {...props} />);
    expect(wrapper.find('Link').length).toBe(1);
  });

  it('should renders link if titleLink defined', () => {
    const wrapper = shallow(<TopicBar {...props} />);
    expect(wrapper.find('Link').length).toBe(1);
  });

  it('should render title if titleLink is not defined', () => {
    const wrapper = shallow(<TopicBar settings={{ title: 'Widget title' }} />);
    expect(
      wrapper
        .find('div')
        .last()
        .text()
    ).toEqual('Widget title');
  });

  it('should render a CTA to the right if provided', () => {
    const wrapper = shallow(<TopicBar {...props} cta={{ text: 'example' }} />);
    expect(wrapper.find('.cta').length).toBe(1);
  });

  it('should not render a CTA to the right if it is not provided', () => {
    const wrapper = shallow(<TopicBar settings={{ title: 'Widget title' }} />);
    expect(wrapper.find('.cta').length).toBe(0);
  });

  it('should render a separator if provided', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(<TopicBar {...props} separator="bottom" />);
    expect(wrapper.find('.separator').length).toBe(1);
  });

  it('should not render a separator if not provided', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => false);
    const wrapper = mount(<TopicBar {...props} />);
    expect(wrapper.find('.separator').length).toBe(0);
  });

  it('returns null if no title is set', () => {
    const wrapper = shallow(<TopicBar settings={{}} />);
    expect(wrapper.getElement()).toEqual(null);
  });

  it('should call title click handler', () => {
    const clickSpy = jest.fn();
    const wrapper = shallow(<TopicBar {...props} onClick={clickSpy} />);

    wrapper.find('.titleLink').simulate('click');

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('should not try to call invalid title click handler', () => {
    const wrapper = shallow(<TopicBar {...props} onClick={null} />);

    expect(() => {
      wrapper.find('.titleLink').simulate('click');
    }).not.toThrow();
  });

  it('should render image defined', () => {
    props.settings = {
      ...props.settings,
      image: 'https://st1.uvnimg.com/eb/02/2383103f4a6c8380c9126a5322fd/dallas-32px.svg',
      imageLink: {
        uri:
          'http://www.univision.com/programas/series/julian-gil-prepara-su-regreso-a-la-actuacion-con-nueva-serie-fotos',
        href:
          'http://www.univision.com/programas/series/julian-gil-prepara-su-regreso-a-la-actuacion-con-nueva-serie-fotos',
      },
    };
    const wrapper = shallow(<TopicBar {...props} />);
    expect(wrapper.find('Link').length).toBe(1);
  });

  it('should render image if imageLink is not defined', () => {
    props.settings = {
      ...props.settings,
      image: 'https://st1.uvnimg.com/eb/02/2383103f4a6c8380c9126a5322fd/dallas-32px.svg',
    };
    const wrapper = shallow(<TopicBar {...props} />);
    expect(wrapper.find('img').length).toBe(1);
  });
});

describe('Tracking', () => {
  it('should track clicks on the title link', () => {
    const wrapper = shallow(<TopicBar {...props} widgetContext={{ type: 'test' }} />);
    spyOn(WidgetTracker, 'track');
    wrapper.find('Link').simulate('click');
    expect(WidgetTracker.track).toHaveBeenLastCalledWith(expect.any(Function), {
      target: 'title',
      widgetContext: { type: 'test' },
    });
  });
});
