import React from 'react';
import { storiesOf } from '@storybook/react';
import mockData from './mockData.json';
import ProfileCard from './index';

storiesOf('Cards/Legacy/ProfileCard', module)
  .addDecorator(story => (
    <div className="uvs-container">{story()}</div>
  ))
  .add('default', () => (<ProfileCard {...mockData[0]} className="col-12 col-sm-6 col-md-4" />))
  .add('talent style', () => (<ProfileCard {...mockData[0]} className="col-12 col-sm-6 col-md-4" isTalent />))
  .add('show style', () => (<ProfileCard {...mockData[1]} className="col-12 col-sm-6 col-md-4" />));
