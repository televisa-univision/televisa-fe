import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import Description from '@univision/fe-components-base/dist/components/Description';
import Title from '@univision/fe-components-base/dist/components/Title';
import Truncate from '@univision/fe-components-base/dist/components/Truncate';
import features from '@univision/fe-commons/dist/config/features';

import Styles from './ContentHeader.styles';

const ArticleHeader = styled.div`${Styles.articleHeader}`;
const Header = styled.header`${Styles.header}`;
const StatusText = styled.div`${Styles.statusText}`;
const TruncateContainer = styled.div`${Styles.truncateContainer}`;
const ArticleDescription = styled(Description)`${Styles.description}`;
const TitleStyled = styled(Title).attrs({ element: 'h1' })`${Styles.title}`;
const CategoryTagDiv = styled.div`${Styles.categoryTag}`;

/**
 * ContentHeader - title, description, cover image
 * @param {Object} props component props
 * @returns {JSX}
 */
const ContentHeader = ({
  activeSlideNumber,
  className,
  dark,
  description,
  isArticle,
  endSlideNumber,
  reaction,
  renderSimpleStatus,
  richTextDescription,
  title,
  theme,
  featuredTag,
  type,
}) => {
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  const isTelevisaSite = features.televisa.isTelevisaSite();
  return (
    <ErrorBoundary>
      <ArticleHeader className={className} isArticle={isArticle}>
        {isTelevisaSite && theme?.showCategoryTag && featuredTag && (
          <CategoryTagDiv>
            {featuredTag}
          </CategoryTagDiv>
        )}
        <Header dark={dark}>
          {title && (
            <TitleStyled isArticle={isArticle} itemProp="headline" isWorldCupMVP={isWorldCupMVP} isTelevisaSite={isTelevisaSite}>
              {title}
            </TitleStyled>
          )}
          {type === 'slide' && reaction && (
            <StatusText>
              <div>
                <em>{activeSlideNumber}</em> de {endSlideNumber}
              </div>
            </StatusText>
          )}
          {type === 'slide' && description && (
            <TruncateContainer>
              {renderSimpleStatus && renderSimpleStatus()}
              <Truncate
                text={description}
                trimLength={120}
                expandPosition={reaction ? 'left' : 'right'}
              />
            </TruncateContainer>
          )}
          {type === 'default' && description && (
            <ArticleDescription
              size={theme?.descriptionFontSize ? theme.descriptionFontSize : 'small'}
              richTextDescription={richTextDescription}
              isWorldCupMVP={isWorldCupMVP}
            >
              {description}
            </ArticleDescription>
          )}
        </Header>
      </ArticleHeader>
    </ErrorBoundary>
  );
};

/**
 * propTypes
 * @property {String} title the title of the article
 * @property {String} description the short description of the article
 * @property {Array} richTextDescription the rich text short description of the article
 * @property {String} className additional class
 * @property {Object} reaction object for reaction view
 * @property {String} type header type
 */
ContentHeader.propTypes = {
  activeSlideNumber: PropTypes.number,
  className: PropTypes.string,
  dark: PropTypes.bool,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  isArticle: PropTypes.bool,
  endSlideNumber: PropTypes.number,
  reaction: PropTypes.object,
  renderSimpleStatus: PropTypes.func,
  richTextDescription: PropTypes.array,
  title: PropTypes.string,
  theme: PropTypes.object,
  featuredTag: PropTypes.string,
  type: PropTypes.oneOf(['default', 'slide']),
};

ContentHeader.defaultProps = {
  className: '',
  dark: false,
  type: 'default',
};

export default ContentHeader;
