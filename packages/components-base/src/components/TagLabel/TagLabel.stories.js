import React from 'react';
import { storiesOf } from '@storybook/react';

import TagLabel from '.';

const primaryTag = {
  link: 'https://www.univision.com/entretenimiento',
  name: 'Entretenimiento',
};

storiesOf('Clickable/TagLabel', module)
  .add('Default', () => <TagLabel tag={primaryTag} />)
  .add('With Icon', () => <TagLabel tag={primaryTag} icon="univision" />);
