import PropTypes from 'prop-types';
import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';
import styled from 'styled-components';

import defaultImage from '@univision/fe-commons/dist/assets/images/default-content-image.png';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';

import getRatioImages from './getRatioImages';
import * as sizes from './imageSizes';
import * as ratios from './aspectRatios';

import Styles from './Picture.styles';

const Wrapper = styled.div`${Styles.pictureWrapper}`;
const Placeholder = styled.div`${Styles.placeholderWrapper}`;
const PictureEl = styled.picture`${Styles.pictureEl}`;
const ImageEl = styled.img`${Styles.imageEl}`;

const DEFAULT_OVERRIDE = {
  xl: sizes.X_SMALL,
  lg: sizes.X_SMALL,
};

/**
 * Picture wrapper
 * @param {Object} props component props
 * @param {JSX} props.children a node image to render
 * @param {Object} props.className extra classname passed to the wrapper
 * @param {Object} props.showBackground show background for placeholder
 * @param {Object} props.isScoreMatchSingleWidget show filter for soccer match
 * @returns {JSX}
 */
const PictureWrapper = ({
  children, className, showBackground, isVertical,
}) => {
  return (
    <Wrapper className={className || ''}>
      <Placeholder showBackground={showBackground} isVertical={isVertical} />
      <PictureEl isVertical={isVertical}>
        {children}
      </PictureEl>
    </Wrapper>
  );
};

PictureWrapper.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  showBackground: PropTypes.bool,
  isVertical: PropTypes.bool,
};

/**
 * Custom equal checker to avoid re-renders
 * at least image uid or overrideImageUrl changes
 * @param {Object} prevProps received for the component
 * @param {Object} nextProps received for the component
 * @returns {boolean}
 */
export const isImageEqual = (prevProps, nextProps) => (
  prevProps.image?.uid === nextProps.image?.uid
  && prevProps.overrideImageUrl === nextProps.overrideImageUrl
);

/**
 * Fetches error image fallback
 * @param {func} onImageError handler to dispatch
 * @param {func} setFallbackImgCallback handler to set image on error
 * @returns {string}
 */
async function fetchOnImageError(onImageError, setFallbackImgCallback) {
  const imageError = await onImageError();

  setFallbackImgCallback(imageError);
}

/**
 * Picture component
 * @param {Object} props component props
 * @param {Object} props.alt alt text for the image
 * @param {Object} props.className extra classname passed to the wrapper
 * @param {Object} props.image image to be displayed
 * @param {bool} props.showBackground show background placeholder
 * @param {string} props.overrideImageUrl url of the image to override this picture
 * @param {Object} props.overrideImageBounds height and width of the override image
 * @param {bool} props.useRenditionUrl forces to generate the image from getRenditionUrl
 * @param {bool} props.lazyload it lazy loads the image
 * @returns {JSX}
 */
const Picture = ({
  alt,
  aspectRatio,
  className,
  deviceSizeOverrides,
  image,
  overrideImageUrl,
  overrideImageBounds,
  onImageError,
  showBackground,
  useRenditionUrl,
  lazyload,
  isVertical,
  isBlurred,
}) => {
  const [fallbackImage, setFallbackImage] = useState(null);
  const [hasError, setError] = useState(false);
  const imageUrlRef = useRef(overrideImageUrl);
  const onErrorCallback = useCallback(
    () => {
      setError(true);
    },
    [setError],
  );

  useEffect(() => {
    if (overrideImageUrl !== imageUrlRef.current) {
      setFallbackImage(null);
      imageUrlRef.current = overrideImageUrl;
    }
  }, [overrideImageUrl, imageUrlRef]);

  useEffect(() => {
    if (hasError && isValidFunction(onImageError)) {
      fetchOnImageError(onImageError, setFallbackImage);
      setError(false);
    }
  }, [setFallbackImage, onImageError, hasError]);

  const { caption, title } = image || {};
  const imageAlt = alt || caption || title || 'Default image alt';

  if (overrideImageUrl) {
    const overrideBounds = isValidObject(overrideImageBounds) ? overrideImageBounds : {};
    return (
      <PictureWrapper
        className={className}
        showBackground={showBackground}
        isVertical={isVertical}
      >
        <ImageEl
          {...(lazyload && { loading: 'lazy' })}
          src={fallbackImage || overrideImageUrl}
          className={className || ''}
          alt={imageAlt}
          onError={onErrorCallback}
          height={overrideBounds?.height}
          width={overrideBounds?.width}
          isBlurred={isBlurred}
        />
      </PictureWrapper>
    );
  }

  if (image?.renditions) {
    const { renditions } = image;
    const isSvg = renditions.original?.href?.split('.').pop() === 'svg';
    // SVG Image
    if (isSvg) {
      return (
        <ImageEl
          width={renditions?.original?.width || '100%'}
          height={renditions?.original?.height || '100%'}
          src={renditions.original.href}
          alt={imageAlt}
          className={className || ''}
          {...(lazyload && { loading: 'lazy' })}
        />
      );
    }

    const overrides = deviceSizeOverrides || DEFAULT_OVERRIDE;
    const images = getRatioImages({
      renditions,
      aspectRatio,
      overrides,
      defaultImage,
      useRenditionUrl,
    });

    return (
      <PictureWrapper
        className={className}
        showBackground={showBackground}
        isVertical={isVertical}
      >
        <>
          <source media="(min-width: 1440px)" srcSet={fallbackImage || images[sizes.X_LARGE]} />
          <source media="(min-width: 1024px)" srcSet={fallbackImage || images[sizes.LARGE]} />
          <source media="(min-width: 768px)" srcSet={fallbackImage || images[sizes.MEDIUM]} />
          <source media="(min-width: 480px)" srcSet={fallbackImage || images[sizes.SMALL]} />
          <ImageEl
            {...(lazyload && { loading: 'lazy' })}
            src={fallbackImage || images[sizes.X_SMALL]}
            alt={imageAlt}
            className={className}
            onError={onErrorCallback}
            width="100%"
            height="auto"
          />
        </>
      </PictureWrapper>
    );
  }

  // Fallback image
  return (
    <ImageEl
      width="100%"
      height="auto"
      alt="Default"
      src={defaultImage}
      className={className}
      {...(lazyload && { loading: 'lazy' })}
    />
  );
};

Picture.propTypes = {
  isVertical: PropTypes.bool,
  className: PropTypes.string,
  alt: PropTypes.string,
  aspectRatio: PropTypes.oneOf([
    ratios.ASPECT_RATIO_16X9,
    ratios.ASPECT_RATIO_3X4,
    ratios.ASPECT_RATIO_3X1,
    ratios.ASPECT_RATIO_4X3,
    ratios.ASPECT_RATIO_VERTICAL_SLIDESHOW,
    ratios.ASPECT_RATIO_HORIZONTAL_SLIDESHOW,
    ratios.ASPECT_RATIO_ORIGINAL,
    ratios.ASPECT_RATIO_1X1,
    ratios.ASPECT_RATIO_PANORAMIC,
  ]),
  deviceSizeOverrides: PropTypes.shape({
    xl: PropTypes.oneOf([
      sizes.XXX_SMALL,
      sizes.XX_SMALL,
      sizes.X_SMALL,
      sizes.SMALL,
      sizes.MEDIUM,
      sizes.LARGE,
      sizes.X_LARGE,
    ]),
    lg: PropTypes.oneOf([
      sizes.XXX_SMALL,
      sizes.XX_SMALL,
      sizes.X_SMALL,
      sizes.SMALL,
      sizes.MEDIUM,
      sizes.LARGE,
      sizes.X_LARGE,
    ]),
    md: PropTypes.oneOf([
      sizes.XXX_SMALL,
      sizes.XX_SMALL,
      sizes.X_SMALL,
      sizes.SMALL,
      sizes.MEDIUM,
      sizes.LARGE,
      sizes.X_LARGE,
    ]),
    sm: PropTypes.oneOf([
      sizes.XXX_SMALL,
      sizes.XX_SMALL,
      sizes.X_SMALL,
      sizes.SMALL,
      sizes.MEDIUM,
      sizes.LARGE,
      sizes.X_LARGE,
    ]),
    xs: PropTypes.oneOf([
      sizes.XXX_SMALL,
      sizes.XX_SMALL,
      sizes.X_SMALL,
      sizes.SMALL,
      sizes.MEDIUM,
      sizes.LARGE,
      sizes.X_LARGE,
    ]),
  }),
  image: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    caption: PropTypes.string,
    credit: PropTypes.string,
    renditions: PropTypes.object,
  }),
  overrideImageUrl: PropTypes.string,
  overrideImageBounds: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  onImageError: PropTypes.func,
  showBackground: PropTypes.bool,
  useRenditionUrl: PropTypes.bool,
  lazyload: PropTypes.bool,
  isBlurred: PropTypes.bool,
};

/**
 * Default Prop Values
 */
Picture.defaultProps = {
  aspectRatio: ratios.ASPECT_RATIO_16X9,
  image: {},
  isVertical: false,
};

export default React.memo(Picture, isImageEqual);
