import React from 'react';
import { shallow } from 'enzyme';

import TvGuideDateNav from '.';

let tvDateprops;
let emptyProps;
beforeEach(() => {
  tvDateprops = {
    onPress: jest.fn(),
  };
  emptyProps = {
  };
});

jest.mock('@univision/fe-components-base/dist/components/Carousel', () => 'Carousel');

/** @test {TvGuideDateNav} */
describe('TvGuideDateNav ', () => {
  const constantDate = new Date('2018-01-29T00:00:00Z');
  const RealDate = Date;
  afterEach(() => {
    global.Date = RealDate;
  });
  it('should render as expected', () => {
    const wrapper = shallow(<TvGuideDateNav {...tvDateprops} />);
    expect(wrapper.find('Carousel').length).toBe(1);
    expect(wrapper.find('TVGuideDate').length).toBe(21);
  });
  it('should not render is no array of links present', () => {
    const wrapper = shallow(<TvGuideDateNav {...emptyProps} />);
    expect(wrapper.find('Carousel').length).toBe(0);
  });
  it('should render the modifierClass prop', () => {
    const className = 'modifier-class';
    const wrapper = shallow(<TvGuideDateNav {...tvDateprops} className={className} />);
    expect(wrapper.find(`.${className}`)).toBeDefined();
  });
  it('calls onPress prop when date is clicked', () => {
    global.Date = jest.fn(
      () => new RealDate(constantDate)
    );
    const wrapper = shallow(<TvGuideDateNav {...tvDateprops} />);
    const onChangeSpy = jest.spyOn(tvDateprops, 'onPress');
    wrapper.find('TVGuideDate').at(0).props().onPress();
    expect(onChangeSpy).toHaveBeenCalledWith(new Date('2018-01-19T00:00:00.000Z'));
  });
});
