import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { globalWidgetSelector, themeSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import NotificationBanner from '@univision/fe-components-base/dist/components/NotificationBanner';
import { getKey, isValidArray } from '@univision/fe-commons/dist/utils/helpers';

import Styles from './GlobalWidget.styles';

const GlobalWidgetContainer = styled.div`${Styles.container}`;

/**
 * Global Widgets component, any logic related to this will be contained here
 * @returns {JSX}
 */
const GlobalWidget = ({ isDark }) => {
  const widgetsData = useSelector(globalWidgetSelector);
  const theme = useSelector(themeSelector);
  if (!isValidArray(widgetsData) || widgetsData.length === 0 || theme?.hideGlobalWidget) {
    return null;
  }

  return (
    <GlobalWidgetContainer isDark={isDark || getKey(theme, 'isDark')}>
      <div className="uvs-container">
        {widgetsData.map((widget, idx) => {
          // eslint-disable-next-line no-param-reassign
          widget.content = widget.contents;
          return (
            <div className="widget" data-position={getKey(widget, 'analyticsData.widget.widget_pos', idx + 1)} data-widget-type="AllBannerMovingBanner">
              <NotificationBanner {...widget} theme={theme} />
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
};

/**
 * propTypes
 * @property {Boolean} by default is false.
 */
GlobalWidget.defaultProps = {
  isDark: false,
};

export default React.memo(GlobalWidget);
