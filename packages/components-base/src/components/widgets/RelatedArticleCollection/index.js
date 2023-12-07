import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import Link from '../../Link';
import Styles from './RelatedArticleCollection.styles';

const CollectionWrapper = styled.div`${Styles.collectionWrapper}`;
const ListWrapper = styled.ul`${Styles.listWrapper}`;
const ListItem = styled.li`${Styles.listItem}`;
const LinkWrapper = styled(Link)`${Styles.linkWrapper}`;
const RelatedLabel = styled.span`${Styles.relatedLabel}`;

/**
 * Renders a Related List of articles
 * @param {Object} props - component props
 * @returns {JSX}
 */
const RelatedArticleCollection = ({
  articles,
  className,
}) => {
  if (!isValidArray(articles)) {
    return null;
  }

  return (
    <CollectionWrapper className={className}>
      <RelatedLabel>{localization.get('related')}</RelatedLabel>
      <ListWrapper>
        {articles.map(({ uid, uri, title }) => (
          <ListItem key={uid}>
            <LinkWrapper href={uri}>{title}</LinkWrapper>
          </ListItem>
        ))}
      </ListWrapper>
    </CollectionWrapper>
  );
};

RelatedArticleCollection.propTypes = {
  className: PropTypes.string,
  articles: PropTypes.object,
};

export default RelatedArticleCollection;
