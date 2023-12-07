import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Image from '@univision/fe-components-base/dist/components/Image';

import Styles from './BrandingBar.scss';

/**
 * BrandingBar component.
 * @param {string} className Custom css class.
 * @returns {JSX}
 * @constructor
 */
const BrandingBar = ({ className }) => (
  <div className={classnames(Styles.branding, className)}>
    <Image src="https://st1.uvnimg.com/8b/dc/f30aeb8f47b6b59ae60a9a8efb7a/logo-ventana-al-tiempo.svg" alt="Venta al tiempo" />
  </div>
);

BrandingBar.propTypes = {
  className: PropTypes.string,
};

export default BrandingBar;
