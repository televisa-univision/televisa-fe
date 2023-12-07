import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Meta from '@univision/fe-components-base/dist/components/Meta/Meta';

import Styles from './SlideHeader.scss';

/**
 * Renders header for a horizontal slideshow slide
 * @param {Object} props the component's props
 * @returns {JSX}
 */
const SlideHeader = ({ className, meta, title }) => {
  const classNames = classnames(Styles.headerContainer, className);

  return (
    <div className={classNames}>
      <h1 className={Styles.headerTitle}>{title}</h1>
      {meta && (
        <Meta
          authors={meta.author}
          authorClassName={Styles.author}
          date={meta.date}
          dateClassName={Styles.date}
          inlineDate
          modifierClass={Styles.meta}
          showAvatar={false}
          source={meta.source}
          sponsor={meta.sponsor}
          theme={{ primary: '#fff' }}
        />
      )}
    </div>
  );
};

/**
 * propTypes
 * @property {string} className - The container's CSS class
 * @property {Object} meta - Meta data from this content (Author, date, source and sponsor)
 * @property {string} title - Slideshow title
 */
SlideHeader.propTypes = {
  className: PropTypes.string,
  meta: PropTypes.shape({
    author: PropTypes.array,
    date: PropTypes.string,
    source: PropTypes.string,
    sponsor: PropTypes.shape({
      link: PropTypes.string,
      logo: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
  title: PropTypes.string,
};

export default SlideHeader;
