/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from 'styled-components';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { getDurationString } from '@univision/fe-commons/dist/utils/helpers/dateTimeUtils';
import { exists } from '@univision/fe-commons/dist/utils/helpers';

import ContentCard from '@univision/fe-components-base/dist/components/ContentCard';
import * as sizes from '@univision/fe-components-base/dist/components/Picture/imageSizes';
import { getPlaceholderImage } from '../../../../helpers';

import Styles from './PlaylistContentCard.scss';
import StyledComponent from './PlaylistContentCard.styles';


const WrapperStyled = styled.div`${StyledComponent.playlistContentCard}`;

/**
 * @deprecated
 * ContentCard with a few extra bells & whistles for Video playlist implementation
 * @param {Pbkect} props component props
 * @returns {JSX} the view
 */

/* istanbul ignore next */
const PlaylistContentCard = (props) => {
  const {
    className,
    longform,
    content,
    index,
    isCurrentItem,
    isAnchor,
    isNewsDigitalChannel,
    onClick,
    playlistView,
    refCallback,
    showBtnLongform,
    useShortTitle,
    variant,
    view,
    widgetContext,
    tagVideo,
    verticalVideo,
  } = props;
  const overlay = (
    <div className={Styles.overlay}>
      {localization.get('youAreWatching')}
    </div>
  );
  const duration = getDurationString(content.duration);
  content.uri = null;

  const title = useShortTitle ? content.shortTitle : content.title;
  let { image } = content;
  if (typeof image === 'string' && image.indexOf('uvnimg.com') !== -1) {
    image = { renditions: { original: { href: image } } };
  }

  const deviceSizeOverrides = {
    xl: sizes.XXX_SMALL,
    lg: sizes.XXX_SMALL,
    md: sizes.XXX_SMALL,
    sm: sizes.XXX_SMALL,
    xsm: sizes.XXX_SMALL,
  };

  return (
    <WrapperStyled
      className={classnames(Styles.playlistContentCard, {
        [Styles.horizontal]: exists(playlistView),
        [Styles.currentItem]: isCurrentItem,
      })}
      isAnchor={isAnchor}
      isNewsDigitalChannel={isNewsDigitalChannel}
      variant={variant}
    >
      <ContentCard
        {...content}
        className={classnames(
          Styles.playlistCard,
          Styles[variant],
          { [Styles.active]: isCurrentItem },
          { [Styles[`${playlistView}PlaylistView`]]: typeof playlistView !== 'undefined' },
          className
        )}
        description={null}
        deviceSizeOverrides={deviceSizeOverrides}
        duration={duration}
        forceAspectRatio
        hideIcon
        image={image}
        isAnchor={isAnchor}
        labelSize="small"
        longform={longform}
        onClick={() => onClick(index)}
        onImageError={getPlaceholderImage}
        overlay={isCurrentItem && overlay}
        preloadImage={false}
        refCallback={refCallback}
        showBtnLongform={showBtnLongform}
        showTag={false}
        showIcon={!isCurrentItem || showBtnLongform}
        showInPlaylist
        title={title}
        type="video"
        variant={variant}
        view={view}
        widgetContext={widgetContext}
        tag={tagVideo}
        tagVertical={verticalVideo}
      />
    </WrapperStyled>
  );
};

PlaylistContentCard.propTypes = {
  className: PropTypes.string,
  content: PropTypes.object.isRequired,
  index: PropTypes.number,
  isAnchor: PropTypes.bool,
  isCurrentItem: PropTypes.bool,
  isNewsDigitalChannel: PropTypes.bool,
  longform: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  playlistView: PropTypes.string,
  refCallback: PropTypes.func,
  showBtnLongform: PropTypes.bool,
  tagVideo: PropTypes.string,
  useShortTitle: PropTypes.bool,
  variant: PropTypes.oneOf(['light', 'dark']),
  verticalVideo: PropTypes.string,
  view: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  widgetContext: PropTypes.object,
};

PlaylistContentCard.defaultProps = {
  isNewsDigitalChannel: false,
  useShortTitle: false,
  variant: 'light',
};

export default PlaylistContentCard;
