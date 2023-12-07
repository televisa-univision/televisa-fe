import React from 'react';
import ReactDOM from 'react-dom';

import GatsbyIframeWrapper from '.';

const GatsbyIframeWrapperDefault = (
  <GatsbyIframeWrapper>
    <div>Hello World</div>
  </GatsbyIframeWrapper>
);

/** @test {GatsbyIframeWrapper} */
describe('GatsbyIframeWrapper', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(GatsbyIframeWrapperDefault, div);
  });
});
