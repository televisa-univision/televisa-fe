import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import svgIndicator from '@univision/fe-commons/dist/assets/images/loader.svg';

import Description from '../Description';

import Styles from './Loading.scss';

/**
 * Loading component
 * @param {Object} props component props
 * @returns {jsx}
 */
const Loading = ({
  theme, label, size, className, svg,
}) => {
  return (
    <div className={classnames(Styles.loader, className)}>
      {!svg && (
        <div
          className={`${Styles.spinner} ${Styles[size]}`}
          style={{ borderTopColor: theme?.primary, borderLeftColor: theme?.primary }}
        />
      )}
      {svg && <img alt="Loading" src={svgIndicator} className={Styles.loadingIndicator} />}
      {label && (
        <Description size="small" className={classnames({ [Styles.withSvg]: svg })}>
          {label}
        </Description>
      )}
    </div>
  );
};

Loading.propTypes = {
  theme: PropTypes.object,
  label: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  svg: PropTypes.bool,
};

Loading.defaultProps = {
  size: 'large',
  className: '',
  svg: false,
};

export default Loading;
