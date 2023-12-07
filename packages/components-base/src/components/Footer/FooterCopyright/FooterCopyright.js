import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import FullWidth from '../../FullWidth';
import Styles from './FooterCopyright.scss';

/**
 * create default copyright footer
 * @param {boolean} isUSLocation show other pages
 * @returns {JSX}
 */
const createDefaultCopyright = (isUSLocation) => {
  if (!isUSLocation) {
    return (
      <>
        Derechos Reservados © Televisa S. de R.L. de C.V. <br className={Styles.break} />
        TELEVISA y el logotipo de TELEVISA son marcas registradas.
      </>
    );
  }
  return (
    <>
      Copyright. © {new Date().getFullYear()}.<br className={Styles.break} /> Univision
      Communications Inc.<br className={Styles.break} /> Todos Los Derechos Reservados.
    </>
  );
};

/**
 * A text with the current yaer for the copyright the footer
 * @returns {JSX}
 */
const FooterCopyright = ({ footerCopyright, themeVariant, isUSLocation }) => {
  return (
    <FullWidth breakpoints={['xxs', 'xs']}>
      <div
        className={classnames('row no-gutters', Styles.footerCopyright, {
          [Styles.light]: themeVariant === 'light',
        })}
      >
        <div className="col-sm">
          {footerCopyright || createDefaultCopyright(isUSLocation)}
        </div>
      </div>
    </FullWidth>
  );
};

FooterCopyright.propTypes = {
  footerCopyright: PropTypes.string,
  themeVariant: PropTypes.string.isRequired,
  isUSLocation: PropTypes.bool,
};

FooterCopyright.defaultProps = {
  isUSLocation: true,
};

export default FooterCopyright;
