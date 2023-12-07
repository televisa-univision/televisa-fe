import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import themes from '@univision/fe-commons/dist/utils/themes/themes.json';
import Loading from '@univision/fe-components-base/dist/components/Loading';

import Styles from './Loader.scss';

/**
 * Loader component for Search
 * @param {Object} props component props
 * @returns {JSX}
 */
const Loader = (props) => {
  const { loading, size } = props;
  return (
    <div className={
      classnames(
        Styles.loader,
        loading ? Styles.loading : Styles.loaded,
        Styles[size],
      )
    }
    >
      <div className={Styles.loaderText}>
        <Loading
          size={size}
          theme={themes.themes.black}
          className={Styles.loaderBox}
          label={`${localization.get('loading')}...`}
        />
      </div>
    </div>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool,
  size: PropTypes.string,
};

Loader.defaultProps = {
  size: 'medium',
};

export default Loader;
