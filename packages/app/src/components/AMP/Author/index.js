import React from 'react';
import PropTypes from 'prop-types';

import { hasKey, getKey, isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import formatDate from '@univision/fe-utilities/helpers/date/formatDate';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import {
  Author, AuthorAvatar, AuthorContainer, AuthorSeparator, AuthorsContainer, By,
  LastAuthorSeparator, MultiAuthor, PublishDate, SingleAuthor, SingleAuthorContainer, Sponsor,
} from './Author.styles';

/**
 * MultiAuthor Display Component
 * @param {Array} authors - authors
 * @param {string} date - date
 * @param {bool} [showAvatar = true] - display author avatar
 * @param {string} source - source
 * @param {Object} [sponsor = null] - sponsor object
 * @param {Array} tempAuthors - tempAuthors
 * @returns {JSX}
 */
const AmpAuthor = ({
  authors,
  date,
  hidePublishDate,
  inlineDate,
  language,
  showAvatar,
  showUpdateDate,
  source,
  sponsor,
  tempAuthors,
  updateDate,
}) => {
  /**
   * Setup the state
   */
  const totalAuthors = [];
  let authorAvatar = '';

  /**
   * Set up the widget, concatenate both authors and temp authors array
   * get logo and twitter handle if there's only one author, if not
   * then just push the source to display as author
   */
  if (isValidArray(authors)) {
    totalAuthors.push(...authors);
  }
  if (isValidArray(tempAuthors)) {
    totalAuthors.push(...tempAuthors);
  }

  if (totalAuthors.length === 1) {
    authorAvatar = getKey(totalAuthors[0], 'image.renditions.1x1-xxs-mobile.href', '');
  } else if (totalAuthors.length === 0 && source) {
    totalAuthors.push({ title: source });
  }

  let dateString = date ? formatDate(new Date(date), localization.getCurrentLanguage()) : null;

  const updated = updateDate
    ? formatDate(new Date(updateDate), localization.getCurrentLanguage())
    : null;
  const updatedString = showUpdateDate && updated ? `${localization.get('updated')} ${updated}` : null;

  if (updatedString) {
    dateString = `${localization.get('published')} ${dateString} | ${updatedString}`;
  }

  const dateEl = date && !hidePublishDate && (
    <PublishDate className="uvs-font-a-bold">
      <meta itemProp="datePublished" content={date} />
      {updateDate && showUpdateDate && <meta itemProp="dateUpdated" content={updateDate} />}
      {dateString}
    </PublishDate>
  );
  const sponsorOnly = sponsor && !isValidArray(totalAuthors);
  const SponsorImageElement = sponsor && (
    <>
      {hasKey(sponsor, 'image.renditions.original.href') && (
        <amp-img src={getKey(sponsor, 'image.renditions.original.href')} width="400" height="225" layout="responsive" alt="an image" />
      )}
      {sponsorOnly && dateEl}
    </>
  );

  const sponsorEl = sponsor && (
    <Sponsor>
      {hasKey(sponsor, 'link.href') ? (
        <a href={getKey(sponsor, 'link.href', '')} target="_blank" rel="noopener noreferrer">
          {SponsorImageElement}
        </a>
      ) : (
        SponsorImageElement
      )}
    </Sponsor>
  );

  // e.g.: Author1, Author2 y Author3 || Author1, Author2 and Author3
  const authorDelimeter = ',';
  const authorDelimeterLast = localization.get('and', { language });
  const oneAuthor = totalAuthors.length === 1;
  const lastDelimitedAuthor = totalAuthors.length - 2;
  // e.g.: Por: ...authors || By: ...authors
  const displayBy = (
    <By className="uvs-font-a-regular">
      {`${localization.get('by', {
        language,
      })}: `}
    </By>
  );
  const displayAuthors = isValidArray(totalAuthors)
    ? totalAuthors.map((content, index) => (
      <SingleAuthorContainer className="uvs-font-a-bold" key={`${content.uid}`}>
        <span className="uvs-font-a-bold">
          <a href={getKey(content, 'uri', getKey(content, 'link.href'))}>
            <span>{content.title || content.fullName}</span>
          </a>
        </span>
        {index < (totalAuthors.length - 1) && index !== lastDelimitedAuthor && (
          <AuthorSeparator>{authorDelimeter}</AuthorSeparator>
        )}
        {index === lastDelimitedAuthor && (
          <LastAuthorSeparator>{authorDelimeterLast}</LastAuthorSeparator>
        )}
      </SingleAuthorContainer>
    ))
    : null;

  if (sponsor && !isValidArray(totalAuthors)) {
    return sponsorEl;
  }

  return (
    <>
      {sponsorEl}
      <AuthorsContainer>
        {showAvatar && oneAuthor && authorAvatar && (
          <AuthorAvatar image={authorAvatar} />
        )}
        <div>
          {isValidArray(displayAuthors) && oneAuthor && (
            <Author className="uvs-font-a-bold" itemProp="author">
              <SingleAuthor>
                <span itemProp="name">{displayAuthors}</span>
              </SingleAuthor>
              {inlineDate && dateEl}
            </Author>
          )}
          {isValidArray(displayAuthors) && !oneAuthor ? (
            <MultiAuthor>
              <AuthorContainer>
                {displayBy}
                {displayAuthors}
              </AuthorContainer>
              {inlineDate && dateEl}
            </MultiAuthor>
          ) : (
            <div />
          )}
          {!inlineDate && dateEl}
        </div>
      </AuthorsContainer>
    </>
  );
};

AmpAuthor.propTypes = {
  authors: PropTypes.array,
  date: PropTypes.string,
  hidePublishDate: PropTypes.bool,
  inlineDate: PropTypes.bool,
  language: PropTypes.string,
  showAvatar: PropTypes.bool,
  showUpdateDate: PropTypes.bool,
  source: PropTypes.string,
  sponsor: PropTypes.object,
  tempAuthors: PropTypes.array,
  updateDate: PropTypes.string,
};

AmpAuthor.defaultProps = {
  hidePublishDate: false,
  language: 'es',
  showAvatar: true,
  showUpdateDate: false,
  sponsor: null,
  updateDate: null,
};

export default AmpAuthor;
