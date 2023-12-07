import React from 'react';
import { shallow, mount } from 'enzyme';

import ScoreCellsArrow from '.';

describe('DefaultArrow tests', () => {
  it('should render without issues', () => {
    const wrapper = shallow(<ScoreCellsArrow />);
    expect(wrapper.getElement()).toBeDefined();
  });

  it('should render the right arrow', () => {
    const wrapper = mount(<ScoreCellsArrow isRight />);
    const arrowEl = wrapper.find('ScoreCellsArrow__ArrowButtonStyled');
    expect(arrowEl).toHaveLength(1);
    expect(arrowEl.prop('isRight')).toBe(true);
  });

  it('should render the left arrow', () => {
    const wrapper = mount(<ScoreCellsArrow />);
    const arrowEl = wrapper.find('ScoreCellsArrow__ArrowButtonStyled');
    expect(arrowEl).toHaveLength(1);
    expect(arrowEl.prop('isRight')).toBe(false);
  });

  it('should render hidden right arrow', () => {
    const wrapper = mount(<ScoreCellsArrow isRight isHidden />);
    const arrowEl = wrapper.find('ScoreCellsArrow__ArrowButtonStyled');
    expect(arrowEl).toHaveLength(1);
    expect(arrowEl).toHaveStyleRule('transform', 'translate3d(101%,0,0)');
    expect(arrowEl.prop('isRight')).toBe(true);
    expect(arrowEl.prop('isHidden')).toBe(true);
  });

  it('should render hidden left arrow', () => {
    const wrapper = mount(<ScoreCellsArrow isHidden />);
    const arrowEl = wrapper.find('ScoreCellsArrow__ArrowButtonStyled');
    expect(arrowEl).toHaveLength(1);
    expect(arrowEl).toHaveStyleRule('transform', 'translate3d(-101%,0,0)');
    expect(arrowEl.prop('isRight')).toBe(false);
    expect(arrowEl.prop('isHidden')).toBe(true);
  });
});
