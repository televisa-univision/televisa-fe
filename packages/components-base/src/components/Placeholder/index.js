import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Store from '@univision/fe-commons/dist/store/store';
import { getTheme } from '@univision/fe-commons/dist/store/storeHelpers';
import Picture from '../Picture';

import * as ratios from '../Picture/aspectRatios';

import FullWidth from '../FullWidth';
import Styled from './PlaceHolder.styles';
import Loading from '../Loading';

const WrapperInnerStyled = styled.div`${Styled.skeletonWrapperInner}`;
const SkeletonContentStyled = styled.div`${Styled.skeletonContent}`;
const SkeletonWrapperBodyStyled = styled.div`${Styled.skeletonWrapperBody}`;
const SkeletonAvatarStyled = styled.div`${Styled.skeletonAvatar}`;
const CardWrapperStyled = styled.div`${Styled.cardWrapper}`;
const OpeningPlaceholderStyled = styled.div`${Styled.openingPlaceholder}`;
const SkeletonSquareStyled = styled.div`${Styled.skeletonSquare}`;
const ContentPlaceholderStyled = styled.div`${Styled.contentPlaceholder}`;
const LoadingPlaceholderStyled = styled.div`${Styled.loadingPlaceholder}`;

/**
 * Placeholder component for content card
 * @returns {jsx}
 */
export const CardPlaceHolder = ({ animated, hasWidth }) => (
  <WrapperInnerStyled>
    <SkeletonWrapperBodyStyled animated={animated}>
      <SkeletonAvatarStyled hasWidth={hasWidth} />
      <SkeletonContentStyled type="content1" hasWidth={hasWidth} />
      <SkeletonContentStyled type="content2" hasWidth={hasWidth} />
      <SkeletonContentStyled type="content3" hasWidth={hasWidth} />
    </SkeletonWrapperBodyStyled>
  </WrapperInnerStyled>
);

CardPlaceHolder.propTypes = {
  animated: PropTypes.bool,
  hasWidth: PropTypes.bool,
};

CardPlaceHolder.defaultProps = {
  animated: true,
};

/**
 * Placeholder component
 * @param {Object} props - Component props
 * @returns {jsx}
 */
export const ContentPlaceholder = ({ hasWidth, hideInDesktop, ...rest }) => (
  <ContentPlaceholderStyled hasWidth={hasWidth} hideInDesktop={hideInDesktop}>
    <CardPlaceHolder {...rest} hasWidth={hasWidth} />
  </ContentPlaceholderStyled>
);

ContentPlaceholder.propTypes = {
  hasWidth: PropTypes.bool,
  hideInDesktop: PropTypes.bool,
};

ContentPlaceholder.defaultProps = {
  hideInDesktop: true,
};

/**
 * Placeholder component
 * @returns {jsx}
 */
export const OpeningPlaceholder = () => {
  return (
    <OpeningPlaceholderStyled>
      <div className="row">
        <div className="col-md-6">
          <SkeletonSquareStyled />
        </div>
        <div className="col-md-6">
          {
            [...Array(4).keys()].map(number => (
              <CardWrapperStyled key={number.toString()}>
                <CardPlaceHolder animated={false} />
              </CardWrapperStyled>
            ))
          }
        </div>
      </div>
    </OpeningPlaceholderStyled>
  );
};

/**
 * Empty placeholder
 * @returns {jsx}
 */
export const EmptyPlaceholder = () => {
  return <div />;
};

/**
 * Image placeholder
 * @param {Object} image for the Picture component
 * @param {boolean} isLead whether it is a lead image placeholder
 * @param {boolean} isFullWidth whether it is full width placeholder
 * @returns {function}
 * @constructor
 */
export const ImagePlaceholder = (image, isLead, isFullWidth) => {
  if (isLead && isFullWidth) {
    return () => (
      <FullWidth breakpoints={['xxs', 'xs', 'sm', 'md', 'lg', 'xl']}>
        <Picture image={image} aspectRatio={ratios.ASPECT_RATIO_PANORAMIC} />
      </FullWidth>
    );
  }
  return () => <Picture image={image} />;
};

ImagePlaceholder.propTypes = {
  image: PropTypes.object,
};

/**
 * Placeholder with a loading indicator
 * @param {string} className Custom class name
 * @returns {function(): XML}
 * @constructor
 */
export const LoadingPlaceholder = (className) => {
  return () => (
    <LoadingPlaceholderStyled className={className}>
      {<Loading theme={getTheme(Store)} />}
    </LoadingPlaceholderStyled>
  );
};

ImagePlaceholder.propTypes = {
  className: PropTypes.object,
};
