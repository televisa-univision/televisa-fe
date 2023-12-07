import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import truncateString from '@univision/fe-utilities/helpers/string/truncateString';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { RADIO } from '@univision/fe-commons/dist/constants/labelTypes';
import { WHITE } from '@univision/fe-utilities/styled/constants';
import { PODCAST_SERIES_CARD_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/podcastCard';
import Icon from '@univision/fe-icons/dist/components/Icon';
import PlayStationButton from '@univision/fe-local/dist/components/connected/PlayStationButton/PlayStationButton';

import BackgroundImage from '../../../../BackgroundImage';
import Link from '../../../../Link';
import Title from '../../../../Title';
import Styles from './SquareRadio.styles';
import Picture from '../../../../Picture';
import Button from '../../../../Button';
import Label from '../../../../Label';

const MAX_LENGTH = 100;
const Wrapper = styled.div`
  ${Styles.wrapper}
`;
const RadioContainer = styled.article`
  ${Styles.radioContainer}
`;
const RadioLabelWrapper = styled.div`
  ${Styles.radioLabelWrapper}
`;
const RadioLabel = styled(Label)`
  ${Styles.radioLabel}
`;
const RadioContent = styled.div`
  ${Styles.radioContent}
`;
const RadioDescription = styled(Link).attrs({ className: 'uvs-font-a-light' })`
  ${Styles.radioDescription}
`;
const TitleStyled = styled(Title)`
  ${Styles.title}
`;
const RadioCTA = styled(Link).attrs({ className: 'uvs-font-c-regular' })`
  ${Styles.radioCta}
`;
const RadioMedia = styled.div`
  ${Styles.radioMedia}
`;
const RadioPictureOverlay = styled.div`
  ${Styles.radioPictureOverlay}
`;
const RadioLogo = styled.div`
  ${Styles.radioLogo}
`;
const RadioLogoImage = styled.img`
  ${Styles.radioLogoImage}
`;
const RadioPlayButton = styled(Button)`
  ${Styles.radioPlayButton}
`;
const RadioMediaMargin = styled.div`
  ${Styles.radioMediaMargin}
`;

/**
 * SquareRadio
 * @param {Object} props component props
 * @param {Object} [props.abacast] radio station information such as ID, name etc
 * @param {Object} [props.alternativeLogo] - radio station logo renditions
 * @param {string} [props.description] - radio station text description
 * @param {Object} [props.image] - renditions for background and card
 * @param {number} [props.nowPlayingId] - ID to fetch song/audio information
 * required for pip player
 * @param {string} [props.title] - main title
 * @param {string} [props.trackClick] - the tracking function
 * @param {string} [props.uid] - unique content ID from BEX
 * @param {string} [props.uri] - radio station URL
 * @param {Object} [props.theme] - the current theme
 * @returns {JSX}
 */
const SquareRadio = ({
  abacast,
  alternativeLogo,
  description,
  image,
  size,
  title,
  trackClick,
  theme,
  uid,
  uri,
  ...rest
}) => {
  return (
    <Wrapper size={size}>
      <BackgroundImage
        absolute
        aspectRatio={PODCAST_SERIES_CARD_RATIOS[size]}
        blur
        image={image}
        overrideImageUrl={getRenditionUrl(getKey(image, 'renditions.original', {}),
          PODCAST_SERIES_CARD_RATIOS[size])}
      />
      <RadioContainer size={size}>
        <RadioLabelWrapper>
          <RadioLabel
            label={localization.get('radio')}
            type={RADIO}
            size={size}
          />
        </RadioLabelWrapper>
        <RadioContent size={size}>
          <TitleStyled
            titleSize={size}
          >
            <Link
              useExplicitNavigation
              className="uvs-font-a-regular"
              href={uri}
              onClick={trackClick}
            >
              {truncateString(title, { maxChars: MAX_LENGTH, checkFeature: false })}
            </Link>
          </TitleStyled>
          <RadioDescription size={size} href={uri} onClick={trackClick} useExplicitNavigation>
            {truncateString(description, { maxChars: MAX_LENGTH, append: '...', onlyFullWords: true })}
          </RadioDescription>
        </RadioContent>
        <RadioMediaMargin size={size}>
          <RadioMedia>
            <Picture
              alt={title}
              image={image}
              overrideImageUrl={getRenditionUrl(
                getKey(image, 'renditions.original', {}),
                PODCAST_SERIES_CARD_RATIOS[size]
              )}
            />
            <RadioPictureOverlay />
            <RadioLogo>
              <RadioLogoImage
                alt={title}
                src={getKey(alternativeLogo, 'renditions.original.href', '')}
              />
            </RadioLogo>
            <PlayStationButton
              abacast={abacast}
              alternativeLogo={alternativeLogo}
              type={'plain'}
              uid={uid}
              uri={uri}
              image={image}
              stationTitle={title}
              {...rest}
            >
              <RadioPlayButton>
                <Icon name="playnocircleLegacy" size="xxsmall" fill={WHITE} />
              </RadioPlayButton>
            </PlayStationButton>
          </RadioMedia>
        </RadioMediaMargin>
        <RadioCTA size={size} href={uri} onClick={trackClick} useExplicitNavigation>
          {localization.get('goToStation')}
          <Icon name="arrowRight" size={22} fill={WHITE} />
        </RadioCTA>
      </RadioContainer>
    </Wrapper>
  );
};

SquareRadio.propTypes = {
  abacast: PropTypes.object,
  alternativeLogo: PropTypes.object,
  description: PropTypes.string.isRequired,
  image: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    caption: PropTypes.string,
    credit: PropTypes.string,
    renditions: PropTypes.object.isRequired,
  }).isRequired,
  nowPlayingId: PropTypes.number,
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  title: PropTypes.string.isRequired,
  theme: PropTypes.object,
  trackClick: PropTypes.func,
  uid: PropTypes.string,
  uri: PropTypes.string.isRequired,
};

export default SquareRadio;
