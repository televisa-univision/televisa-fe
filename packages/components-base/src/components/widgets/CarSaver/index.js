import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import loadCarSaverScript from '@univision/fe-commons/dist/utils/loaders/carsaver';

import Styles from './CarSaver.scss';

export const WIDGET_ID = 'carsaver-widget-search-new-car'; // required by external carsaver.com

/**
 * CarSaver embedded widget
 */
export default class CarSaver extends React.Component {
  /**
   * initialize CarSaver description
   * if in dev env, reset carsaverWidgetSearchInit on mount for hot reloading
   */
  componentDidMount() {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      // make the widget reinitialize after hot reload in dev env
      global.window.carsaverWidgetSearchInit = undefined;
    }
    loadCarSaverScript(WIDGET_ID);
  }

  /**
   * render
   * @returns {JSX} the carsaver widget
   */
  render () {
    /* eslint-disable react/no-danger */
    const { orientation } = this.props;
    return (
      <div
        className={classnames('uvs-widget', Styles[orientation], Styles.container)}
        dangerouslySetInnerHTML={{
          __html: `<div id="${WIDGET_ID}" data-orientation="${orientation}"></div>`,
        }}
      />
    );
    /* eslint-enable react/no-danger */
  }
}

CarSaver.propTypes = {
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
};

CarSaver.defaultProps = {
  orientation: 'horizontal',
};
