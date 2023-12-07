import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import AskExpertCtaBtn from './AskExpertCtaBtn';

const props = {
  uri: 'www.abc.test.com',
};

/** @test {Ask Expert CTA Button} */
describe('Ask Expert CTA Button', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const el = (
      <AskExpertCtaBtn />
    );
    ReactDOM.render(el, div);
  });

  it('should not render the CTA Button Container', () => {
    const wrapper = mount(<AskExpertCtaBtn {...props} />);
    const CtaBtnContainer = wrapper.find('AskExpertCtaBtn__CtaContainer');

    expect(CtaBtnContainer).toHaveLength(1);
  });
});
