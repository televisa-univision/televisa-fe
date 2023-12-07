import React from 'react';
import ReactDOM from 'react-dom';

import Scripts from '.';

describe('Scripts', () => {
  const props = {
    pageData: {
      title: '',
    },
  };
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Scripts {...props} />, div);
  });
});
