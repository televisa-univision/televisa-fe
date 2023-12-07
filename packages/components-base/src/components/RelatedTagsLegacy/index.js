import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import features from '@univision/fe-commons/dist/config/features';
import Tag from '../Tag';

import Styles from './RelatedTags.scss';

/**
 * RelatedTags
 * @param {Object} props component props
 * @returns {JSX}
 */
const RelatedTags = ({ className, contents }) => {
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  return (
    <ErrorBoundary>
      <div className={classnames(Styles.wrapper, className, 'uvs-font-a-regular')}>
        <div className="row no-gutters">
          <div className={classnames('col', Styles.content)}>
            <span className={Styles.title}>
              {localization.get('related').toUpperCase()}
:
            </span>
            {contents.slice(0, 5).map((content) => {
              return [
                <Tag className={classnames({ [Styles.isWorldCupMVP]: isWorldCupMVP }, Styles.tag)} key="tag" link={content.link} name={content.name} />,
                <span key="sep" className={Styles.separator}>
                  &bull;
                </span>,
              ];
            })}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

/**
 * propTypes
 * @property {string} className css class for styling override
 * @property {array} contents Array of content items to be used by this widget
 */
RelatedTags.propTypes = {
  className: PropTypes.string,
  contents: PropTypes.array,
};

/**
 * Default Prop Values
 */
RelatedTags.defaultProps = {
  className: '',
  contents: [],
};
export default RelatedTags;
