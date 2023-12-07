import React from 'react';
import { storiesOf } from '@storybook/react';
import CategorySponsors from '.';
import data from '../mockData';

storiesOf('Widgets/CategorySponsors', module)
  .addDecorator((story) => {
    return <div className="uvs-container">{story()}</div>;
  })
  .add('default', () => {
    return (
      <CategorySponsors category="Legal" sponsors={data.data.widgets[1].contents} />
    );
  });
