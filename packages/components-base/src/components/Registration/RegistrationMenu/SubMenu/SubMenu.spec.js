import React from 'react';
import ReactDOM from 'react-dom';
import SubMenu from '.';

describe('SubMenu component tests', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SubMenu />, div);
  });
});
