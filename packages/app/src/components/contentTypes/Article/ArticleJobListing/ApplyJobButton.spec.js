import React from 'react';
import ReactDOM from 'react-dom';

import { mount } from 'enzyme';
import ApplyJobButton from '.';

const props = {
  applyUrl: 'https://abc.xyz/jobs/CTO',
};

/** @test {AplicarButton} */
describe('Aplicar Button', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    const el = (
      <ApplyJobButton />
    );
    ReactDOM.render(el, div);
  });

  it('Should render aplicar Button', () => {
    const wrapper = mount(<ApplyJobButton {...props} />);
    expect(wrapper.find('ApplyJobButton')).toHaveLength(1);
  });
});
