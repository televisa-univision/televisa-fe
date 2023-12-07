import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import SearchButton from './SearchButton';

let wrapper;
beforeAll(() => {
  wrapper = shallow(<SearchButton className="blabblahblah" />);
});

/** @test {SearchButton} */
describe('SearchButton', () => {
  it('should render  without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchButton className="blabblahblah" />, div);
  });

  it('should render  a Link component', () => {
    const link = wrapper.children().first();
    expect(link).toBeDefined();
    expect(wrapper.find('Link')).toBeTruthy();
  });

  it('should pass Univision search URI to the Link component', () => {
    const link = wrapper.children().first();
    expect(link).toBeDefined();
    expect(link.props().href).toBe('https://www.univision.com/search');
  });

  it('should render  the className prop', () => {
    expect(wrapper.hasClass('blabblahblah')).toBeTruthy();
  });
});
