import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import getRenditionUrl
  from '@univision/fe-commons/dist/utils/images/renditions';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import { NEWS } from '@univision/fe-commons/dist/constants/pageCategories';
import LiveStream from '@univision/fe-video/dist/components/LiveStream';
import { SQUARE_CARD_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/squareCard';

import Picture from '../../../../Picture';
import Link from '../../../../Link';
import Styles from './SquareLivestream.styles';

const Wrapper = styled.div`
  ${Styles.wrapper}
`;
const LivestreamImageLink = styled(Link)`
  ${Styles.livestreamImageLink}
`;
const Filter = styled('div')`
  ${Styles.filter}
`;

/**
 * Live stream Card
 * @param {!Object} props - Props for this component
 * @param {bool} [props.active] - Live stream is active
 * @param {bool} [props.auth] - Live stream has auth
 * @param {string} [props.className] - Class name override
 * @param {bool} [props.enableDai] - Should this live stream enable DAI
 * @param {Object} [props.image] - Live stream image
 * @param {bool} [props.isSecondaryContent] - if it is secondary content on grid don't play inline
 * @param {string} [props.livestreamId] - Live stream id
 * @param {string} [props.mainImage] - Live stream main promo image
 * @param {string} [props.playerType] - Player type
 * @param {Object} [props.primaryTag] - Primary tag
 * @param {Object} [props.size] - the size of the card
 * @param {style} [props.style] - Styles override
 * @param {string} [props.title] - Live stream title
 * @param {string} [props.tvssUrl] - The tvssUrl
 * @param {string} [props.uri] - Live streams uri
 * @returns {JSX}
 */
const SquareLivestream = ({
  active,
  adSettings: {
    disableVideoAds,
  } = {},
  auth,
  className,
  enableDai,
  image,
  isDigitalChannelLiveStream,
  isSecondaryContent,
  livestreamId,
  mainImage,
  playerType,
  primaryTag,
  size,
  style,
  title,
  trackClick,
  tvssUrl,
  uri,
  vertical,
}) => {
  return (
    <Wrapper className={className} style={style} size={size}>
      {(active && !auth && !isSecondaryContent) ? (
        <LiveStream
          disableVideoAds={disableVideoAds}
          image={image}
          isActive={active}
          isAuth={auth}
          isNewsDigitalChannel={isDigitalChannelLiveStream && vertical?.toLowerCase() === NEWS}
          livestreamId={livestreamId}
          mainImage={mainImage}
          playerType={playerType}
          primaryTag={primaryTag}
          title={title}
          tvssUrl={tvssUrl}
          uri={uri}
          enableDai={enableDai}
        />
      ) : (
        <LivestreamImageLink useExplicitNavigation href={uri} onClick={trackClick}>
          <Picture
            alt={title}
            image={image}
            overrideImageUrl={getRenditionUrl(
              getKey(image, 'renditions.original', {}),
              SQUARE_CARD_RATIOS[size]
            )}
          />
          <Filter />
        </LivestreamImageLink>
      )}
    </Wrapper>
  );
};

SquareLivestream.propTypes = {
  active: PropTypes.bool,
  adSettings: PropTypes.object,
  auth: PropTypes.bool,
  className: PropTypes.string,
  enableDai: PropTypes.bool,
  image: PropTypes.shape({
    credit: PropTypes.string,
    renditions: PropTypes.object,
  }),
  isDigitalChannelLiveStream: PropTypes.bool,
  isSecondaryContent: PropTypes.bool,
  livestreamId: PropTypes.string,
  mainImage: PropTypes.string,
  playerType: PropTypes.string,
  primaryTag: PropTypes.object,
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  title: PropTypes.string,
  trackClick: PropTypes.func,
  tvssUrl: PropTypes.string,
  uri: PropTypes.string,
  vertical: PropTypes.string,
};

SquareLivestream.defaultProps = {
  isDigitalChannelLiveStream: false,
  isSecondaryContent: false,
};

export default SquareLivestream;
