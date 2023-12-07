/* eslint-disable require-jsdoc */
import React from 'react';

import { storiesOf } from '@storybook/react';

import Truncate from '.';

const text = '<b>Lorem ipsum</b> <span>dolor sit amet, consectetur adipiscing elit. Maecenas dictum arcu erat, sit amet convallis dolor vulputate lobortis. Duis eget placerat elit. Fusce ut quam ligula. In iaculis ut ipsum nec hendrerit. Proin venenatis neque ac libero lacinia, non tristique velit ultricies. Phasellus accumsan ipsum diam, ac semper ipsum volutpat facilisis. Sed semper nisi id dictum porta. Fusce commodo enim a orci dictum, eu ullamcorper orci ultrices</span>';

const Wrapper = (props) => {
  return (
    <div style={{ background: '#ccc', padding: 20 }}>
      <Truncate {...props} />
    </div>
  );
};
storiesOf('Text/Truncate', module)
  .add('Default', () => <Wrapper text={text} />)
  .add('With custom labels', () => <Wrapper text={text} openLabel="Click to close" closedLabel="click to expand" />)
  .add('Disabled on desktop', () => (
    <div>
      <p>In this example, Truncation will be disabled on viewports above 1000px.</p>
      <Wrapper
        text={text}
        device={window.outerWidth > 1000 ? 'desktop' : 'mobile'}
      />
    </div>
  ));
