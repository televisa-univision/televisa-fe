import React from 'react';
import styled from 'styled-components';

import Styles from './HorizontalCard.styles';

const SkeletonWrapper = styled.div`${Styles.skeletonWrapper}`;
const SkeletonAvatar = styled.div`${Styles.skeletonAvatar}`;
const SkeletonContainer = styled.div`${Styles.skeletonContainer}`;
const SkeletonTitle = styled.div`${Styles.skeletonTitle}`;
const SkeletonContent = styled.div`${Styles.skeletonContent}`;
const SkeletonButton = styled.div`${Styles.skeletonButton}`;

/**
 * Placeholder component for content card
 * @returns {jsx}
 */
const HorizontalCardPlaceholder = () => (
  <SkeletonWrapper>
    <SkeletonAvatar />
    <SkeletonContainer>
      <SkeletonTitle />
      <SkeletonContent />
      <SkeletonContent />
      <SkeletonButton />
    </SkeletonContainer>
  </SkeletonWrapper>
);

export default HorizontalCardPlaceholder;
