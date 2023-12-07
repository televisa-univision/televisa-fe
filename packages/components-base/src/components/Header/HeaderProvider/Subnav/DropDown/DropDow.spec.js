import React from 'react';
import { shallow } from 'enzyme';

import * as helpers from '../helpers';

import DropDown from '.';

const link = {
  name: 'The link',
  link: 'link',
};

/** @test {Progress} */
describe('DropDown', () => {
  const links = { hidden: [link, link, link, link, link, link] };
  it('should render as expected', () => {
    const wrapper = shallow(<DropDown links={links} variant="dark" />);
    expect(wrapper.find('.showMore')).toHaveLength(1);
  });

  it('should not render the compoenent', () => {
    const wrapper = shallow(<DropDown links={[]} variant="dark" />);
    expect(wrapper.find('.showMore')).toHaveLength(0);
  });

  it('should open the show more drop down', () => {
    const wrapper = shallow(<DropDown links={links} variant="dark" />);
    wrapper.find('.showMore Clickable').simulate('click');
    expect(wrapper.instance().state.showMoreOpen).toBe(true);
  });

  it('should track dropdown link click', () => {
    const wrapper = shallow(<DropDown links={links} />);
    const dropdownLinks = wrapper.find('.extraLink');
    const trackSpy = jest.spyOn(helpers, 'trackSubnavClick');
    trackSpy.mockImplementation(() => {});

    dropdownLinks.forEach(dropdownLink => dropdownLink.props().onClick());

    expect(trackSpy).toHaveBeenCalledTimes(6);
    trackSpy.mockRestore();
  });
  it('should render as expected with isTudn', () => {
    const wrapper = shallow(<DropDown links={links} variant="dark" isTudn />);
    expect(wrapper.find('.tudn')).toHaveLength(13);
  });
});
