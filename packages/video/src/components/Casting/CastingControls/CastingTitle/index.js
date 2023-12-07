import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import localization from '@univision/fe-utilities/localization';
import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import Link from '@univision/fe-components-base/dist/components/Link';

import CastingBadge from '../CastingBadge';

import castingTypes, {
  castingLabels,
} from '../CastingControls.config';
import Styles from './CastingTitle.styles';

const TitleWrapper = styled.div`${Styles.titleWrapper}`;
const TitleContent = styled.div`${Styles.titleContent}`;
const TitleMarquee = styled.div`${Styles.titleMarquee}`;
const TitleCap = styled.div`${Styles.titleCap}`;
const LinkStyled = styled(Link)`${Styles.advertisementLink}`;
const AdCopy = styled.div`${Styles.adCopy}`;

/**
 * Casting Title Component
 * @param {Object} props - component props
 * @param {string} [props.adDuration] - the duration of the currentAd
 * @param {string} [props.advertisementUrl] - the url for the advertisement
 * @param {string} [props.currentAd] - the current ad id playing
 * @param {bool} [props.isMobile = false] - true if in mobile
 * @param {string} [props.title] - true if controls are expanded
 * @param {string} [props.totalAds] - the total number of ads on the video
 * @param {string} [props.type] - the type of video that is casting
 * @returns {JSX}
 */
const CastingTitle = ({
  adDuration,
  advertisementUrl,
  currentAd,
  isMobile,
  title,
  totalAds,
  type,
}) => {
  if (!isValidValue(title)) {
    return null;
  }

  const isAdvertisement = type === castingTypes.ADVERTISING;
  const hasAds = isValidValue(currentAd) && isValidValue(totalAds);
  const hasAdDuration = isValidValue(adDuration);

  return (
    <TitleWrapper>
      {isMobile && (
        <CastingBadge type={type} />
      )}
      {isAdvertisement && (
        <AdCopy>
          {!isMobile && `${localization.get(castingLabels.AD)} `}
          {hasAds && `${localization.get(castingLabels.ONE_OF, { locals: { current: currentAd, total: totalAds } })}`}
          {hasAdDuration && ` : (${adDuration})`}
        </AdCopy>
      )}
      <TitleContent>
        {isMobile && <TitleCap isLeft />}
        <TitleMarquee isMobile={isMobile}>
          {isAdvertisement ? (
            <>
              {isValidValue(advertisementUrl) && (
                <LinkStyled href={advertisementUrl}>
                  {localization.get(castingLabels.MORE_INFORMATION)}
                </LinkStyled>
              )}
            </>
          ) : title}
        </TitleMarquee>
        {isMobile && <TitleCap />}
      </TitleContent>
    </TitleWrapper>
  );
};

CastingTitle.propTypes = {
  advertisementUrl: PropTypes.string,
  adDuration: PropTypes.string,
  currentAd: PropTypes.string,
  isMobile: PropTypes.bool,
  title: PropTypes.string,
  totalAds: PropTypes.string,
  type: PropTypes.string,
};

export default CastingTitle;
