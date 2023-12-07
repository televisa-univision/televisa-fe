import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { render, screen, act } from '@testing-library/react';

import MobileCarousel from '.';

jest.useFakeTimers();

const slidesRefs = new Map();
const numberOfElements = 12;
const elements = Array.from({ length: numberOfElements }, (v, i) => (
  <div key={`t${i}`}>
    {`test component ${i}`}
  </div>
));

const childs = React.Children.map(elements, (child, i) => (
  <div
    ref={c => slidesRefs.set(i, c)}
    key={child.key}
  >
    {child}
  </div>
));

describe('MobileCarousel', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 200 });
    Object.defineProperty(HTMLElement.prototype, 'offsetLeft', { configurable: true, value: 100 });
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', { configurable: true, value: 2400 });
  });

  it('should render without crashing', async () => {
    const div = document.createElement('div');
    ReactDOM.render((<MobileCarousel />), div);
  });

  it('should render properly', () => {
    const wrapper = mount(
      <MobileCarousel hasDesktopSSROverflow>
        {childs}
      </MobileCarousel>
    );

    expect(wrapper.find('MobileCarousel__MaskWrapper')).toBeDefined();
  });

  it('should goto to page without animation', () => {
    global.innerWidth = 320;
    const wrapper = mount(
      <MobileCarousel mobileGoToPage={5} slidesRefs={slidesRefs}>
        {childs}
      </MobileCarousel>
    );

    act(() => {
      wrapper.setProps();
    });

    expect(wrapper.find('MobileCarousel__MaskWrapper').get(0).ref.current.scrollLeft).toEqual(40);
  });

  it('should goto to page with animation', () => {
    global.innerWidth = 320;
    const component = (
      <MobileCarousel
        mobileGoToPage={10}
        slidesRefs={slidesRefs}
        isSnap
        mobileScrollAnimated
        doMobileAnimation
      >
        {childs}
      </MobileCarousel>
    );

    render(component);
    expect(screen.getByText('test component 1')).toBeTruthy();
  });
});
