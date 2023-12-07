import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import { getDurationString } from '@univision/fe-commons/dist/utils/helpers/dateTimeUtils';
import Icon from '@univision/fe-icons/dist/components/Icon';

import Styles from './DurationLabel.scss';

/**
 * DurationLabel - Displays a label with the duration of a video
 * @param {string} className of custom style to be applied
 * @param {string} duration of video
 * @param {string} position of the duration label
 * @param {string} size of the duration label
 * @param {string} variant the variant name (dark|light)
 * @param {string} showIcon of show icon play
 * @returns {JSX}
 */
const DurationLabel = ({
  className,
  /**
   * We pass the entire props object from the parent component
   * in order to destructure one of two possible duration props:
   *
   * 1. `duration` is passed from video components,
   *    which receive their data from the Video SDK
   *
   * 2. `durationString` is returned directly from the Web API
   *    for widgets on section pages to consume and use
   */
  contentProps,
  position,
  size,
  variant,
  showIcon,
  iconSize,
}) => {
  const duration = getKey(contentProps, 'duration', getKey(contentProps, 'durationString', null));
  const durationText = getDurationString(duration);
  const inPlaylist = contentProps?.showInPlaylist;

  if (!durationText) return null;
  return (
    <div
      className={classnames(
        'uvs-font-a-regular',
        'uvs-duration',
        Styles.durationLabel,
        {
          [Styles.showInPlaylist]: inPlaylist,
          [Styles[position]]: position,
          [Styles[size]]: size,
          [Styles.light]: variant === 'light',
        },
        className
      )}
    >
      {showIcon && (
        <Icon
          name="playnocircle"
          size={iconSize}
          variant={variant === 'dark' && 'light'}
          className={classnames(
            Styles.playIcon,
            {
              [Styles.hideIcon]: contentProps.hideIcon,
            }
          )}
        />
      )}
      <span className={Styles.durationText}>{durationText}</span>
    </div>
  );
};

/**
 * DurationLabel defaultProps
 * @param {String} iconSize current size for the svg icon
 */
DurationLabel.propTypes = {
  className: PropTypes.string,
  contentProps: PropTypes.object,
  position: PropTypes.oneOf(['topLeft', 'topRight', 'bottomRight', 'bottomLeft', 'relative']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  showIcon: PropTypes.bool,
  variant: PropTypes.string,
  iconSize: PropTypes.oneOfType([
    PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'extraLarge']),
    PropTypes.number,
    PropTypes.array,
  ]),
};

DurationLabel.defaultProps = {
  contentProps: null,
  position: 'bottomRight',
  size: 'medium',
  variant: 'dark',
  showIcon: true,
  iconSize: 'xxsmall',
};

export default DurationLabel;
