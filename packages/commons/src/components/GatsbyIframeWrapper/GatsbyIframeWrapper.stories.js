import React from 'react';
import { storiesOf } from '@storybook/react';

import GatsbyIframeWrapper from '.';

storiesOf('Layout/GatsbyIframeWrapper', module).add('default', () => {
  return (
    <GatsbyIframeWrapper>
      <p><b>GatsbyIframeWrapper</b> adds the library:
        <code> https://static.univision.com/external-content/uvn-iframe-resize.js</code>, to resize the iframe. <br />
        It works when the widget or component is displayed through the
        <b> All External Embed </b> widget.
      </p>
      <p>
        You can validate this in <i>Network Tab</i> at Inpector of navigatior
      </p>
    </GatsbyIframeWrapper>
  );
});
