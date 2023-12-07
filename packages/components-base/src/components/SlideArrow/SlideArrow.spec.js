import React from 'react';
import { shallow } from 'enzyme';

import Button from '../Button';

import SlideArrow from '.';

jest.mock('../Button', () => jest.fn());

/** @test {SlideArrow} */
describe('SlideArrow ', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<SlideArrow direction="prev" theme="none" />);
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('should add offset styles if offset is defined', () => {
    const wrapper = shallow(<SlideArrow direction="prev" offset={{ top: 15 }} />);
    expect(wrapper.find(Button).prop('style')).toBeDefined();
  });

  it('should call afterClick if is defined', () => {
    const afterClick = jest.fn();
    const wrapper = shallow(<SlideArrow direction="prev" offset={{ top: 15 }} afterClick={afterClick} />);
    wrapper.find(Button).simulate('click');
    expect(afterClick).toBeCalled();
  });

  it('should call onClick if is defined', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<SlideArrow direction="prev" offset={{ top: 15 }} onClick={onClick} />);
    wrapper.find(Button).simulate('click');
    expect(onClick).toBeCalled();
  });

  it('should hide the arrow if it\'s not needed', () => {
    const testBoolean = true;
    const wrapper = shallow(<SlideArrow
      direction="prev"
      offset={{ top: 15 }}
      autoHide={testBoolean}
      className="slick-disabled"
    />);
    expect(wrapper.find('.hide').length).toBe(1);
  });
});
