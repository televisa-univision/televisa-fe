import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import localization from '@univision/fe-utilities/localization';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';

import Styles from './IndexAuthor.styles';
import Link from '../../../Link';

const TRACKING_CARD_TYPE = 'author tag';

const Container = styled.div`
  ${Styles.container}
`;
const AuthorLink = styled(Link)`
  ${Styles.authorLink}
`;

/**
 * Author name component
 * It will extract the first item in authors array and display the fullName value with its uri
 * @param {Object} props - props of the component
 * @property {Array} props.authors - content authors array
 * @returns {JSX}
 */
const IndexAuthor = ({
  authors,
  widgetContext,
}) => {
  const author = isValidArray(authors) ? authors[0] : null;

  if (!author) {
    return null;
  }

  const trackClick = CardTracker.onClickHandler(
    {
      uid: author?.image?.uid,
      title: author?.fullName,
      cardTypeOverride: TRACKING_CARD_TYPE,
    },
    widgetContext,
  );

  return (
    <Container className="uvs-font-c-regular">
      {localization.get('by')}:
      <AuthorLink
        href={author?.uri}
        onClick={trackClick}
      >
        {author?.fullName}
      </AuthorLink>
    </Container>
  );
};

IndexAuthor.propTypes = {
  authors: PropTypes.array,
  widgetContext: PropTypes.object,
};

export default IndexAuthor;
