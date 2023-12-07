import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import INDEX_CARD_RATIOS from '@univision/fe-commons/dist/utils/images/ratios/indexCard';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';

import Link from '../../../Link';
import Picture from '../../../Picture';
import Styles from './IndexImage.styles';
import IndexMeta from '../IndexMeta';

const ImageContainer = styled.div`
  ${Styles.imageContainer}
`;
const RatioBox = styled.div`
  ${Styles.ratioBox}
`;
const Wrapper = styled.div`
  ${Styles.wrapper}
`;
const PictureMask = styled.div`
  ${Styles.pictureMask}
`;

/**
 * Index Card Image component
 * This component should carry aside from the declared props
 * in prop type validation, the standard web API values in order to be sent
 * to the IndexMeta component, they're not included here for brevity.
 * @param {Object} props - props of the component
 * @property {string} props.device - user device
 * @property {Object} props.image - image data object
 * @property {string} props.title - content title
 * @property {Function} props.trackClick - click tracking callback
 * @property {string} props.uri - content uri
 * @returns {JSX}
 */
const IndexImage = (props) => {
  const {
    device,
    image,
    title,
    uri,
    trackClick,
  } = props;

  return (
    <Wrapper>
      <RatioBox>
        <ImageContainer>
          <Link
            href={uri}
            onClick={isValidFunction(trackClick) ? trackClick : null}
          >
            <Picture
              image={image}
              alt={title}
              overrideImageUrl={getRenditionUrl(
                getKey(image, 'renditions.original', {}),
                INDEX_CARD_RATIOS[device]
              )}
            />
            <PictureMask>
              <IndexMeta {...props} isDark />
            </PictureMask>
          </Link>
        </ImageContainer>
      </RatioBox>
    </Wrapper>
  );
};

IndexImage.propTypes = {
  image: PropTypes.object,
  uri: PropTypes.string,
  title: PropTypes.string,
  device: PropTypes.oneOf(['desktop', 'mobile', 'tablet']),
  trackClick: PropTypes.func,
};

IndexImage.defaultProps = {
  device: 'mobile',
};

export default IndexImage;
