import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';

import TagLabel from '../TagLabel';

import Styles from './RelatedTags.styles.js';

const Separator = styled.div`
  ${Styles.separator}
`;
const TagLabelStyled = styled(TagLabel)`${Styles.tagLabel}`;
const TagsContent = styled.div`
  ${Styles.tagsContent}
`;
const Title = styled.div`
  ${Styles.title}
`;
const Wrapper = styled.div`
  ${Styles.wrapper}
`;

/**
 * RelatedTags component
 * @param {Object} props component props
 * @property {boolean} props.forceColumn To force column in every situation
 * @property {Object[]} props.tags Array of tags to be shown inside the component
 * @property {string} props.separator String which is used to separe tags
 * @returns {JSX}
 */
const RelatedTags = ({
  forceColumn,
  tags,
  separator,
}) => {
  const tagsEle = tags?.map((tag) => {
    if (!isValidObject(tag)) {
      return null;
    }
    return (
      <Fragment key={`${tag.uid || tag.id}-${tag.link || tag.uri}`}>
        <TagLabelStyled fontClass="uvs-font-c-bold" tag={tag} color={tag?.color} />
        <Separator>{separator}</Separator>
      </Fragment>
    );
  });
  return (
    <ErrorBoundary>
      <Wrapper forceColumn={forceColumn}>
        <Title forceColumn={forceColumn} className="uvs-font-c-regular">
          {localization.get('related').toUpperCase()}:
        </Title>
        <TagsContent>
          {tagsEle}
        </TagsContent>
      </Wrapper>
    </ErrorBoundary>
  );
};

RelatedTags.propTypes = {
  forceColumn: PropTypes.bool,
  tags: PropTypes.array,
  separator: PropTypes.string,
};

/**
 * Default Prop Values
 */
RelatedTags.defaultProps = {
  forceColumn: false,
  tags: [],
  separator: '',
};
export default React.memo(RelatedTags);
