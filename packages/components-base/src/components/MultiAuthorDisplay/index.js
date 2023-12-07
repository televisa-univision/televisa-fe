import React, { Fragment } from 'react';
import Loadable from 'react-loadable';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useSelector } from 'react-redux';

import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import { hasKey, getKey, isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import formatDate from '@univision/fe-utilities/helpers/date/formatDate';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import features from '@univision/fe-commons/dist/config/features';
import { isTelevisaSiteSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import Link from '../Link';
import { XX_SMALL } from '../Picture/imageSizes';
import aspectRatiosSizes, { ASPECT_RATIO_1X1 } from '../Picture/aspectRatios';
import { EmptyPlaceholder } from '../Placeholder';

import Author from '../Author';
import Sponsor from '../Sponsor';

import Styles from './MultiAuthorDisplay.scss';

const TwitterFollow = Loadable({
  loader: () => import(/* webpackChunkName: "twitterFollow" */ '../TwitterFollow'),
  loading: EmptyPlaceholder,
});

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
const MultiAuthorDisplay = ({
  authors,
  authorClassName,
  date,
  dateClassName,
  hidePublishDate,
  inlineDate,
  language,
  showAvatar,
  showUpdateDate,
  source,
  sponsor,
  tempAuthors,
  updateDate,
  videoMeta,
}) => {
  /**
   * Setup the state
   */
  const totalAuthors = [];
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  const isTelevisaSite = useSelector(isTelevisaSiteSelector);
  let authorAvatar = '';
  const authorAvatarOptions = {
    ratio: ASPECT_RATIO_1X1,
    size: XX_SMALL,
  };
  let authorTwitter = '';
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
    authorAvatar = getRenditionUrl(getKey(totalAuthors[0], 'image.renditions.original', {}), aspectRatiosSizes[authorAvatarOptions.ratio][authorAvatarOptions.size]);
    authorTwitter = getKey(totalAuthors[0], 'socialNetworks.twitterUrl.url', '');
  } else if (totalAuthors.length === 0 && source) {
    totalAuthors.push({ title: source });
  }

  let dateString = date ? formatDate(new Date(date), localization.getCurrentLanguage()) : null;

  const updated = updateDate
    ? formatDate(new Date(updateDate), localization.getCurrentLanguage())
    : null;
  const updatedString = showUpdateDate && updated ? `${localization.get('updated')} ${updated}` : null;

  if (updatedString) {
    dateString = isTelevisaSite ? `${localization.get('published')} ${dateString}`
      : `${localization.get('published')} ${dateString} | ${updatedString}`;
  }

  const dateElClassNames = classnames('uvs-font-c-regular', Styles.date, dateClassName, {
    [Styles.inlineDate]: inlineDate,
    [Styles.isWorldCupMVP]: isWorldCupMVP,
  });
  const dateEl = date && !hidePublishDate && (
    <>
      <span className={dateElClassNames}>
        <meta itemProp="datePublished" content={date} />
        {updateDate && showUpdateDate && <meta itemProp="dateUpdated" content={updateDate} />}
        {dateString}
      </span>
      {isTelevisaSite && (
        <span className={dateElClassNames} style={{ 'margin-top': '2px' }}>
          {updatedString}
        </span>
      )}
    </>
  );
  const sponsorOnly = sponsor && !isValidArray(totalAuthors);
  const SponsorImageElement = sponsor && (
    <Fragment>
      <Sponsor
        sponsorBy={localization.get('sponsorBy')}
        logo={sponsor?.image?.renditions?.original?.href}
        link={sponsor?.link?.href}
      />
      {sponsorOnly && dateEl}
    </Fragment>
  );

  const sponsorEl = sponsor && (
    <div className={Styles.sponsored}>
      {hasKey(sponsor, 'link.href') ? (
        <Link href={getKey(sponsor, 'link.href', '')} target="_blank">
          {SponsorImageElement}
        </Link>
      ) : (
        SponsorImageElement
      )}
    </div>
  );
  // e.g.: Author1, Author2 y Author3 || Author1, Author2 and Author3
  const authorDelimeter = ',';
  const authorDelimeterLast = localization.get('and', { language });
  const oneAuthor = totalAuthors.length === 1;
  const lastDelimitedAuthor = totalAuthors.length - 2;
  // e.g.: Por: ...authors || By: ...authors
  const displayBy = (
    <span className={classnames('uvs-font-c-regular', Styles.by, { [Styles.isWorldCupMVP]: isWorldCupMVP })}>
      {`${localization.get('by', { language })}: `}
    </span>
  );
  const authorClassNames = classnames(Styles.articleAuthor, 'uvs-font-c-regular', authorClassName, { [Styles.isWorldCupMVP]: isWorldCupMVP });
  const displayAuthors = isValidArray(totalAuthors)
    ? totalAuthors.map((content, index) => (
      <span className={`uvs-font-c-regular ${Styles.articleAuthorCont}`} key={`${content.uid}`}>
        <Author className={authorClassNames} {...content} />
        {index < totalAuthors.length && index !== lastDelimitedAuthor && (
          <span className={Styles.authorSeparator}>{authorDelimeter}</span>
        )}
        {index === lastDelimitedAuthor && (
          <span className={Styles.authorSeparatorLast}>{authorDelimeterLast}</span>
        )}
      </span>
    ))
    : null;

  if (sponsor && !isValidArray(totalAuthors)) {
    return sponsorEl;
  }

  return (
    <Fragment>
      {sponsorEl}
      <div className={Styles.authors}>
        {showAvatar && oneAuthor && authorAvatar && (
          <div
            className={isTelevisaSite ? Styles.avatarTelevisa : Styles.avatar}
            style={{
              backgroundImage: `url(${authorAvatar})`,
            }}
          />
        )}
        <div className={classnames(Styles.authorsDate,
          { [Styles.lineal]: videoMeta })}
        >
          {isValidArray(displayAuthors) && oneAuthor && (
            <span className={`uvs-font-c-regular ${Styles.author}`} itemProp="author">
              <div className={Styles.oneAuthor}>
                {displayBy}
                <span itemProp="name">{displayAuthors}</span>
                {authorTwitter && <TwitterFollow twitterUrl={authorTwitter} windowSize={520} />}
              </div>
              {inlineDate && dateEl}
            </span>
          )}
          {isValidArray(displayAuthors) && !oneAuthor && (
            <div className={classnames(Styles.multiContainer, Styles.active)}>
              <div className={Styles.authorContainer}>
                {displayBy}
                {displayAuthors}
              </div>
              {inlineDate && dateEl}
            </div>
          )}
          {!inlineDate && dateEl}
        </div>
      </div>
    </Fragment>
  );
};

MultiAuthorDisplay.propTypes = {
  authors: PropTypes.array,
  authorClassName: PropTypes.string,
  date: PropTypes.string,
  dateClassName: PropTypes.string,
  hidePublishDate: PropTypes.bool,
  inlineDate: PropTypes.bool,
  language: PropTypes.string,
  showAvatar: PropTypes.bool,
  showUpdateDate: PropTypes.bool,
  source: PropTypes.string,
  sponsor: PropTypes.object,
  tempAuthors: PropTypes.array,
  updateDate: PropTypes.string,
  videoMeta: PropTypes.bool,
};

MultiAuthorDisplay.defaultProps = {
  language: 'es',
  showAvatar: true,
  hidePublishDate: false,
  showUpdateDate: false,
  sponsor: null,
  updateDate: null,
};

export default MultiAuthorDisplay;
