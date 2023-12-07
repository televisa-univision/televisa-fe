/**
 * @module PrendeTV Blog Item component
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import RichText from '@univision/fe-components-base/dist/components/RichText';
import DateTime from '@univision/shared-components/dist/components/v2/DateTime';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';

import Styles from './BlogItem.styles';

import localization from '../../constants/localization';

const Author = styled.div`${Styles.author}`;
const BlogImage = styled.img`${Styles.blogImage}`;
const BlogImageContainer = styled.div`${Styles.blogImageContainer}`;
const Container = styled.a`${Styles.container}`;
const Description = styled.div`${Styles.description}`;
const FeaturedTags = styled.div`${Styles.featuredTags}`;
const PublishDate = styled.div`${Styles.publishDate}`;
const SeeMore = styled.span`${Styles.seeMore}`;
const Separator = styled.hr`${Styles.separator}`;
const Title = styled.h2`${Styles.title}`;

/**
 * Blog Item component
 * @param {Object} props - initial props
 * @property {array} props.authors - List of authors of this blog post
 * @property {number} props.consecutive - Order in which this blog post is be rendered in the page
 * @property {string} props.description - Description of the blog post
 * @property {array} props.featuredTags - List of tags foor this blog post
 * @property {Object} props.image - Image object of the blog post
 * @property {Object} props.publishDate - Publication date for the blog post
 * @property {string} props.title - Title of the blog post
 * @property {string} props.uri - Title of the blog post
 * @returns {JSX.Element}
 */
const BlogItem = ({
  authors,
  consecutive,
  description,
  featuredTags,
  image,
  publishDate,
  title,
  uri,
}) => {
  return (
    <Container consecutive={consecutive} href={uri}>
      <FeaturedTags consecutive={consecutive}>
        {isValidArray(featuredTags) && featuredTags[0].title}
      </FeaturedTags>

      <PublishDate consecutive={consecutive}>
        <DateTime date={publishDate} format="MMM DD, YYYY" />
      </PublishDate>

      <Title consecutive={consecutive}>{title}</Title>

      <Author consecutive={consecutive}>
        {isValidArray(authors) && `${localization.get('by')}: ${authors[0].fullName}`}
      </Author>

      <BlogImageContainer consecutive={consecutive}>
        <BlogImage src={image.renditions?.original?.href} />
      </BlogImageContainer>

      <Description consecutive={consecutive}>
        <RichText html={description} />
      </Description>

      <SeeMore consecutive={consecutive}>{localization.get('seeMore')}</SeeMore>

      <Separator consecutive={consecutive} />
    </Container>
  );
};

BlogItem.propTypes = {
  authors: PropTypes.array,
  consecutive: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  featuredTags: PropTypes.array,
  image: PropTypes.object.isRequired,
  publishDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
};

export default BlogItem;
