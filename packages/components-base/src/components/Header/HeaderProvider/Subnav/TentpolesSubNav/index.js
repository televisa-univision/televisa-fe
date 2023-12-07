import React from 'react';
import PropTypes from 'prop-types';

import Store from '@univision/fe-commons/dist/store/store';
import { hasKey, getKey, exists } from '@univision/fe-commons/dist/utils/helpers';
import { getPageData, getBrandable } from '@univision/fe-commons/dist/store/storeHelpers';

import Logo from '../../../../Logo';

import Styles from './TentpolesSubNav.scss';

/**
 * Tentpoles Sub Navigation Component
 * @param {Object} props component props
 * @returns {JSX}
 */
const TentpolesSubNav = (props) => {
  // Getting brandable info
  const brandableObject = getBrandable(Store);
  let brandable = getKey(brandableObject, 'pageData.brandable', null);
  if (!exists(brandable)) {
    const pageData = getPageData(Store);
    brandable = getKey(pageData, 'data.brandable', null);
    if (!exists(brandable)) {
      brandable = getKey(props, 'brandable', null);
    }
  }

  const { subNavBackground } = props;
  return (
    <div
      style={{
        backgroundColor: subNavBackground.color,
        backgroundImage: subNavBackground.image ? `url(${subNavBackground.image})` : null,
      }}
      className={Styles.tentpoleContentPage}
    >
      <div className="container">
        <div className="col-12">
          <div className={Styles.imageWrapper}>
            {hasKey(brandable, 'show.headerLogo.original.href') && (
              <Logo
                uri={brandable.uri}
                src={brandable.show.headerLogo.original.href}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

TentpolesSubNav.propTypes = {
  subNavBackground: PropTypes.object,
};

TentpolesSubNav.defaultProps = {
  subNavBackground: {},
};

export default TentpolesSubNav;
