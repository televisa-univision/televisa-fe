/**
 * @module PrendeTV Hero
 */
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import BaseLink from '@univision/fe-components-base/dist/components/Link';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';

import { setContentTracking, setPrendeTVCookie } from '../../../utils';
import { PRODUCT_LINKS } from '../../../constants';

import Styles from './Hero.styles';

const Wrapper = styled.div`${Styles.wrapper}`;
const InnerWrapper = styled.div`${Styles.innerWrapper}`;
const HeroImage = styled.img`${Styles.image}`;
const Title = styled.h1`${Styles.title}`;
const SubTitle = styled.h2`${Styles.subHeadline}`;
const Text = styled.h3`${Styles.text}`;
const AppStoreLinks = styled.div`${Styles.storeLinks}`;
const StoreImage = styled.img`${Styles.storeImage}`;
const Platforms = styled.div`${Styles.platforms}`;
const PlatformImage = styled.img`${Styles.platformImage}`;
const Link = styled(BaseLink)`${Styles.link}`;
const Gradient = styled.div`${Styles.gradient}`;

/**
 * Prende TV Hero Art Promo Card Type.
 * @param {Object} props - initial props of the component
 * @property {array} props.appStoreLinks - links to app store
 * @property {bool} props.bottomImage - image placed at the bottom or the top
 * @property {string} props.device - user platform, mobile, desktop
 * @property {string} props.headLine - Page title
 * @property {Object} props.image - promo card image
 * @property {Object} props.supportedPlatformPromos - Android, Ios, etc
 * @property {string} props.subHeadline - Page subtitle
 * @property {string} props.text - Page text
 * @returns {JSX}
 */
const Hero = ({
  appStoreLinks,
  bottomImage,
  device,
  headLine,
  image,
  supportedPlatformPromos,
  subHeadline,
  text,
}) => {
  const rowReference = useRef(null);
  const [larger, setLarger] = useState(null);
  const platformPromos = isValidArray(supportedPlatformPromos) ? supportedPlatformPromos : [];
  const linkCallback = useCallback((event) => {
    setPrendeTVCookie();
    setContentTracking(event);
  }, []);

  useEffect(() => {
    const squareWidth = (device === 'mobile' ? 67 : 107);
    const widthOfSquares = platformPromos.length * squareWidth;
    const wrapperSize = rowReference.current.clientWidth;
    setLarger(wrapperSize < widthOfSquares);
  }, [device, platformPromos.length]);

  const platformList = React.useMemo(() => (
    platformPromos.map(({ image: platformImage, link: { href, target }, uid }) => {
      return (
        <Link
          key={uid}
          href={href}
          onClick={linkCallback}
          target={target}
        >
          <PlatformImage src={platformImage.renditions?.original?.href} />
        </Link>
      );
    })
  ), [platformPromos, linkCallback]);

  return (
    <Wrapper>
      {!bottomImage && (
        <HeroImage src={getKey(image, 'renditions.original.href')} />
      )}
      <InnerWrapper>
        <AppStoreLinks>{
          appStoreLinks
            .map(({ image: storeImage, link: { href, target, text: appStore }, uid }) => {
              return (
                <Link
                  key={uid}
                  href={href}
                  onClick={linkCallback}
                  target={target}
                  data-app={PRODUCT_LINKS?.[appStore]?.key}
                >
                  <StoreImage src={getKey(storeImage, 'renditions.original.href')} />
                </Link>
              );
            })
        }
        </AppStoreLinks>
        <Title>{headLine}</Title>
        {subHeadline && <SubTitle>{subHeadline}</SubTitle>}
        {text && <Text>{text}</Text>}
      </InnerWrapper>
      {bottomImage
      && (
        <HeroImage src={getKey(image, 'renditions.original.href')} />
      )}
      <Platforms ref={rowReference} larger={larger}>
        {platformList}
        <Gradient />
      </Platforms>
    </Wrapper>
  );
};

Hero.propTypes = {
  appStoreLinks: PropTypes.array,
  bottomImage: PropTypes.bool,
  device: PropTypes.string,
  headLine: PropTypes.string,
  image: PropTypes.object,
  subHeadline: PropTypes.string,
  supportedPlatformPromos: PropTypes.array,
  text: PropTypes.string,
};

export default Hero;
