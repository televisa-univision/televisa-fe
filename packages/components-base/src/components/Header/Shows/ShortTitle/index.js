import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Store from '@univision/fe-commons/dist/store/store';
import { getPageData } from '@univision/fe-commons/dist/store/storeHelpers';
import { exists, getKey } from '@univision/fe-commons/dist/utils/helpers';

import Link from '../../../Link';
import Styles from './ShortTitle.scss';

/**
 * ShortTitle header component
 * @param {Object} props of the component
 * @returns {JSX}
 */
const ShortTitle = ({
  backgroundColor,
  backgroundImage,
  title,
  uri,
}) => {
  const titleStyles = {};

  if (exists(backgroundImage)) {
    titleStyles.backgroundImage = `url(${backgroundImage})`;
  }

  if (exists(backgroundColor)) {
    titleStyles.backgroundColor = backgroundColor;
  }

  return (
    <div className={Styles.wrapper} style={titleStyles}>
      <div className="uvs-container">
        <div className="row">
          <div className={
            classnames(
              Styles.container,
              'col',
              { [Styles.offset]: getKey(getPageData(Store), 'data.type') !== 'video' }
            )}
          >
            <Link target="_self" href={uri} className={`uvs-font-a-bold ${Styles.title}`}>
              {title}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

ShortTitle.propTypes = {
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.string,
  title: PropTypes.string,
  uri: PropTypes.string,
};

export default ShortTitle;
