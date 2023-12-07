import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import { exists } from '@univision/fe-commons/dist/utils/helpers';
import Description from '@univision/fe-components-base/dist/components/Description';
import Truncate from '@univision/fe-components-base/dist/components/Truncate';

import Styles from './ContentHeader.scss';

/**
 * ContentHeader - title, description, cover image
 * @param {Object} props component props
 * @returns {JSX}
 */
const ContentHeader = ({
  activeSlideNumber,
  className,
  dark,
  description,
  endSlideNumber,
  reaction,
  renderSimpleStatus,
  richTextDescription,
  title,
  type,
}) => {
  return (
    <ErrorBoundary>
      <div className={classnames(Styles.articleHeader, className)}>
        <header className={classnames(Styles.header, { [Styles.dark]: dark })}>
          {exists(title) && (
            <h1 className={Styles.title} itemProp="headline">
              {title}
            </h1>
          )}
          {type === 'slide' && reaction && (
            <div className={Styles.statusText}>
              <div>
                <em>{activeSlideNumber}</em> de {endSlideNumber}
              </div>
            </div>
          )}
          {type === 'slide' && exists(description) && (
            <div className={Styles.truncateContainer}>
              {renderSimpleStatus && renderSimpleStatus()}
              <Truncate
                className={Styles.truncate}
                text={description}
                trimLength={120}
                expandPosition={reaction ? 'left' : 'right'}
              />
            </div>
          )}
          {type === 'default' && exists(description) && (
            <Description
              size="large"
              className={Styles.description}
              richTextDescription={richTextDescription}
            >
              {description}
            </Description>
          )}
        </header>
      </div>
    </ErrorBoundary>
  );
};

/**
 * propTypes
 * @property {String} title the title of the article
 * @property {String} description the short description of the article
 * @property {Array} richTextDescription the rich text short description of the article
 * @property {String} className additional class
 * @property {Object} reaction object for reaction view
 * @property {String} type header type
 */
ContentHeader.propTypes = {
  activeSlideNumber: PropTypes.number,
  className: PropTypes.string,
  dark: PropTypes.bool,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  endSlideNumber: PropTypes.number,
  reaction: PropTypes.object,
  renderSimpleStatus: PropTypes.func,
  richTextDescription: PropTypes.array,
  title: PropTypes.string,
  type: PropTypes.oneOf(['default', 'slide']),
};

ContentHeader.defaultProps = {
  className: '',
  dark: false,
  type: 'default',
};

export default ContentHeader;
