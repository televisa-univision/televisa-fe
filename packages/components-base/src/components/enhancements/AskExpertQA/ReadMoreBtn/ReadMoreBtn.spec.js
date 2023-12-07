import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import ReadMoreBtn from './ReadMoreBtn';

/** @test {ReadMoreBtn} */
describe('ReadMoreBtn Spec', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    const el = (
      <ReadMoreBtn />
    );
    ReactDOM.render(el, div);
  });

  it('should render "Leer más" Button when text is not expanded', () => {
    const wrapper = mount(
      <ReadMoreBtn idx="1" />
    );
    const CtaBtn = wrapper.find('ReadMoreBtn__CtaBtn');
    const CtaBtntext = CtaBtn.text();

    expect(CtaBtntext).toBe('Leer más');
  });
});
