import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Separator from '.';
import Styles from './Separator.scss';

/** @test {Separator} */
describe('Separator ', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Separator />, div);
  });
  it('should add small class', () => {
    const wrapper = shallow(<Separator width="small" />);
    expect(wrapper.find(`div.${Styles.small}`).length).toBe(1);
  });
  it('should add align-center class', () => {
    const wrapper = shallow(<Separator align="center" />);
    expect(wrapper.find(`div.${Styles.center}`).length).toBe(1);
  });
  it('should add align-right class', () => {
    const wrapper = shallow(<Separator align="right" />);
    expect(wrapper.find(`div.${Styles.right}`).length).toBe(1);
  });
  it('renders when theme is available', () => {
    const wrapper = shallow(<Separator theme={{ primary: 'blue' }} />);
    expect(wrapper.find(`div.${Styles.separator}`).length).toBe(1);
  });
});
