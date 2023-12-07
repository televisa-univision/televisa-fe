import React from 'react';

import { storiesOf } from '@storybook/react';

import Quote from '.';

storiesOf('Enhancement/Quote Enhancement', module)
  .add('Blockquote', () => (
    <Quote
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mattis lorem lobortis porta. Etiam semper turpis vel nisl dictum eleifend. Maecenas consequat felis ligula, id iaculis metus pellentesque id. Sed tincidunt purus eget tortor efficitur rutrum. Sed a nisl non libero ornare mollis. Etiam nec sapien pharetra, varius sapien vitae, cursus eros. Nulla aliquet vel odio nec ultricies. Ut luctus vulputate diam et mollis. Nam eget rutrum lectus, vitae eleifend libero. Sed dictum, nulla eu interdum finibus, ligula ligula commodo urna, et interdum leo odio vel metus."
      type="blockquote"
    />
  ))
  .add('Pullquote', () => (
    <Quote
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mattis lorem lobortis porta."
      type="pullquote"
    />
  ));
