import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Picture from '@univision/fe-components-base/dist/components/Picture';
import { isValidFunction, truncateString } from '@univision/fe-commons/dist/utils/helpers';

import Styles from './NextSlideshowClue.scss';

/**
 * Renders clue for the upcoming slideshow when horizontal slideshows are stitched together
 * @param {Object} props component props
 * @param {string} props.className component className
 * @param {string} props.title slideshow title
 * @param {Object} props.image the main slideshow image
 * @param {function} props.onClick onClick handler
 * @returns {JSX}
 */
const NextSlideshowClue = ({
  title,
  image,
  onClick,
  className,
}) => {
  const classNames = classnames(Styles.container, {
    [className]: className,
  });
  const titleClassNames = classnames(Styles.slideshowTitle, Styles.clampText);

  return (
    <div
      className={classNames}
      tabIndex={0}
      role="button"
      onClick={isValidFunction(onClick) ? onClick : null}
    >
      <span className={Styles.nextGalleryTitle}>{LocalizationManager.get('nextGallery')}</span>
      <Picture alt={title} image={image} />
      <span className={titleClassNames}>{truncateString(title, 40, '…', true, false)}</span>
    </div>
  );
};

NextSlideshowClue.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    caption: PropTypes.string,
    credit: PropTypes.string,
    renditions: PropTypes.object.isRequired,
  }),
  onClick: PropTypes.func,
};

NextSlideshowClue.defaultProps = {
  className: '',
  title: '',
  image: {},
};

export default NextSlideshowClue;
