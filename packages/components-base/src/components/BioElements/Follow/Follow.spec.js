import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Loadable from 'react-loadable';
import { act } from 'react-dom/test-utils';

import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';

import Follow from '.';

const socialNetworks = {
  facebookUrl: {
    url: 'https://www.facebook.com/jorgeramosnews/',
  },
  instagramUrl: {
    url: 'https://www.instagram.com/jorgeramosnews/',
  },
  twitterUrl: {
    url: 'https://twitter.com/jorgeramosnews',
  },
  pinterestUrl: {
    url: 'https://pinterest.com/jorgeramosnews',
  },
};

const socialNetworksArray = [
  {
    text: null,
    name: 'Facebook',
    url: 'https://www.facebook.com/ElGordoyLaFlaca/',
    target: '_blank',
  },
  {
    text: null,
    name: 'Twitter',
    url: 'https://twitter.com/ElGordoyLaFlaca',
    target: '_blank',
  },
];

const shareData = {
  title: 'sheila varela',
  type: 'person',
  uid: '0000016c-f8de-dd9b-a56f-fdff910e0000',
};

/** @test {Follow for bio elements} */
describe('Follow', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const button = <Follow socialNetworks={socialNetworks} />;
    ReactDOM.render(button, div);
  });
  it('should render without crashing with an Array', () => {
    const div = document.createElement('div');
    const button = <Follow socialNetworks={socialNetworksArray} />;
    ReactDOM.render(button, div);
  });
  it('should return null if socialNetworks is not set', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<Follow />);
    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  it('should render social netoworks icons', async () => {
    await Loadable.preloadAll();
    const wrapper = mount(<Follow socialNetworks={socialNetworks} />);
    expect((wrapper.find('Icon'))).toHaveLength(3);
  });

  it('should not call SocialTracker on click when it is Bio page', () => {
    const trackSpy = jest.spyOn(SocialTracker, 'track');
    const wrapper = mount(
      <Follow socialNetworks={socialNetworks} shareData={shareData} isBioCard />
    );
    const companyShareBtn = wrapper.find('Follow__ShareLinkWrapper');
    act(() => {
      companyShareBtn.first().simulate('click');
    });

    wrapper.update();
    expect(trackSpy).toHaveBeenCalledTimes(0);
  });

  it('should call SocialTracker on click', async () => {
    const trackSpy = jest.spyOn(SocialTracker, 'track');
    await Loadable.preloadAll();
    const wrapper = mount(<Follow socialNetworks={socialNetworks} shareData={shareData} />);
    wrapper.find('Follow__ShareLinkWrapper').first().simulate('click');

    expect(trackSpy).toHaveBeenCalledWith(SocialTracker.events.share, {
      name: 'facebook',
      ...shareData,
    });
  });
});
