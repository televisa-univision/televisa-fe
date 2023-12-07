import React from 'react';
import PropTypes from 'prop-types';

import Store from '@univision/fe-commons/dist/store/store';
import { getTheme } from '@univision/fe-commons/dist/store/storeHelpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';
import BackgroundImage from '@univision/fe-components-base/dist/components/BackgroundImage';
import Loading from '@univision/fe-components-base/dist/components/Loading';

import Styles from './Placeholder.scss';

/**
 * Inline slideshow placeholder
 * @param {string} title Slideshow title
 * @param {Object} image Promo image
 * @returns {XML}
 * @constructor
 */
const Placeholder = ({ title, image }) => {
  return (
    <FullWidth breakpoints={['xxs', 'xs']}>
      <div className={Styles.container}>
        <h2>{title}</h2>
        <div className={Styles.imageContainer}>
          <BackgroundImage
            className={Styles.image}
            image={image}
          />
          <div className={Styles.loaderContainer}>
            <Loading
              label={localization.get('loadingGallery')}
              className={Styles.loader}
              theme={getTheme(Store)}
              svg
            />
          </div>
        </div>
      </div>
    </FullWidth>
  );
};

Placeholder.propTypes = {
  image: PropTypes.object,
  title: PropTypes.string,
};

export default Placeholder;
/**
 * Returns the placeholder as a function
 * @param {Object} data Placeholder data
 * @constructor
 */
export const PlaceholderAsFunction = (data) => {
  return () => (<Placeholder {...data} />);
};
