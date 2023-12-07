import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import Loader from './Loader';
import Styles from './Loader.scss';

describe('Search Page Form', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Loader loading />, div);
  });

  it('should have loaded class if loading is false', () => {
    const wrapper = mount(<Loader loading={false} />);
    expect(wrapper.find(`.${Styles.loaded}`).length).toBe(1);
  });
});
