import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
// import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import data from './__mocks__/RelatedCollection.json';
import RelatedCollection from '.';

const store = configureStore();

storiesOf('Recirculation/Related Collection', module)
  .addDecorator((story) => {
    return (
      <div className="uvs-container">
        <Provider store={store}>
          {story()}
        </Provider>
      </div>
    );
  })
  .add('default', () => {
    return <RelatedCollection {...data} device="desktop" />;
  })
  .add('custom title', () => {
    const customTitle = {
      href: '/test',
      target: '_blank',
    };
    return (
      <RelatedCollection
        {...data}
        device="desktop"
        titleLink={customTitle}
        title="Custom title"
      />
    );
  })
  .add('with 4 cards', () => {
    return (
      <RelatedCollection
        {...data}
        contents={[
          data.contents[0],
          data.contents[1],
          data.contents[2],
          data.contents[3],
        ]}
        device="desktop"
      />
    );
  })
  .add('with 3 cards', () => {
    return (
      <RelatedCollection
        {...data}
        contents={[
          data.contents[0],
          data.contents[1],
          data.contents[2],
        ]}
        device="desktop"
      />
    );
  })
  .add('with 2 cards', () => {
    return (
      <RelatedCollection
        {...data}
        contents={[
          data.contents[0],
          data.contents[1],
        ]}
        device="desktop"
      />
    );
  });
