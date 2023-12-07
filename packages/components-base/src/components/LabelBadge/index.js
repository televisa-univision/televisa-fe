import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import LabelUni from '@univision/shared-components/dist/components/v3/Label';
import LabelMvp from '../Label/TudnRebrandLabel';
import { getCardLabel } from '../cards/helpers';
import Styles from './LabelBadge.styles';
import Link from '../Link';

const Wrapper = styled('div')`
  ${Styles.wrapper}
`;

/**
 * Gets Square Card tag label
 * @param {Object} options - options to get card label
 * @param {string} options.articleType - the card type
 * @param {Array} options.authors - the authors
 * @param {string} options.contentPriority - content priority
 * @param {Array} options.hierarchy - the content hierarchy
 * @param {string} options.textLabel - the card label form cms
 * @param {string} options.type - the content or card type
 * @param {string} options.uri - the content uri
 * @param {string} options.vertical - the vertical the content belongs to
 * @returns {Object}
 */
export const getLabelProps = ({
  articleType = '',
  authors = [],
  contentPriority = '',
  hierarchy = [],
  textLabel = '',
  type = '',
  uri = '',
  vertical = '',
}) => {
  return getCardLabel({
    authors,
    articleType,
    cardLabel: textLabel,
    contentPriority,
    hierarchy,
    uri,
    type,
    vertical,
  });
};

/**
 * Get Badge/Tag label component
 * @param {Object} props - react component props
 * @param {string} props.articleType - the card type
 * @param {Object[]} props.authors - the authors
 * @param {string} props.contentPriority - content priority
 * @param {Object[]} props.hierarchy - the content hierarchy
 * @param {boolean} props.isListItem - true if label is part of a list
 * @param {string} props.textLabel - the card label form cms
 * @param {string} props.type - the content or card type
 * @param {string} props.uri - the content uri
 * @param {string} props.vertical - the vertical the content belongs to
 * @returns {JSX}
 */
function LabelBadge({
  articleType,
  authors,
  className,
  contentPriority,
  hierarchy,
  isListItem,
  textLabel,
  type,
  uri,
  vertical,
  isWorldCupMVP,
}) {
  const labelProps = getLabelProps({
    articleType,
    authors,
    textLabel,
    contentPriority,
    hierarchy,
    type,
    uri,
    vertical,
  });
  const Label = isWorldCupMVP ? LabelMvp : LabelUni;
  return (
    <Wrapper className={className}>
      <Link href={uri}>
        <Label {...labelProps} hasLiveIcon isListItem={isListItem} />
      </Link>
    </Wrapper>
  );
}

LabelBadge.propTypes = {
  articleType: PropTypes.string,
  authors: PropTypes.array,
  className: PropTypes.string,
  contentPriority: PropTypes.string,
  hierarchy: PropTypes.array,
  isListItem: PropTypes.bool,
  textLabel: PropTypes.string,
  type: PropTypes.string,
  uri: PropTypes.string,
  vertical: PropTypes.string,
  isWorldCupMVP: PropTypes.bool,
};

export default LabelBadge;
