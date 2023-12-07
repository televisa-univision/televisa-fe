import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import localization from '@univision/fe-utilities/localization';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';

import Link from '../../../Link';

import Styles from './IndexRelatedTopics.styles';

const Container = styled.div`
  ${Styles.container}
`;
const MainLabel = styled.div`
  ${Styles.mainLabel}
`;
const TopicLink = styled(Link)`
  ${Styles.topicLink}
`;
const TopicList = styled.ul`
  ${Styles.topicList}
`;

/**
 * Related topics component
 * @param {Object} props - props of the component
 * @property {Array} props.featuredTags - content featuredTags value
 * @property {Object} props.theme - card theme
 * @property {Object} props.widgetContext - widget context object
 * @returns {JSX}
 */
const IndexRelatedTopics = ({
  featuredTags,
  theme,
  widgetContext,
}) => {
  const renderHierarchy = useMemo(() => {
    if (!isValidArray(featuredTags)) return null;

    return (
      <TopicList>
        {featuredTags.map((item) => {
          const {
            title,
            uid,
            uri,
            type,
          } = item;
          const trackClick = CardTracker.onClickHandler(
            {
              uid,
              title,
              cardTypeOverride: type,
            },
            widgetContext,
          );

          return (
            <li key={uid}>
              <TopicLink
                href={uri}
                className="uvs-font-c-bold"
                color={theme?.primary}
                onClick={trackClick}
              >
                {title}
              </TopicLink>
            </li>
          );
        })}
      </TopicList>
    );
  }, [featuredTags, theme, widgetContext]);

  if (!renderHierarchy) {
    return null;
  }

  return (
    <Container className="uvs-font-c-regular">
      <MainLabel>
        {localization.get('related')}:
      </MainLabel>
      {renderHierarchy}
    </Container>
  );
};

IndexRelatedTopics.propTypes = {
  featuredTags: PropTypes.array,
  theme: PropTypes.object,
  widgetContext: PropTypes.object,
};

IndexRelatedTopics.defaultProps = {
  theme: {},
  widgetContext: {},
};

export default IndexRelatedTopics;
