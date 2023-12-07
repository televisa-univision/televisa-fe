import React from 'react';
import ReactDOM from 'react-dom';
import VideoPlayerPIPWrapper from '.';

describe('VideoPlayerPIPWrapper', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const props = {};
    ReactDOM.render(<VideoPlayerPIPWrapper {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
