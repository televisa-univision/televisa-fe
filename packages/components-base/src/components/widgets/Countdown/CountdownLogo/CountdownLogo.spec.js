import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import CountdownLogo from '.';

const imageData = {
  type: 'image',
  title: 'Latin grammy small logo',
  caption: 'Latin Grammy',
  credit: null,
  renditions: {
    original: {
      href: 'https://cdn3.uvnimg.com/76/e5/088725d0490fa91faad8858c659f/grammy.jpg',
      width: 206,
      height: 103,
    },
  },
};

jest.mock('../../../Picture', () => 'Picture');

/** @test {CountdownLogo} */
describe('CountdownLogo ', () => {
  it('should render the component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CountdownLogo image={imageData} />, div);
  });
  it('should render the logo container', () => {
    const wrapper = shallow(<CountdownLogo image={imageData} />);
    expect(wrapper.find('CountdownLogo__Wrapper').getElement()).toBeDefined();
  });
  it('should render image', () => {
    const wrapper = mount(<CountdownLogo image={imageData} />);
    expect(wrapper.find('Picture')).toHaveLength(1);
  });
  it('should render the modifier class prop', () => {
    const wrapper = mount(<CountdownLogo image={imageData} className="modifier" />);
    expect(wrapper.find('div.modifier')).toHaveLength(1);
  });
});
