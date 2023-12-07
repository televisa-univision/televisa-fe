import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import LongformWrapper from '.';

const LongformWrapperDefault = (
  <LongformWrapper>
    <div className="testChildren">hello</div>
  </LongformWrapper>
);

/** @test {LongformWrapperDefault} */
describe('LongformWrapper', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(LongformWrapperDefault, div);
  });
  it('should render with 3 div', () => {
    const wrapper = mount(LongformWrapperDefault);
    expect(wrapper.find('.testChildren')).toHaveLength(1);
  });
});
