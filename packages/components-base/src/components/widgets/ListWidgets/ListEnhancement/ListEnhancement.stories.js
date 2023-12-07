/* eslint react/prop-types: 0 */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withViewport } from '@storybook/addon-viewport';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import { Provider } from 'react-redux';
import ListWidget from './ListConnector';
import mockData from './__mocks__/listContent.json';
import Styles from './ListEnhancement.stories.styles';

const store = configureStore();

const BodyReset = Styles.bodyReset;
const BlackBody = Styles.blackBody;

const listProps = {
  ...mockData,
};

storiesOf('Widgets/TUDN Enhancements/List Widget/Mobile', module)
  .addDecorator(story => (
    <>
      <BodyReset />
      <div className="uvs-container" style={{ marginTop: '16px' }}>
        <Provider store={store}>
          {story()}
        </Provider>
      </div>
    </>
  ))
  .addDecorator(withViewport('iphone8p'))
  .add('light', () => {
    return (
      <ListWidget {...listProps} />
    );
  })
  .add('dark', () => {
    const darkProps = {
      ...listProps,
      theme: {
        isDark: true,
      },
    };
    store.dispatch(setPageData({
      pageCategory: 'show',
    }));
    return (
      <>
        <BlackBody />
        <ListWidget {...darkProps} />
      </>
    );
  })
  .add('isWorldCupMVP true', () => {
    return (
      <>
        <ListWidget {...listProps} widgetContext={{ isWorldCupMVP: true }} />
      </>
    );
  });

storiesOf('Widgets/TUDN Enhancements/List Widget/Desktop', module)
  .addDecorator(story => (
    <>
      <BodyReset />
      <div className="uvs-container" style={{ marginTop: '16px' }}>
        <Provider store={store}>
          {story()}
        </Provider>
      </div>
    </>
  ))
  .add('light', () => {
    return (
      <ListWidget {...listProps} />
    );
  })
  .add('dark', () => {
    const darkProps = {
      ...listProps,
      theme: {
        isDark: true,
      },
    };
    store.dispatch(setPageData({
      pageCategory: 'show',
    }));
    return (
      <>
        <BlackBody />
        <ListWidget {...darkProps} />
      </>
    );
  })
  .add('isWorldCupMVP true', () => {
    return (
      <>
        <ListWidget {...listProps} widgetContext={{ isWorldCupMVP: true }} />
      </>
    );
  });
