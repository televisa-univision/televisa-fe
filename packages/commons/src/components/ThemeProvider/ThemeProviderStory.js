import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import Store from '../../store/store';
import { setThemeData } from '../../store/actions/page-actions';
import getStyledTheme from './helpers';
import ThemeProvider from './ThemeProviderConnector';

/**
 * Async Header Storybook helper
 */
export default class ThemeProviderStory extends PureComponent {
  state = {
    loaded: false,
  }

  /**
   * component did mount
   */
  componentDidMount() {
    const { pageCategory, data } = this.props;
    const themeData = getStyledTheme(pageCategory, data);
    Store.dispatch(setThemeData({ v2: themeData }));
    this.setState({ loaded: true });
  }

  /**
   * render the desired component with state as props
   * @returns {JSX}
   */
  render () {
    const { children } = this.props;

    if (Object.keys(this.state).length === 0) return <div>Loading...</div>;

    return (
      <Provider store={Store}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </Provider>
    );
  }
}

ThemeProviderStory.propTypes = {
  pageCategory: PropTypes.string.isRequired,
  data: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.array,
  ]),
};

ThemeProviderStory.defaultProps = {
  data: {},
};
