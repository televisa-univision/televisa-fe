import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Styles from './TapTooltip.scss';

/**
 * Tap Tooltip Component
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const TapTooltip = (props) => {
  const { description, className, iconName } = props;
  return (
    <div className={
      classnames(
        Styles.show,
        Styles.tapTooltip,
        className
      )}
    >
      <Icon name={iconName} className={Styles.icon} size="xsmall" />
      <span>{description}</span>
    </div>
  );
};

/**
 * propTypes
 * @property {String} class Class name of the element
 * @property {String} description Description to show
 * @property {Number} timeDuration tooltip duration
 */
TapTooltip.propTypes = {
  className: PropTypes.string,
  iconName: PropTypes.string,
  description: PropTypes.string,
};

/**
 * propTypes
 * @property {String} description Description to show
 * @property {Number} timeDuration
 */
TapTooltip.defaultProps = {
  className: '',
  iconName: 'hand',
  description: localization.get('slideToStart'),
};

export default TapTooltip;
