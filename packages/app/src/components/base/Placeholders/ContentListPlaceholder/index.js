import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import themes from '@univision/fe-commons/dist/utils/themes/themes.json';
import { themeSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';

import Loading from '@univision/fe-components-base/dist/components/Loading';

import Styles from './ContentListPlaceholder.scss';

/**
 * Renders the placeholder for an item in the ContentList
 * @param {string} title Content title
 * @param {string} size loading size
 * @returns {JSX}
 * @constructor
 */
export const Placeholder = ({ theme, size = 'medium' }) => {
  return (
    <div className={Styles.preloader} style={{ borderColor: theme.primary }}>
      <Loading
        size={size}
        theme={themes.themes.black}
        className={Styles.loaderBox}
        label={`${localization.get('loading')}...`}
      />
    </div>
  );
};

Placeholder.propTypes = {
  size: PropTypes.string,
  theme: PropTypes.object,
};

/**
 * Connector to map theme to Placeholder component
 * @param {Object} state of the app
 * @returns {Object}
 */
export const mapStateToProps = state => ({
  theme: themeSelector(state),
});

export default connect(mapStateToProps)(Placeholder);
