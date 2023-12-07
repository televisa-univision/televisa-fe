import React from 'react';

import { storiesOf } from '@storybook/react';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';

import StationByGenreList from './StationByGenreList';

storiesOf('Widgets/StationByGenreList', module).add('with content, settings and theme', () => (
  <ApiProvider
    url="http://www.univision.com/musica/uforia-music/radio"
    render={api => (
      <div className="uvs-container uvs-widget">
        <StationByGenreList
          content={api.widgets[1].contents}
          settings={api.widgets[1].settings}
          theme={{
            primary: '#bc0d0d',
            secondary: '#9d0000',
          }}
        />
      </div>
    )}
  />
));
