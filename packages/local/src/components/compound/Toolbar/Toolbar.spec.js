import React from 'react';
import { shallow } from 'enzyme';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';

import { ToolbarComponent as Toolbar, stateToProps } from './Toolbar';

jest.mock('../../connected/PlayStationButton/PlayStationButton', () => jest.fn());

let props;
beforeEach(() => {
  props = {
    isContentPage: true,
    sharingOptions: {},
    type: 'article',
    brandable: {
      title: 'klve 107.5',
      radioStation: {
        abacast: {
          id: '123',
        },
        socialNetworks: [{
          name: 'facebook',
          href: '#',
        }],
        contact: {
          phoneNumber: '123.456.7777',
        },
      },
    },
  };
  Store.dispatch(setPageData({ data: props }));
});

describe('Toolbar', () => {
  it('returns null if radioStation is not defined', () => {
    props.brandable = undefined;
    Store.dispatch(setPageData({ data: props }));
    const wrapper = shallow(<Toolbar {...props} />);
    expect(wrapper.getElement()).toBe(null);
  });

  it('shows bar when has class visible', () => {
    const wrapper = shallow(<Toolbar {...props} />);
    wrapper.setProps({ visible: true });
    expect(wrapper.find('div.visible').length).toBe(1);
  });

  it('adds visible class when visible prop is true', () => {
    const wrapper = shallow(<Toolbar {...props} />);
    expect(wrapper.find('.visible')).toHaveLength(0);
    wrapper.setProps({ visible: true });
    expect(wrapper.find('.visible')).toHaveLength(1);
  });

  it('does not add extra class for non-content page', () => {
    const wrapper = shallow(<Toolbar {...props} />);
    wrapper.setProps({ isContentPage: false });
    expect(wrapper.find('.content')).toHaveLength(0);
  });

  it('doesnt render play button without abacast details', () => {
    const wrapper = shallow(<Toolbar {...props} />);
    expect(wrapper.find('button')).toHaveLength(0);
  });

  it('should publish event on share button click', () => {
    const wrapper = shallow(<Toolbar {...props} />);
    spyOn(SocialTracker, 'track');
    wrapper.find('ShareButton').first().simulate('click');
    expect(SocialTracker.track).toBeCalled();
  });

  it('handles empty brandable title', () => {
    props.brandable.title = null;
    Store.dispatch(setPageData({ data: props }));
    const wrapper = shallow(<Toolbar {...props} />);
    expect(wrapper.find('.rightCol').children()).toHaveLength(1);
  });

  it('stateToProps returns as expected', () => {
    const state = {
      page: {
        data: {
          sharing: {
            options: { foo: true },
          },
        },
      },
    };
    expect(stateToProps(state)).toEqual({ sharingOptions: { foo: true } });
    state.page = {};
    expect(stateToProps(state)).toEqual({ sharingOptions: {} });
  });
});
