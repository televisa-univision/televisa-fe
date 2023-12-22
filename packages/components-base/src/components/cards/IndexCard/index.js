import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import stripHtmlTags from '@univision/fe-utilities/helpers/string/stripHtmlTags';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';

import Link from '../../Link';
import Title from '../../Title';

import Styles from './IndexCard.styles';
import IndexRelatedTopics from './IndexRelatedTopics';
import IndexDateString from './IndexDateString';
import IndexAuthor from './IndexAuthor';
import IndexImage from './IndexImage';
import IndexMeta from './IndexMeta';

const StyledTitleLink = styled(Link)`
  ${Styles.titleLink}
`;
const Description = styled.div`
  ${Styles.description}
`;
const Wrapper = styled.div`
  ${Styles.wrapper}
`;
const DataColumn = styled.div`
  ${Styles.dataColumn}
`;
const ImageColumn = styled.div`
  ${Styles.imageColumn}
`;
const ContentColumn = styled.div`
  ${Styles.contentColumn}
`;

/**
 * IndexCard component
 * This component should receieve a long list of props related to the content but not all
 * are in the prop types validation for brevity.
 * The props should follow the web API standard for a content object and should be
 * destructured in their corresponding spaces if not required in this level.
 * @param {Object} props - props of the component
 * @property {string} props.description - content description
 * @property {boolean} props.hideImage - flag to hide the content image
 * @property {string} props.title - content title
 * @property {string} props.uri - content uri
 * @returns {JSX}
 */
const IndexCard = (props) => {
  const {
    description,
    hideImage,
    theme,
    title,
    type,
    uri,
    uid,
    widgetContext,
  } = props;

  const { isDark } = theme || {};

  const trackClick = CardTracker.onClickHandler(
    {
      uid,
      title,
      cardTypeOverride: type,
    },
    widgetContext,
  );

  return (
    <Wrapper>
      <DataColumn>
        <IndexDateString {...props} />
        <IndexRelatedTopics {...props} />
      </DataColumn>
      {!hideImage && (
        <ImageColumn>
          <IndexImage {...props} trackClick={trackClick} />
        </ImageColumn>
      )}
      <ContentColumn hideImage={hideImage}>
        <StyledTitleLink href={uri} onClick={trackClick} isDarkTheme={isDark}>
          <Title className="uvs-font-b-bold">{title}</Title>
        </StyledTitleLink>
        <IndexAuthor {...props} />
        <Description isDarkTheme={isDark}>
          {stripHtmlTags(description)}
        </Description>
        {hideImage && <IndexMeta {...props} />}
      </ContentColumn>
    </Wrapper>
  );
};

IndexCard.propTypes = {
  description: PropTypes.string,
  hideImage: PropTypes.bool,
  theme: PropTypes.object,
  title: PropTypes.string,
  type: PropTypes.string,
  uri: PropTypes.string,
  uid: PropTypes.string,
  widgetContext: PropTypes.object,
};

IndexCard.defaultProps = {
  widgetContext: {},
};

export default IndexCard;
