import PropTypes from 'prop-types';
import React from 'react';

import Store from '@univision/fe-commons/dist/store/store';
import { getTheme } from '@univision/fe-commons/dist/store/storeHelpers';
import themes from '@univision/fe-commons/dist/utils/themes/themes.json';

import Loading from '../Loading';

import Styles from './ContentListPlaceholder.scss';

/**
 * Renders the placeholder for an item in the ContentList
 * @param {string} title Content title
 * @returns {JSX}
 * @constructor
 */
const ContentListPlaceholder = ({ label }) => {
  const theme = getTheme(Store);
  return (
    <div className={Styles.preloader} style={{ borderColor: theme.primary }}>
      <Loading
        size="medium"
        theme={themes.themes.black}
        className={Styles.loaderBox}
        label={label}
      />
    </div>
  );
};

ContentListPlaceholder.propTypes = {
  label: PropTypes.string,
};

export default ContentListPlaceholder;
