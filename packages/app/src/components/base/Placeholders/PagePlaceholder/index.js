import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { deviceSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { ContentPlaceholder } from '@univision/fe-components-base/dist/components/Placeholder';
import VideoPlaceholder from '@univision/fe-components-base/dist/components/widgets/Placeholder/VideoWithPlaylist';

import Styles from './PagePlaceholder.styles';

const Container = styled.div`${Styles.container}`;
const Tag = styled.div`${Styles.tag}`;
const Title = styled.div`${Styles.title}`;
const Content = styled.div`${Styles.content}`;
const Offset = styled.div`${Styles.offset}`;
const VideoContainer = styled.div`${Styles.videoContainer}`;

/**
 * Video page placeholder
 * @returns {JSX}
 */
export const VideoPagePlaceholder = () => (
  <VideoContainer className="uvs-container">
    <VideoPlaceholder showTitle={false} />
  </VideoContainer>
);

/**
 * Placeholder used for desktop
 * @returns {JSX}
 */
const DesktopPagePlaceholder = () => (
  <div className="uvs-container">
    <div className="row">
      <Offset className="col-sm-12 col-md-10 col-lg-8">
        <Tag />
        <Title />
        <Content />
      </Offset>
    </div>
  </div>
);

/**
 *
 * Placeholder for the page
 * @returns {JSX}
 */
export const PagePlaceholder = () => {
  const device = useSelector(deviceSelector);
  const isMobile = device === 'mobile';

  return (
    <Container>
      {isMobile ? (
        <ContentPlaceholder animated={false} />
      ) : (
        <DesktopPagePlaceholder />
      )}
    </Container>
  );
};
