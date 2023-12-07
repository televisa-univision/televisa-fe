import PropTypes from 'prop-types';
import React from 'react';

import { exists, hasKey } from '@univision/fe-commons/dist/utils/helpers';
import Link from '../Link';
import TopicBar from '../TopicBar';
import Styles from './NumericList.scss';

/**
 * Numeric List
 * @param {Object} props component props
 * @returns {JSX}
 */
const NumericList = ({ title, className, contents }) => {
  const settings = exists(title) ? { title } : {};
  return (
    <div className={`${Styles.wrapper} ${className}`}>
      {exists(title) && (
        <TopicBar
          settings={settings}
          align="center"
          separator="bottom"
          className={Styles.topicModifier}
        />
      )}
      {exists(contents) && (
        <ol className={Styles.list}>
          {contents
            .filter(content => exists(content.title))
            .slice(0, 5)
            .map((content) => {
              let itemLink = null;
              if (hasKey(content, 'link.href')) {
                itemLink = content.link.href;
              } else if (hasKey(content, 'uri')) {
                itemLink = content.uri;
              }
              return (
                <li key={exists(content.uid) && content.uid} className={Styles.listItem}>
                  {
                    <Link href={itemLink} className={Styles.text}>
                      {content.title}
                    </Link>
                  }
                </li>
              );
            })}
        </ol>
      )}
    </div>
  );
};

/**
 * propTypes
 * @property {string} className css class for styleing override
 * @property {string} title for topic bar to be used by this widget
 * @property {array} contents Array of content items to be used by this widget
 */
NumericList.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  contents: PropTypes.array,
};

/**
 * Default Prop Values
 */
NumericList.defaultProps = {
  className: '',
};
export default NumericList;
