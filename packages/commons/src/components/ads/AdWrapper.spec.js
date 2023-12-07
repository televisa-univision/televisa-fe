import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import AdWrapper from './AdWrapper';
import Styles from './AdWrapper.scss';

/** @test {AdWrapper} */
describe('AdWapper ', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(React.createElement(AdWrapper), div);
  });
  it('should have stripped class', () => {
    const wrapper = shallow(<AdWrapper hasBg />);
    expect(wrapper.hasClass(Styles.stripedBg)).toBe(true);
  });
});
