import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';

import Button from '../Button';

import Styles from './RefreshButton.scss';
/**
 * Refreh button component.
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const RefreshButton = ({
  onClick,
  children,
  theme,
  position,
  className,
}) => {
  const primaryColor = getKey(theme, 'primary');
  return (
    <Button
      className={classnames(className, Styles.refreshButton, {
        [Styles.top]: position === 'top',
      })}
      onClick={onClick}
      style={primaryColor ? { background: primaryColor } : {}}
    >
      {children}
    </Button>
  );
};

/**
 * propTypes
 * @property {Object} icon - Icon component
 * @property {String} message - Refresh message
 * @property {Function} onClick Click Handler to invoke when button is clicked
 * @property {String} type Defines what type of button to render
 */
RefreshButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  theme: PropTypes.object,
  position: PropTypes.string,
  className: PropTypes.string,
};

/**
 * Update label component
 * @param {Object} props React Props for this component
 * @constructor
 */
const RefreshLabel = ({ children }) => (
  <Fragment>
    <span className={Styles.icon}>
      <Icon name="liveblogComment" size="small" fill={WHITE} />
    </span>
    {children}
    <span className={classnames(Styles.label, 'uvs-font-a-bold')}>
      {localization.get('newUpdates')}
    </span>
    <div className={Styles.refresh}>
      <span>{localization.get('refresh')}</span>
      <Icon name="arrowUp" size="medium" fill={WHITE} />
    </div>
  </Fragment>
);

/**
 * propTypes
 * @property {Object} icon - Icon component
 * @property {String} message - Refresh message
 * @property {Function} onClick Click Handler to invoke when button is clicked
 * @property {String} type Defines what type of button to render
 */
RefreshLabel.propTypes = {
  children: PropTypes.node,
};

export { RefreshButton as default, RefreshLabel };
