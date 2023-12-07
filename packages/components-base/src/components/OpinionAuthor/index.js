import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import classnames from 'classnames';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { exists, getKey, hasKey } from '@univision/fe-commons/dist/utils/helpers';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import Link from '../Link';
import aspectRatios from '../Picture/aspectRatios';
import Author from '../Author';
import { EmptyPlaceholder } from '../Placeholder';
import Styles from './OpinionAuthor.scss';

/**
 * Opinion author component
 * @returns {JSX}
 */
const OpinionAuthor = ({
  author, language, opinionText, theme,
}) => {
  if (!author) {
    return null;
  }
  /**
   * Twitter follow component
   */
  const TwitterFollow = Loadable({
    loader: () => import(/* webpackChunkName: "twitterFollow" */ '../TwitterFollow'),
    loading: EmptyPlaceholder,
  });

  const authorImage = getRenditionUrl(getKey(author, 'image.renditions.original', {}), aspectRatios['16x9'].xxsm);

  let twitterUrl = null;
  if (hasKey(author, 'socialNetworks.twitterUrl.url')) {
    twitterUrl = author.socialNetworks.twitterUrl.url;
  }

  return (
    <div className={Styles.container}>
      {authorImage && (
        <div className={Styles.avatar} style={{ backgroundImage: `url(${authorImage})` }} />
      )}
      <div className={Styles.meta}>
        <Link
          href="https://univision.com/temas/opinion"
          className={classnames(Styles.opinion, { [Styles.hasTwitter]: exists(twitterUrl) })}
          style={{ color: theme.primary }}
        >
          {localization.get('opinion', { language })}
        </Link>
        <div className={Styles.info}>
          <Author {...author} className={Styles.author} />
          {exists(twitterUrl) && <TwitterFollow twitterUrl={twitterUrl} windowSize={520} />}
        </div>
        {opinionText && <div className={Styles.opinionText}>{opinionText}</div>}
      </div>
    </div>
  );
};

OpinionAuthor.propTypes = {
  author: PropTypes.object.isRequired,
  language: PropTypes.string,
  opinionText: PropTypes.string,
  theme: PropTypes.object,
};

OpinionAuthor.defaultProps = {
  language: localization.getCurrentLanguage(),
  theme: {},
};

export default OpinionAuthor;
