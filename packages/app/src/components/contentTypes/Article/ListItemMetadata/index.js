import React from 'react';
import PropTypes from 'prop-types';
import NextHead from 'next/head';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';

import { isListItemEnhancement } from '../ArticleBody/helpers';

/**
 * Seo for the ListItem
 * @param {Object} props - the component props
 * @returns {JSX}
 */
const ListItemMetadata = (props) => {
  const { page } = props;
  const { body } = page;

  if (!isValidArray(body)) {
    return null;
  }
  const listData = body.filter(itemlist => isListItemEnhancement(itemlist));

  const breadcrumbList = listData && listData.map((itemlist) => {
    return {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: itemlist.objectData?.title,
      image: itemlist.objectData?.media?.renditions?.original.href,
      description: itemlist.objectData?.description,
      brand: {
        '@type': 'Sponsor',
        name: itemlist.objectData?.sponsor?.name,
      },
      review: {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '4.1',
          bestRating: '4.8',
        },
        author: {
          '@type': 'Person',
          name: 'Jossette Rivera',
        },
      },
    };
  });
  return (
    <NextHead>
      <script type="application/ld+json">{JSON.stringify(breadcrumbList)}</script>
    </NextHead>
  );
};

/**
 * propTypes
 * @property {Object} page - page data from the api
 */
ListItemMetadata.propTypes = {
  page: PropTypes.object,
};

export default ListItemMetadata;
