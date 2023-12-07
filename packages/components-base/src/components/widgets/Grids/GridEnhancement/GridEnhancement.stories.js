import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import { withViewport } from '@storybook/addon-viewport';
import { withBackgrounds } from '@storybook/addon-backgrounds';

import { getDevice } from '@univision/fe-commons/dist/utils/storybook';
import tudnTheme from '@univision/fe-commons/dist/themes/tudn';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import mockData from './__mocks__/gridMockData.json';
import Styles from './GridEnhancement.stories.styles';
import GridWidgetComponent from './GridConnector';

const BodyGlobalReset = Styles.bodyReset;
const BlackGlobalBody = Styles.blackBody;

const store = configureStore();
const theme = tudnTheme();
const device = getDevice();
const props = {
  device,
};

storiesOf('Widgets/TUDN Enhancements/Grid Widget', module)
  .addDecorator(story => (
    <>
      <BodyGlobalReset />
      <div className="uvs-container" style={{ marginTop: '16px' }}>
        <Provider store={store}>
          {story()}
        </Provider>
      </div>
    </>
  ))
  .addDecorator(withBackgrounds([]))
  .addDecorator(withViewport('iphone6'))
  .add('Mobile', () => {
    store.dispatch(setPageData({ device: 'mobile' }));
    return (

      <GridWidgetComponent
        {...mockData[1]}
        theme={theme}
      />
    );
  })
  .add('Mobile with more news', () => {
    store.dispatch(setPageData({ device: 'mobile' }));
    return (

      <GridWidgetComponent
        {...mockData[0]}
        theme={theme}
      />
    );
  })
  .add(
    'Desktop',
    () => {
      store.dispatch(setPageData({ device: 'desktop' }));
      return (
        <GridWidgetComponent
          {...mockData[1]}
          theme={theme}
        />
      );
    },
    { viewport: 'default' }
  )
  .add(
    'Desktop with more news',
    () => {
      store.dispatch(setPageData({ device: 'desktop' }));
      return (
        <GridWidgetComponent
          {...mockData[0]}
          theme={theme}
        />
      );
    },
    { viewport: 'default' }
  )
  .add(
    'Desktop - dark mode',
    () => {
      store.dispatch(setPageData({
        device: 'desktop',
        pageCategory: 'show',
      }));
      const darkProps = {
        ...props,
        commonRootSection: {
          uri: 'shows',
        },
        theme: {
          isDark: true,
        },
      };
      return (
        <>
          <BlackGlobalBody />
          <GridWidgetComponent
            {...mockData[1]}
            {...darkProps}
          />
        </>
      );
    },
    { viewport: 'desktop' }
  )
  .add(
    'Desktop - dark mode with more news',
    () => {
      store.dispatch(setPageData({
        device: 'desktop',
        pageCategory: 'show',
      }));
      const darkProps = {
        ...props,
        commonRootSection: {
          uri: 'shows',
        },
        theme: {
          isDark: true,
        },
      };
      return (
        <>
          <BlackGlobalBody />
          <GridWidgetComponent
            {...mockData[0]}
            {...darkProps}
          />
        </>
      );
    },
    { viewport: 'desktop' }
  );
