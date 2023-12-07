import React from 'react';
import { shallow } from 'enzyme';

import { getPageData } from '@univision/fe-commons/dist/store/storeHelpers';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Link from '../Link';
import SocialFollow from '.';

jest.mock('@univision/fe-commons/dist/store/storeHelpers', () => ({
  getPageData: jest.fn(),
}));

let props;
let mockPageData;
beforeEach(() => {
  props = {
    theme: {
      primary: '#000',
    },
  };

  mockPageData = {
    data: {
      primaryTag: {
        name: 'Noticias',
      },
      socialNetworks: [
        {
          name: 'FACEBOOK',
          href: '#',
        },
        {
          name: 'TWITTER',
          href: '#',
        },
        {
          name: 'INSTAGRAM',
          href: '#',
        },
      ],
    },
  };
});

/** @test {SocialFollow} */
describe('SocialFollow', () => {
  it('should not render without social networks', () => {
    getPageData.mockReturnValueOnce(null);
    const wrapper = shallow(<SocialFollow {...props} />);
    expect(wrapper.find('.wrapper')).toHaveLength(0);
  });

  it('should render custom title from props', () => {
    const modProps = {
      ...props,
      title: 'Custom Title',
      socialNetworks: [
        {
          name: 'FACEBOOK',
          href: '#',
        },
      ],
    };
    const wrapper = shallow(<SocialFollow {...modProps} />);
    expect(wrapper.find('.headline')).toHaveLength(1);
    expect(wrapper.find('.headline').text()).toBe(modProps.title);
  });

  it('should render social networks from props', () => {
    getPageData.mockReturnValueOnce(null);
    const modProps = {
      ...props,
      title: 'Test',
      socialNetworks: [
        {
          name: 'FACEBOOK',
          href: '#',
        },
        {
          name: 'TWITTER',
          href: '#',
        },
      ],
    };
    const wrapper = shallow(<SocialFollow {...modProps} />);
    expect(wrapper.find(Link)).toHaveLength(2);
    expect(wrapper.find(Icon)).toHaveLength(2);
  });

  it('should render from Store using an array', () => {
    const modProps = {
      ...props,
      title: null,
      socialNetworks: [],
    };
    getPageData.mockReturnValueOnce(mockPageData);
    const wrapper = shallow(<SocialFollow {...modProps} />);
    expect(wrapper.find('.wrapper')).toHaveLength(1);
    expect(wrapper.find(Link)).toHaveLength(3);
    expect(wrapper.find(Icon)).toHaveLength(3);
    expect(wrapper.find('.headline').text()).toBe(mockPageData.data.primaryTag.name);
  });

  it('should render from Store using an object', () => {
    const modProps = {
      ...props,
      title: null,
      socialNetworks: [],
    };
    getPageData.mockReturnValueOnce(mockPageData);
    mockPageData.data.socialNetworks = {
      facebookUrl: {
        name: 'Facebook',
        url: '#',
      },
      twitterUrl: {
        name: 'Twitter',
        url: '#',
      },
    };

    const wrapper = shallow(<SocialFollow {...modProps} />);
    expect(wrapper.find('.wrapper')).toHaveLength(1);
    expect(wrapper.find(Link)).toHaveLength(2);
    expect(wrapper.find(Icon)).toHaveLength(2);
    expect(wrapper.find('.headline').text()).toBe(mockPageData.data.primaryTag.name);
  });
});
