import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { getDevice } from '@univision/fe-commons/dist/utils/storybook';
import {
  CATEGORY_BY_UID,
  HOROSCOPE,
} from '@univision/fe-commons/dist/constants/pageCategories';
import { IconPromoContainer } from '.';
import mockData from '../IconPromoCarousel/__mocks__/data.json';

/**
 * Wrapper IconPromoCarousel
 * @param {Object} props - the component props
 * @returns {JSX}
 */
const CarouselWrapper = ({ children }) => ( // eslint-disable-line
  <div>
    <p>Resize window to see mobile behavior.</p>
    {children}
  </div>
);

storiesOf('Slidable/IconPromoContainer', module)
  .addDecorator((story) => {
    Store.dispatch(setPageData({
      device: getDevice(),
      pageCategory: 'horoscopos',
    }));
    return <div className="uvs-container">{story()}</div>;
  })
  .add('IconPromoCarousel', () => {
    return (
      <Provider store={Store}>
        <CarouselWrapper>
          <IconPromoContainer
            settings={{
              title: 'Widget title',
              titleLink: 'http://univision.com',
            }}
            content={mockData}
            itemWidth={110}
            theme={{ primary: 'red' }}
          />
        </CarouselWrapper>
      </Provider>
    );
  })
  .add('FavoriteHoroscopesSelector', () => {
    return (
      <Provider store={Store}>
        <CarouselWrapper>
          <IconPromoContainer
            sectionId={CATEGORY_BY_UID[HOROSCOPE]}
            isFavHoroscopesEnabled
          />
        </CarouselWrapper>
      </Provider>
    );
  });
