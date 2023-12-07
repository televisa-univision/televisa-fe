import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import BackgroundImage from '@univision/fe-components-base/dist/components/BackgroundImage';
import TapTooltip from '@univision/fe-components-base/dist/components/TapTooltip';
import Truncate from '@univision/fe-components-base/dist/components/Truncate';
import * as ratios from '@univision/fe-components-base/dist/components/Picture/aspectRatios';

import SlideHeader from './SlideHeader';

import Styles from './LeadSlide.scss';
import GeneralStyles from '../HorizontalSlideshow.scss';
import { getFadeAnimationClassName } from '../helpers';

/**
 * Lead slide for Horizontal Slideshow mobile
 * @param {Object} props component props
 * @returns {*}
 * @constructor
 */
const LeadSlide = (props) => {
  const {
    desc,
    endSlideNumber,
    image,
    meta,
    reaction,
    renderSimpleStatus,
    showContent,
    title,
  } = props;

  return (
    <div className={Styles.wrapper}>
      <BackgroundImage
        image={image}
        className={Styles.image}
        aspectRatio={ratios.ASPECT_RATIO_3X4}
        gradient
      />
      <div className={`row no-gutters ${Styles.headerWrapping}`}>
        <SlideHeader
          className={getFadeAnimationClassName({ showContent })}
          meta={meta}
          title={title}
        />
        <div className={`uvs-container ${Styles.bottomContainer}`}>
          <TapTooltip className={Styles.TapTooltip} />
          {reaction && <div className={Styles.reactionStatus}>{`0 de ${endSlideNumber}`}</div>}
          <div
            className={classnames(
              Styles.truncateContainer,
              getFadeAnimationClassName({ showContent }),
            )}
          >
            {renderSimpleStatus && renderSimpleStatus({
              className: GeneralStyles.simpleStatus,
              isLead: true,
            })}
            <Truncate
              className={GeneralStyles.slideDescription}
              text={desc}
              trimLength={120}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * propTypes
 * @property {string | array} desc Slide description
 * @property {number} endSlideNumber Number of the final slide
 * @property {Object} image The image object with renditions
 * @property {Object} meta Meta data from this content (Author, date, source and sponsor)
 * @property {array} meta.author Author list
 * @property {string} meta.date Published date of slideshow if any
 * @property {Object} meta.source Credits for the slideshow
 * @property {Object} meta.sponsor Link, Logo and name from the sponsor
 * @property {Object} reaction The reaction slideshow data object
 * @property {function} renderSimpleStatus Renders status component for the slideshow
 * @property {boolean} showContent Determines if full screen mode is enabled for the slideshow
 * @property {string} title The slideshow title
 */
LeadSlide.propTypes = {
  desc: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  endSlideNumber: PropTypes.number,
  image: PropTypes.object,
  meta: PropTypes.shape({
    author: PropTypes.array,
    date: PropTypes.string,
    source: PropTypes.string,
    sponsor: PropTypes.shape({
      link: PropTypes.string,
      logo: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
  reaction: PropTypes.object,
  renderSimpleStatus: PropTypes.func,
  showContent: PropTypes.bool,
  title: PropTypes.string,
};

export default LeadSlide;
