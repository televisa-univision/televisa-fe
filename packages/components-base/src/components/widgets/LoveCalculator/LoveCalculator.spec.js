import React from 'react';
import { shallow } from 'enzyme';

import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import LoveCalculator from '.';
import Dropdown from '../../Dropdown';
import TopicBar from '../../TopicBar';
import ShareBar from '../../ShareBar';
import Clickable from '../../Clickable';

let props;
beforeEach(() => {
  props = {};
});

describe('LoveCalculator', () => {
  it('renders as expected with initial state', () => {
    const wrapper = shallow(<LoveCalculator {...props} />);
    expect(wrapper.find(Dropdown)).toHaveLength(2);
    expect(wrapper.find(TopicBar).prop('settings').title).toBe('Calculadora Del Amor');
  });

  it('updates the sharing information', () => {
    Store.dispatch(setPageData({
      data: {
        sharing: {
          options: {
            facebook: {},
          },
        },
      },
    }));
    const wrapper = shallow(<LoveCalculator {...props} />);
    expect(wrapper.find(ShareBar)).toHaveLength(2);
    const share = wrapper.find(ShareBar).at(0);
    expect(share.prop('sharingOptions').facebook.url).toContain('aries-vs-aries');
    wrapper.setState({ second: 'tauro' });
    expect(share.prop('sharingOptions').facebook.url).toContain('aries-con-tauro');
  });

  it('gracefully handles no selection', () => {
    const wrapper = shallow(<LoveCalculator {...props} />);
    wrapper.setState({ first: '', second: '' });
    expect(wrapper.find(ShareBar)).toHaveLength(0);
    expect(wrapper.find(Clickable).prop('href')).not.toBeDefined();
  });

  it('finds paring match when reversed', () => {
    const wrapper = shallow(<LoveCalculator {...props} />);
    wrapper.setState({ second: 'aries', first: 'tauro' });
    expect(wrapper.find(Clickable).prop('href')).toContain('aries-con-tauro');
  });

  it('onChange updates state correctly', () => {
    const wrapper = shallow(<LoveCalculator {...props} />);

    wrapper.find(Dropdown).at(0).simulate('change', { target: { name: 'he', value: 'OMG' } });
    expect(wrapper.state().he).toBe('omg');
  });

  it('should fire SocialTracker when onShare is called', () => {
    Store.dispatch(setPageData({
      data: {
        uid: '123',
      },
    }));
    const wrapper = shallow(<LoveCalculator {...props} />);
    const instance = wrapper.instance();
    spyOn(SocialTracker, 'track');
    instance.onShare('mail');
    expect(SocialTracker.track).toBeCalled();
  });

  it('should fire trackEvents when onClickSeeResults is called', () => {
    const wrapper = shallow(<LoveCalculator {...props} />);
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    wrapper.find('Clickable').simulate('click');
    expect(fireEventSpy).toBeCalled();
  });
});
