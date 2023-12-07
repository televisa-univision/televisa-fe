/**
 * @module PrendeTV News Item
 */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import getKey from '@univision/fe-utilities/helpers/object/getKey';
import RichText from '@univision/fe-components-base/dist/components/RichText';

import localization from '../../constants/localization';
import Styles from './NewsItem.styles';

const Wrapper = styled.div`${Styles.wrapper}`;
const Link = styled.a`${Styles.link}`;

const InfoWrapper = styled.div`${Styles.infoWrapper}`;
const Title = styled.h3`${Styles.title}`;
const TitleText = styled.span`${Styles.titleText}`;
const Description = styled(RichText)`${Styles.description}`;
const SeeMore = styled.span`${Styles.seeMore}`;

const ImageWrapper = styled.div`${Styles.imageWrapper}`;
const Image = styled.img`${Styles.image}`;

/**
 * Prende TV static news item.
 *
 * @param {Object} props - initial props of the component
 * @property {string} props.description - content description
 * @property {string} props.device - device detected
 * @property {Object} props.image - content image
 * @property {string} props.publishDate - content published date
 * @property {string} props.title - content title
 * @property {string} props.uri - content url
 * @returns {JSX}
 */
const NewsItem = ({
  description,
  device,
  image,
  title,
  uri,
}) => {
  const isMobile = device !== 'desktop';
  const originalRendition = getKey(image, 'renditions.original.href');
  const imageComponent = originalRendition
    && (<ImageWrapper><Image src={originalRendition} /></ImageWrapper>);

  return (
    <Wrapper>
      <Link href={uri} target="_blank">
        <InfoWrapper>
          <Title>
            <TitleText>{title}</TitleText>
            {isMobile && imageComponent}
          </Title>

          {description && <Description html={description} />}

          <SeeMore>{localization.get('seeMore')}</SeeMore>
        </InfoWrapper>

        {!isMobile && imageComponent}
      </Link>
    </Wrapper>
  );
};

NewsItem.propTypes = {
  description: PropTypes.string,
  device: PropTypes.string,
  image: PropTypes.object,
  title: PropTypes.string,
  uri: PropTypes.string,
};

export default NewsItem;
