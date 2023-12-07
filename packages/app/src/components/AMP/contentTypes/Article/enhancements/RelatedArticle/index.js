import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import shareButtonDataHelper
  from '@univision/fe-components-base/dist/components/ShareButton/shareButtonDataHelper';
import PropTypes from 'prop-types';
import React from 'react';
import defaultImage from '@univision/fe-commons/dist/assets/images/default-content-image.png';

import AmpIcon from '../../../../Icon';
import {
  InnerWrapper,
  LeftColumn,
  RelatedArticle,
  Separator,
  Share,
  ShareButtons,
} from './RelatedArticle.styles';

/**
 * RelatedArticle enhancement
 * @param {Object} props the component props
 * @returns {JSX}
 */
function AmpRelatedArticle({
  uri,
  title,
  image,
  sharing,
  theme,
}) {
  return (
    <RelatedArticle>
      <InnerWrapper>
        <LeftColumn>
          <div>
            <h4>
              <Separator theme={theme} />
              <span>{localization.get('related')}</span>
            </h4>
            <h5 className="uvs-font-a-bold">
              <a href={uri}>{title}</a>
            </h5>
          </div>
          <Share>
            <span>{localization.get('share')}</span>
            <ShareButtons>
              <a {...shareButtonDataHelper('facebook', sharing.options)}>
                <AmpIcon name="facebook" fill="#a2a2a2" />
              </a>
              <a {...shareButtonDataHelper('twitter', sharing.options)}>
                <AmpIcon name="twitter" fill="#a2a2a2" />
              </a>
              <a {...shareButtonDataHelper('mail', sharing.options)}>
                <AmpIcon name="mail" fill="#a2a2a2" />
              </a>
            </ShareButtons>
          </Share>
        </LeftColumn>
        {image && (
          <div>
            <a href={uri}>
              <amp-img
                src={getKey(image, 'renditions.16x9-med.href', defaultImage)}
                width="400"
                height="225"
                layout="responsive"
                alt={title}
              />
            </a>
          </div>
        )}
      </InnerWrapper>
    </RelatedArticle>
  );
}

AmpRelatedArticle.propTypes = {
  uri: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.object,
  sharing: PropTypes.object,
  alignment: PropTypes.oneOf(['left', 'right']),
  onClick: PropTypes.func,
  theme: PropTypes.object,
  lazyLoad: PropTypes.bool,
  showShare: PropTypes.bool,
  isLiveBlog: PropTypes.bool,
};

AmpRelatedArticle.defaultProps = {
  sharing: {},
  lazyLoad: true,
  showShare: false,
  isLiveBlog: false,
};

export default AmpRelatedArticle;
