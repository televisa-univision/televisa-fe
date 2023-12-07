import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import Sponsor from '.';

const sponsor = {
  name: 'Wallgreen',
  link: 'https://www.walgreens.com/',
  logo: 'https://www.brandsoftheworld.com/sites/default/files/styles/logo-thumbnail/public/122012/walgreens_type-logo_red_4c.png',
};
/** @test {Sponsor} */
describe('Sponsor ', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Sponsor {...sponsor} />, div);
  });
  it('should be null render if not the right props', () => {
    const wrapper = shallow(<Sponsor />);
    expect(wrapper.getElement()).toBe(null);
  });
  it('should not render image if no logo prop', () => {
    const wrapper = shallow(<Sponsor {...sponsor} logo={null} />);
    expect(wrapper.find('img')).toHaveLength(0);
    expect(wrapper.find('.image')).toHaveLength(0);
  });
  it('should render image if the logo is an object', () => {
    const logoProp = {
      renditions: {
        original: {
          href: 'https://cdn1.performance.univision.com/1e/88/6d07c2364aa19118eb21fd793bbc/logo-sponsor-fuerts-juntos.svg',
          width: 93,
          height: 93,
        },
      },
    };
    const wrapper = mount(<Sponsor {...sponsor} logo={logoProp} />);
    expect(wrapper.find('Sponsor__WrappedPicture')).toHaveLength(1);
  });
  it('should not be null render with null name but valid logo and link', () => {
    const wrapper = shallow(<Sponsor name="Name" logo="Logo" link="Link" />);
    expect(wrapper.getElement()).not.toBe(null);
  });
  it('should not render sponsor copy if hide copy present', () => {
    const wrapper = shallow(<Sponsor {...sponsor} hideSponsorCopy logo="logo" />);
    expect(wrapper.find('Sponsor__By')).toHaveLength(0);
  });
});
