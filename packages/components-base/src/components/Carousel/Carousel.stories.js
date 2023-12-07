import React from 'react';
import { storiesOf } from '@storybook/react';
import { getDevice } from '@univision/fe-commons/dist/utils/storybook';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import Carousel from '.';
import PromoItem from '../PromoItem';
import TestItem from './examples/TestItem';
import ComplicatedExample from './examples/ComplicatedExample';
import { image } from '../../config/storyMocks';
import Styles from './CarouselStories.scss';

const numberOfElements = 12;

const elements = Array.from({ length: numberOfElements }, (v, i) => {
  return <TestItem key={`t${i}`} numberId={i} />;
});

const device = getDevice();

storiesOf('Slidable/Carousel', module)
  .add('default', () => {
    Store.dispatch(setPageData({ device }));
    return (
      <div className={Styles.wrapper}>
        <Carousel
          className={Styles.carousel}
          maskWrapper={Styles.mask}
          arrowTheme="light"
        >
          {elements.map((e) => {
            return e;
          })}
        </Carousel>
      </div>
    );
  })
  .add('without lazyloading', () => {
    Store.dispatch(setPageData({ device }));
    return (
      <div className={Styles.wrapper}>
        <Carousel
          className={Styles.carousel}
          maskWrapper={Styles.mask}
          arrowTheme="light"
          disableLazyLoad
        >
          {elements.map((e) => {
            return e;
          })}
        </Carousel>
      </div>
    );
  })
  .add('showing 2 elements', () => {
    Store.dispatch(setPageData({ device }));
    return (
      <div className={Styles.wrapper}>
        <Carousel
          className={Styles.carousel}
          maskWrapper={Styles.mask}
          arrowTheme="light"
          usePagination
          itemsToBeDisplayed={2}
        >
          {elements.map((e) => {
            return e;
          })}
        </Carousel>
      </div>
    );
  })
  .add('displaying 2 in mobile, 3 in sm, 4 in md and 5 in lg and xl', () => {
    const itemsToBeDisplayed = {
      xs: 2,
      sm: 3,
      md: 4,
      lg: 5,
      xl: 5,
    };
    Store.dispatch(setPageData({ device }));
    return (
      <div className={Styles.wrapper}>
        <Carousel
          className={Styles.carousel}
          maskWrapper={Styles.mask}
          arrowTheme="light"
          usePagination
          itemsToBeDisplayed={itemsToBeDisplayed}
        >
          {elements.map((e) => {
            return e;
          })}
        </Carousel>
      </div>
    );
  })
  .add('displaying 3 in sm, 2 in the rest', () => {
    const itemsToBeDisplayed = {
      sm: 3,
    };

    Store.dispatch(setPageData({ device }));
    return (
      <div className={Styles.wrapper}>
        <Carousel
          className={Styles.carousel}
          maskWrapper={Styles.mask}
          arrowTheme="light"
          usePagination
          itemsToBeDisplayed={itemsToBeDisplayed}
          itemsToBeDisplayedDefault={2}
        >
          {elements.map((e) => {
            return e;
          })}
        </Carousel>
      </div>
    );
  })
  .add('Starting at the page of item number 5', () => {
    Store.dispatch(setPageData({ device }));
    const itemsToBeDisplayed = {
      xs: 1,
      sm: 3,
      md: 4,
      lg: 5,
      xl: 5,
    };
    return (
      <div className={Styles.wrapper}>
        <Carousel
          className={Styles.carousel}
          maskWrapper={Styles.mask}
          arrowTheme="light"
          usePagination
          goToItem={5}
          itemsToBeDisplayed={itemsToBeDisplayed}
          mobilePeek={30}
        >
          {elements.map((e) => {
            return e;
          })}
        </Carousel>
      </div>
    );
  })
  .add('Starting at the page of number 5 and selecting it', () => {
    Store.dispatch(setPageData({ device }));
    return (
      <div className={Styles.wrapper}>
        <Carousel
          className={Styles.carousel}
          maskWrapper={Styles.mask}
          arrowTheme="light"
          usePagination
          goToItem={5}
          selectedItem={5}
        >
          {elements.map((e) => {
            return e;
          })}
        </Carousel>
      </div>
    );
  })
  .add('Without pagination', () => {
    Store.dispatch(setPageData({ device }));
    return (
      <div className={Styles.wrapper}>
        <Carousel
          className={Styles.carousel}
          maskWrapper={Styles.mask}
          arrowTheme="light"
        >
          {elements.map((e) => {
            return e;
          })}
        </Carousel>
      </div>
    );
  })
  .add('Without pagination and partial showing', () => {
    Store.dispatch(setPageData({ device }));
    return (
      <div className={Styles.wrapper}>
        <Carousel
          className={Styles.carousel}
          maskWrapper={Styles.mask}
          arrowTheme="light"
          partialShowing
        >
          {elements.map((e) => {
            return e;
          })}
        </Carousel>
      </div>
    );
  })
  .add('with Mobile Peek of 70px (Mobile Only)', () => {
    Store.dispatch(setPageData({ device }));
    const itemsToBeDisplayed = {
      xs: 1,
    };
    return (
      <div className={Styles.wrapper}>
        <Carousel
          className={Styles.carousel}
          maskWrapper={Styles.mask}
          arrowTheme="light"
          mobilePeek={70}
          itemsToBeDisplayed={itemsToBeDisplayed}
        >
          {elements.map((e) => {
            return e;
          })}
        </Carousel>
      </div>
    );
  })
  .add('switching to desktop at 480px', () => {
    Store.dispatch(setPageData({ device }));
    const itemsToBeDisplayed = {
      xs: 2,
    };
    return (
      <div className={Styles.wrapper}>
        <Carousel
          arrowTheme="light"
          itemsToBeDisplayed={itemsToBeDisplayed}
          switchToDesktop={480}
        >
          {elements.map((e) => {
            return e;
          })}
        </Carousel>
      </div>
    );
  })
  .add('with separator at 7px in mobile and 32px in the others', () => {
    Store.dispatch(setPageData({ device }));
    const separator = {
      xs: 7,
    };
    return (
      <div className={Styles.wrapper}>
        <Carousel
          className={Styles.carousel}
          maskWrapper={Styles.mask}
          arrowTheme="light"
          mobilePeek={8}
          separator={separator}
          separatorDefaultValue={32}
        >
          {elements.map((e) => {
            return e;
          })}
        </Carousel>
      </div>
    );
  })
  .add('With Promo items', () => {
    Store.dispatch(setPageData({ device }));
    const numberOfItems = {
      md: 5,
      xs: 2,
    };

    const numberOfPromoItems = 7;

    const promo = Array.from({ length: numberOfPromoItems }, (v, i) => {
      Store.dispatch(setPageData({ device }));
      return (
        <PromoItem
          image={image}
          view="vertical"
          primaryTag={{ name: 'Noticias' }}
          showIcon
          type="slideshow"
          className={Styles.promoItem}
          title={`This is number ${i + 1}`}
          key={`test${i}`}
        />
      );
    });

    return (
      <div className={Styles.wrapper}>
        <Carousel
          itemsToBeDisplayed={numberOfItems}
          leftArrowClassName={Styles.leftArrow}
          itemsToBeDisplayedDefault={4}
          partialShowing
          usePagination
          arrowTheme="light"
          className={Styles.carousel}
          maskWrapper={Styles.mask}
        >
          {promo.map((e) => {
            return e;
          })}
        </Carousel>
      </div>
    );
  })
  .add('With Promo items, black version', () => {
    Store.dispatch(setPageData({ device }));
    const numberOfItems = {
      md: '5',
      xs: '2',
    };

    const numberOfPromoItems = 7;

    const promo = Array.from({ length: numberOfPromoItems }, (v, i) => {
      return (
        <PromoItem
          image={image}
          view="vertical"
          primaryTag={{ name: 'Noticias' }}
          showIcon
          type="slideshow"
          className={Styles.promoItem}
          title={`This is number ${i + 1}`}
          key={`test${i}`}
        />
      );
    });

    return (
      <div
        className={Styles.wrapper}
        style={{ background: '#000', margin: '-20px', padding: '20px' }}
      >
        <Carousel
          itemsToBeDisplayed={numberOfItems}
          leftArrowClassName={Styles.leftArrow}
          itemsToBeDisplayedDefault={4}
          partialShowing
          usePagination
          className={Styles.carousel}
          maskWrapper={Styles.mask}
        >
          {promo.map((e) => {
            return e;
          })}
        </Carousel>
      </div>
    );
  })
  .add('Complicated Example', () => {
    Store.dispatch(setPageData({ device }));
    return <ComplicatedExample />;
  });
