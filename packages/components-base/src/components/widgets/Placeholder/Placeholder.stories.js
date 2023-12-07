import React from 'react';
import { storiesOf } from '@storybook/react';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';

import Store from '@univision/fe-commons/dist/store/store';
import ApiProvider from '@univision/fe-commons/dist/components/ApiProvider';

import Default from './Default';
import CardsCarouselPlaceholder from './CardsCarousel';
import GridPlaceholder from './Grid';
import VideoWithPlaylistPlaceholder from './VideoWithPlaylist';
import ListPlaceholder from './List';

const EMPTY_OBJECT = {};
const EMPTY_ARRAY = [];

const BodyReset = createGlobalStyle`
  body #root {
    padding: 0;
  }
`;

storiesOf('Widgets/Placeholder', module)
  .add('default', () => (
    <ApiProvider
      url="https://www.univision.com/radio/el-bueno-la-mala-y-el-feo"
      render={(data) => {
        const { widgets } = data;

        if (!widgets) {
          return (
            <Default content={EMPTY_ARRAY} settings={EMPTY_OBJECT} />
          );
        }

        const settings = {
          ...data.widgets[2].settings,
          contentLimit: 4,
        };
        return (
          <Default content={data.widgets[2].contents} settings={settings} />
        );
      }}
    />
  ))
  .addDecorator(story => (
    <>
      <BodyReset />
      <div className="uvs-container" style={{ marginTop: '16px' }}>
        <Provider store={Store}>
          {story()}
        </Provider>
      </div>
    </>
  ))
  .add('Cards carousel placeholder', () => (
    <div style={{ height: '80vh' }}>
      <CardsCarouselPlaceholder device="mobile" />
    </div>
  ))
  .add('Grid placeholder', () => (
    <div style={{ height: '80vh' }}>
      <GridPlaceholder />
    </div>
  ))
  .add('VideoWithPlaylist placeholder', () => (
    <div style={{ height: '80vh' }}>
      <VideoWithPlaylistPlaceholder />
    </div>
  ))
  .add('List placeholder', () => (
    <div style={{ height: '80vh' }}>
      <ListPlaceholder />
    </div>
  ));
