import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { globalComponents } from '@univision/fe-commons/dist/config';
import { exists, truncateString } from '@univision/fe-commons/dist/utils/helpers';

import Link from '../../../Link';
import Title from '../../../Title';

import TopicBar from '../../../TopicBar';

import Styles from './Default.scss';

/**
 * Placeholder component for widgets
 * @param {Object} props Props object containing data
 * @returns {JSX}
 * @constructor
 */
const Default = (props) => {
  const { content, settings, theme } = props;
  let placeholderList;
  if (Array.isArray(content) && content.length) {
    placeholderList = content.slice(0, 10).map((item, idx) => {
      const id = `${item.id}-${idx}`;
      const { parent } = item;
      const tagName = parent?.title;
      const tagUrl = parent?.uri;
      return (
        <div className="col-sm-6 col-md-3" key={id}>
          <div className={Styles.container}>
            <div className={Styles.image}>
              {(tagName && tagUrl) && (
                <Title className={Styles.title}>
                  <Link
                    href={tagUrl}
                    className={classnames(
                      Styles.tag, 'uvs-text-hover', 'uvs-text-link', 'uvs-font-a-bold'
                    )}
                  >
                    {tagName}
                  </Link>
                </Title>
              )}
            </div>
            <Link href={item.uri} className="uvs-text-hover uvs-text-link uvs-font-a-bold">
              <Title className={Styles.title}>
                {truncateString(item.title, globalComponents.truncate.title, '')}
              </Title>
            </Link>
          </div>
        </div>
      );
    });

    return (
      <div className="uvs-widget uvs-widget-placeholder">
        {exists(settings)
          && exists(settings.title) && (
            <TopicBar
              separator="top"
              settings={{
                title: settings.title,
                titleLink: settings.titleLink,
              }}
              theme={theme}
            />
        )}
        <div className="row">{placeholderList}</div>
      </div>
    );
  }

  return <div />;
};

Default.propTypes = {
  content: PropTypes.array.isRequired,
  theme: PropTypes.object,
  settings: PropTypes.object,
};

export default Default;
