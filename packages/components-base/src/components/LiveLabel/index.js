import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { hasKey, getKey, exists } from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Icon from '@univision/fe-icons/dist/components/Icon';

import Styles from './LiveLabel.scss';
import LiveIcon from '../LiveIcon';
import supportedLiveLabels from './data/config.json';

/**
 * Live Label
 * Displays labels for "live" content types
 * @param {bool} authRequired If should be show the auth icon
 * @param {bool} blink Controls blink animation
 * @param {string} className Modifier class
 * @param {string} icon Icon to display in label
 * @param {string} iconSize Size of icon to display
 * @param {string} position Label positioning
 * @param {string} size Label sizing
 * @param {string} type Content type
 * @param {string} leadType Content lead type
 * @param {string} videoType Content type
 * @param {string} view type where the label is being put at
 * @returns {JSX}
 */
const LiveLabel = ({
  authRequired,
  blink,
  className,
  hasGradient,
  icon,
  iconSize,
  isCondensed,
  position,
  size,
  type,
  leadType,
  videoType,
  view,
}) => {
  const labelType = getKey(supportedLiveLabels, type) || getKey(supportedLiveLabels, leadType);
  const hasVideoLabel = hasKey(supportedLiveLabels, videoType);
  const hasTypeLabel = exists(labelType);
  // Boolean to know whether to render the label or not
  const showLabel = hasTypeLabel || hasVideoLabel;
  const name = hasVideoLabel ? localization.get(videoType) : localization.get(labelType);
  // Does it come from a vertical view
  const isVertical = view !== 'horizontal';

  // No need to render anything if neither the label or the key icon are required
  if (!showLabel && !authRequired) {
    return null;
  }

  return (
    <Fragment>
      {showLabel && (
      <div
        className={classnames('uvs-font-a-bold', Styles.container, className, {
          [Styles[position]]: position,
          [Styles[size]]: size,
          [Styles[type]]: type,
        })}
      >
        <div className={classnames(Styles.liveLabel, hasGradient && Styles.hasGradient)}>
          <LiveIcon
            className={classnames({ [Styles[`${size}Icon`]]: size })}
            name={icon}
            size={iconSize}
            blink={blink}
          />
          <span className={classnames(isCondensed ? 'uvs-font-c-regular' : 'uvs-font-a-bold')}>{name}</span>
        </div>
        {authRequired && isVertical && (
        <div className={Styles.authCont}>
          <Icon className={`${Styles.icon} ${Styles.auth}`} variant="light" name="key" size={iconSize} />
        </div>
        )}
      </div>
      )}
    </Fragment>
  );
};

LiveLabel.propTypes = {
  authRequired: PropTypes.bool,
  blink: PropTypes.bool,
  className: PropTypes.string,
  hasGradient: PropTypes.bool,
  isCondensed: PropTypes.bool,
  icon: PropTypes.string,
  iconSize: PropTypes.oneOfType([
    PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'bars']),
    PropTypes.number,
  ]),
  position: PropTypes.oneOf(['topLeft', 'topRight', 'center', 'bottomRight', 'bottomLeft']),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'extralarge']),
  type: PropTypes.string,
  leadType: PropTypes.string,
  videoType: PropTypes.string,
  view: PropTypes.oneOf([
    'horizontal', 'vertical', 'list',
  ]),
};

LiveLabel.defaultProps = {
  authRequired: false,
  blink: true,
  icon: 'dot',
  iconSize: 'small',
  position: 'topLeft',
  size: 'small',
  view: 'vertical',
};

export default LiveLabel;
