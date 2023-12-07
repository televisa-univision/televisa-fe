import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getKey from '@univision/fe-utilities/helpers/object/getKey';
import stripHtmlTags from '@univision/fe-utilities/helpers/string/stripHtmlTags';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';

import { SHOW_CARD_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/showCard';
import Image from '../../../../Image';
import Link from '../../../../Link';
import Styles from './SquareShow.styles';
import Picture from '../../../../Picture';

const AirTime = styled.div.attrs({ className: 'uvs-font-c-regular' })`
  ${Styles.airTime}
`;
const Background = styled(Picture)`
  ${Styles.background}
`;
const BackgroundOverlay = styled.div`
  ${Styles.backgroundOverlay}
`;
const BackgroundWrapper = styled.div`
  ${Styles.backgroundWrapper}
`;
const Description = styled.div.attrs({ className: 'uvs-font-a-light' })`
  ${Styles.description}
`;
const Logo = styled(Link).attrs({ className: 'uvs-font-b-bold' })`
  ${Styles.logo}
`;
const LogoImage = styled(Image)`
  ${Styles.logoImage}
`;
const ShowInfo = styled.div`
  ${Styles.showInfo}
`;
const Wrapper = styled.div`
  ${Styles.wrapper}
`;
const LinkStyled = styled(Link)`
  ${Styles.linkStyled}
`;

/**
 * Square Show
 * @param {!Object} props - component props
 * @param {string} [props.airTime] - the show air time
 * @param {string} [props.description] - the show description
 * @param {Object} [props.headerLogo] - the show logo
 * @param {Object} [props.showCardArtwork] - the show artwork
 * @param {function} [props.trackClick] - the tracking function
 * @param {string} [props.uri] - the show uri
 * @returns {JSX}
 */
const SquareShow = ({
  airTime,
  description,
  headerLogo,
  showCardArtwork,
  size,
  trackClick,
  uri,
}) => {
  const imageRatio = SHOW_CARD_RATIOS[size];
  return (
    <Wrapper>
      <BackgroundWrapper size={size} onClick={trackClick}>
        <Background
          image={showCardArtwork}
          overrideImageUrl={getRenditionUrl(getKey(showCardArtwork, 'renditions.original', {}), imageRatio)}
          overrideImageBounds={imageRatio}
          size={size}
        />
        <Link useExplicitNavigation href={uri}><BackgroundOverlay size={size} /></Link>
      </BackgroundWrapper>
      <ShowInfo size={size}>
        <Logo useExplicitNavigation href={uri} size={size} onClick={trackClick}>
          <LogoImage
            src={getKey(headerLogo, 'renditions.original.href')}
            size={size}
          />
        </Logo>
        <AirTime size={size}>{airTime}</AirTime>
        <Description size={size}>
          <LinkStyled
            href={uri}
            onClick={trackClick}
            size={size}
            useExplicitNavigation
          >
            {stripHtmlTags(description)}
          </LinkStyled>
        </Description>
      </ShowInfo>
    </Wrapper>
  );
};

SquareShow.propTypes = {
  airTime: PropTypes.string,
  description: PropTypes.string,
  headerLogo: PropTypes.shape({
    renditions: PropTypes.shape({
      original: PropTypes.shape({
        href: PropTypes.string,
      }),
    }),
  }),
  showCardArtwork: PropTypes.shape({
    renditions: PropTypes.object,
  }),
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  trackClick: PropTypes.func,
  uri: PropTypes.string,
};

export default SquareShow;
