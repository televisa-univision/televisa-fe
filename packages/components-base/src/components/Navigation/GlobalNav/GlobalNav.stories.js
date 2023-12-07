import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import { storiesOf } from '@storybook/react';
import styled, { ThemeProvider } from 'styled-components';

import GlobalNav from '.';

const store = configureStore();

const props = {
  activePath: '/famosos',
};

const Wrapper = styled.div`
  height: 100px;
  margin: -20px;
`;

/**
 * Render GlobalNav component
 * @param {Object} extraProps additional props for the component
 * @param {Object} theme of the component
 * @returns {JSX}
 */
const renderGlobalNav = (extraProps, theme = {}) => {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Provider store={store}>
          <GlobalNav {...props} {...extraProps} />
        </Provider>
      </Wrapper>
    </ThemeProvider>
  );
};

storiesOf('Navigation/GlobalNav', module)
  .add('default', () => (renderGlobalNav()))
  .add('univision homepage', () => (renderGlobalNav({ isVertical: true, activePath: null })))
  .add('noticias theme', () => (renderGlobalNav({ activePath: '/noticias' }, { globalNavBackgroundColor: '#113967' })))
  .add('famosos theme', () => (renderGlobalNav({}, { globalNavBackgroundColor: '#660840' })))
  .add('horoscopos theme', () => (renderGlobalNav({}, { globalNavBackgroundColor: '#391042' })))
  .add('shows theme', () => (renderGlobalNav({ activePath: '/shows' }, { globalNavBackgroundColor: '#333333' })))
  .add('autos theme', () => (renderGlobalNav({ activePath: null }, { globalNavBackgroundColor: '#333333' })))
  .add('locales theme', () => (renderGlobalNav({ activePath: '/mi-ciudad' }, { globalNavBackgroundColor: '#10162B' })))
  .add('delicioso theme', () => (renderGlobalNav({ activePath: null }, { globalNavBackgroundColor: '#7F0E12' })));
