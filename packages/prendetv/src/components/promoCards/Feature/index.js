/**
 * @module Prende TV Feature with headlines
 */
import React, { useContext, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getKey, isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import RichText from '@univision/fe-components-base/dist/components/RichText';
import BaseLink from '@univision/fe-components-base/dist/components/Link';

import { setContentTracking, setPrendeTVCookie } from '../../../utils';
import { PRODUCT_LINKS } from '../../../constants';
import CTA from '../../CTA';
import PrendeTvVideo from '../../Video';
import PrendeTVContext from '../../../context';

import Styles from './Feature.styles';

const Bullets = styled.ul`${Styles.bullets}`;
const BulletItem = styled.li`${Styles.bulletItem}`;
const Headline = styled.div`${Styles.headline}`;
const Image = styled.img`${Styles.image}`;
const Text = styled.h3`${Styles.bottomHeadline}`;
const Title = styled.h1`${Styles.title}`;
const Wrapper = styled.div`${Styles.wrapper}`;
const Link = styled(BaseLink)`${Styles.link}`;
const AppStoreLinks = styled.div`${Styles.storeLinks}`;
const StoreImage = styled.img`${Styles.storeImage}`;

/**
 * Prendet TV Feature with headlines component
 * @param {Object} props - initial props of the component
 * @property {string} props.appStoreLinks - app buttons
 * @property {string} props.bottomHeadline - headline at the bottom
 * @property {Object} props.callToAction - call to action button
 * @property {string} props.flavor - indicates style
 * @property {string} props.headLine - component title
 * @property {Object} props.lead - main image
 * @property {Object} props.mobileImage - image for mobile.
 * @property {bool} props.leadFullWidth - if lead image is full width
 * @property {array} props.subHeadlines - text bullets
 * @returns {JSX.Element}
 */
const Feature = ({
  appStoreLinks,
  bottomHeadline,
  callToAction,
  flavor,
  headLine,
  lead,
  leadFullWidth,
  mobileImage,
  subHeadlines,
}) => {
  const { device } = useContext(PrendeTVContext);
  const isMobile = device === 'mobile';
  const link = getKey(callToAction, 'link', {});
  const isVideo = lead?.type === 'video';
  const appStoreList = isValidArray(appStoreLinks) ? appStoreLinks : [];
  const linkCallback = useCallback((event) => {
    setPrendeTVCookie();
    setContentTracking(event);
  }, []);

  const storeList = useMemo(() => (
    appStoreList
      .map(({ image, link: { href, target, text }, uid }) => {
        return (
          <Link
            key={uid}
            href={href}
            onClick={linkCallback}
            target={target}
            data-app={PRODUCT_LINKS?.[text]?.key}
          >
            <StoreImage src={image?.renditions?.original?.href} />
          </Link>
        );
      })
  ), [appStoreList, linkCallback]);

  return (
    <Wrapper flavor={flavor} isVideo={isVideo} leadFullWidth={leadFullWidth}>
      {isVideo && (
        <PrendeTvVideo callToAction={callToAction} lead={lead} />
      )}

      <>
        {lead?.type === 'image' && (
          <Image
            src={getKey(isMobile && !!mobileImage?.renditions ? mobileImage : lead, 'renditions.original.href')}
            alt="Feature"
            leadFullWidth={leadFullWidth}
          />
        )}
        {!isVideo && (
          <Headline flavor={flavor}>
            <Title flavor={flavor}>
              <RichText html={headLine} />
            </Title>
            {isValidArray(subHeadlines) && (
              <Bullets flavor={flavor}>
                {subHeadlines.map(item => (
                  <BulletItem key={`k${item}`} flavor={flavor}>{item}</BulletItem>
                ))}
              </Bullets>
            )}
            {callToAction && (
              <CTA
                href={link.href}
                target={link.target}
                text={link.text}
              />
            )}
          </Headline>
        )}

        {isValidArray(appStoreList) && <AppStoreLinks>{storeList}</AppStoreLinks>}

        {lead?.type !== 'video' && bottomHeadline && (
          <Text>{bottomHeadline}</Text>
        )}
      </>
    </Wrapper>
  );
};

Feature.propTypes = {
  appStoreLinks: PropTypes.array,
  bottomHeadline: PropTypes.string,
  callToAction: PropTypes.object,
  flavor: PropTypes.string.isRequired,
  headLine: PropTypes.string.isRequired,
  lead: PropTypes.shape({
    type: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    uri: PropTypes.string,
    mcpid: PropTypes.string,
    publishDate: PropTypes.string,
    image: PropTypes.object,
    sharing: PropTypes.object,
  }),
  leadFullWidth: PropTypes.bool,
  mobileImage: PropTypes.object,
  subHeadlines: PropTypes.array,
};

export default Feature;
