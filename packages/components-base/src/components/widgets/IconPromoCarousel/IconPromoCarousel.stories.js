import React from 'react';
import { storiesOf } from '@storybook/react';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { getDevice } from '@univision/fe-commons/dist/utils/storybook';

import IconPromoCarousel from '.';
import mockData from './__mocks__/data.json';

/**
 * Wrapper IconPromoCarousel
 * @param {Object} props - the component props
 * @returns {JSX}
 */
const CarouselWrapper = props => (
  <div>
    <p>Resize window to see mobile behavior.</p>
    <IconPromoCarousel {...props} />
  </div>
);

storiesOf('Slidable/IconPromoCarousel', module)
  .addDecorator((story) => {
    Store.dispatch(setPageData({ device: getDevice(), pageCategory: 'horoscopos' }));
    return <div className="uvs-container">{story()}</div>;
  })
  .add('default', () => {
    return (
      <CarouselWrapper
        settings={{
          title: 'Widget title',
          titleLink: 'http://univision.com',
        }}
        content={mockData}
        itemWidth={110}
        theme={{ primary: 'red' }}
      />
    );
  });
