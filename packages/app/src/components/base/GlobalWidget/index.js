import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

import { globalWidgetSelector, themeSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { getKey, isValidArray } from '@univision/fe-commons/dist/utils/helpers';

import Styles from './GlobalWidget.styles';

const NotificationBanner = dynamic(() => import(/* webpackChunkName: "globalWidgets-moving-banner" */ '@univision/fe-components-base/dist/components/NotificationBanner'));

const GlobalWidgetContainer = styled.div`${Styles.container}`;

/**
 * Global Widgets component, any logic related to this will be contained here
 * @returns {JSX}
 */
export const GlobalWidget = ({ isDark, theme, widgetsData }) => {
  if (!isValidArray(widgetsData)) {
    return null;
  }

  return (
    <GlobalWidgetContainer isDark={isDark || getKey(theme, 'isDark')}>
      <div className="uvs-container">
        {widgetsData.map((widget, idx) => {
          const enhancedWidget = { ...widget, content: widget.contents };
          return (
            <div key={widget.id} className="widget" data-position={getKey(widget, 'analyticsData.widget.widget_pos', idx + 1)} data-widget-type="AllBannerMovingBanner">
              <NotificationBanner {...enhancedWidget} theme={theme} />
            </div>
          );
        })}
      </div>
    </GlobalWidgetContainer>
  );
};

/**
 * propTypes
 * @property {Boolean} isDark indicates if the theme is in dark mode.
 */
GlobalWidget.propTypes = {
  isDark: PropTypes.bool,
  theme: PropTypes.object,
  widgetsData: PropTypes.array,
};

GlobalWidget.defaultProps = {
  isDark: false,
};

/**
 * Connector to subscribe on popups store changes
 * @param {Object} state of the page
 * @returns {{popups: Object}}
 */
export const mapStateToProps = state => ({
  theme: themeSelector(state),
  widgetsData: globalWidgetSelector(state),
});

export default connect(mapStateToProps)(GlobalWidget);
