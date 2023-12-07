import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { DARK_VARIANT } from '@univision/fe-utilities/styled/constants';
import { MOBILE, DESKTOP } from '@univision/fe-commons/dist/constants/devices';
import { MEDIUM } from '@univision/fe-commons/dist/constants/cardSizes';
import { PODCAST_SERIES_CARD_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/podcastCard';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import { pageDataSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';

import Picture from '../../Picture';
import FullWidth from '../../FullWidth';
import ActionBar from '../../ActionBar';
import Styles from './PodcastOpener.styles';

const ActionBarWrapper = styled(ActionBar)`${Styles.actionBarWrapper}`;
const Container = styled.div`${Styles.container}`;
const ContentWrapper = styled.div`${Styles.contentWrapper}`;
const Description = styled.p`${Styles.description}`;
const FullWidthWrapper = styled(FullWidth)`${Styles.fullWidthWrapper}`;
const PictureImage = styled(Picture)`${Styles.pictureImage}`;
const PictureWrapper = styled.div`${Styles.pictureWrapper}`;
const Title = styled.h2`${Styles.title}`;

/**
 * PodcastOpener Component
 * @param {Object} [props.settings] current widget settings
 * @param {string} [props.device] current device
 * @returns {JSX}
 */
const PodcastOpener = ({ settings, device }) => {
  const {
    title,
    description,
    image,
    uid,
    type,
  } = settings || {};
  const imageUrl = image?.renditions?.original;
  const imageRatio = PODCAST_SERIES_CARD_RATIOS[MEDIUM];
  const { sharing } = useSelector(pageDataSelector);

  return (
    <FullWidthWrapper image={imageUrl?.href}>
      <Container>
        <PictureWrapper>
          <PictureImage
            type={type}
            alt={title}
            image={image}
            overrideImageUrl={getRenditionUrl(
              imageUrl,
              imageRatio
            )}
            overrideImageBounds={imageRatio}
          />
          <Title type={MOBILE}>{title}</Title>
        </PictureWrapper>
        <ContentWrapper>
          <Title type={DESKTOP}>{title}</Title>
          <Description>{description}</Description>
          <ActionBarWrapper
            contentId={uid}
            contentTitle={title}
            contentType={type}
            device={device}
            sharingOptions={sharing}
            variant={DARK_VARIANT}
          />
        </ContentWrapper>
      </Container>
    </FullWidthWrapper>
  );
};

PodcastOpener.propTypes = {
  settings: propTypes.object,
  device: propTypes.string,
};

export default PodcastOpener;
