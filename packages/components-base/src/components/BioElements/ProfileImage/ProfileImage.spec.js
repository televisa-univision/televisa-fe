import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Loadable from 'react-loadable';

import ProfileImage from '.';

const image = {
  renditions: {
    original: {
      href: 'https://st1.uvnimg.com/26/4b/d353fd6a408babaa4e8b31865cec/jorge-ramos.jpg',
      width: 300,
      height: 300,
    },
    '1x1-xxs-mobile': {
      href:
        'https://st1.uvnimg.com/dims4/default/896c7e2/2147483647/crop/0x0%2B0%2B0/resize/80x80/quality/75/?url=http%3A%2F%2Fuvn-brightspot.s3.amazonaws.com%2F26%2F4b%2Fd353fd6a408babaa4e8b31865cec%2Fjorge-ramos.jpg',
      width: 80,
      height: 80,
    },
  },
};

/** @test {ProfileImage for bio elements} */
describe('ProfileImage', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const button = <ProfileImage image={image} />;
    ReactDOM.render(button, div);
  });

  it('should return an image correctly', async () => {
    await Loadable.preloadAll();
    const wrapper = mount(<ProfileImage image={image} />);
    expect(wrapper.find('img').props().src).toEqual(image.renditions.original.href);
  });

  it('should return null if image is not set', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<ProfileImage />);
    expect(wrapper.isEmptyRender()).toBeTruthy();
  });
});
