import React from 'react';
import { storiesOf } from '@storybook/react';
import NoAlerts from '.';

const story = storiesOf('Widgets/Alert List/No Alerts', module);

story.add('Land page', () => {
  return (
    <div className="uvs-container">
      <NoAlerts uri="" />
    </div>
  );
});
