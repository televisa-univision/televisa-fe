import React from 'react';

import { storiesOf } from '@storybook/react';

import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';

import GridLatestVideos from '.';

storiesOf('Widgets/GridLatestVideos', module)
  .add('Specific Episodes Widget', () => (
    <ApiProvider
      url="https://univision.com/shows/por-amar-sin-ley"
      render={(data) => {
        const settings = {
          ...data.widgets[1].settings,
          contentLimit: 4,
          type: 'allgridlatestvideos',
        };

        return (
          <GridLatestVideos
            content={data.widgets[1].contents}
            settings={settings}
          />
        );
      }}
    />
  ));
