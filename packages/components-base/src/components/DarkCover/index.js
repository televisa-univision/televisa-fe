import React from 'react';
import PropTypes from 'prop-types';
import BackgroundImage from '../BackgroundImage';

import Styles from './DarkCover.scss';

/**
 * DarkCover base component.
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const DarkCover = (props) => {
  const {
    image, overrideImageUrl, className, children,
  } = props;
  return (
    <div className={`${Styles.wrapper} ${className}`}>
      {(image || overrideImageUrl) && (
        /**
         * Order of props on BackgroundImage matters.
         * Flip them and we will chop off your hands!
         */
        <BackgroundImage {...props} className={Styles.darkCover} />
      )}
      {children}
    </div>
  );
};

/**
 * propTypes
 * @property {String} image to be used as background
 */
DarkCover.propTypes = {
  image: PropTypes.object,
  overrideImageUrl: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  device: PropTypes.string,
};

DarkCover.defaultProps = {
  className: '',
  device: 'mobile',
};

export default DarkCover;
