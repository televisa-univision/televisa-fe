import React from 'react';
import PropTypes from 'prop-types';

import Title from '@univision/fe-components-base/dist/components/Title';

/**
 * Page Main Title component.
 * Will render the SEO title as a hidden item, if no SEO title is set
 * will fall back to default page title. If tvStation title value is
 * available, it will also be rendered as a secondary item
 * @param {Object} props - props of the component
 * @property {Object} seo - page SEO information object
 * @property {string} title - page title
 * @property {Object} tvStation - local tv station information object
 * @returns {JSX}
 */
const PageTitle = ({
  seo,
  title,
  tvStation,
}) => {
  const { title: seoTitle } = seo;
  const { title: tvStationTitle } = tvStation;

  return (
    <>
      <Title hidden element="h1">
        {seoTitle || title}
      </Title>
      {tvStationTitle && (
        <Title hidden element="h2">
          {tvStationTitle}
        </Title>
      )}
    </>
  );
};

PageTitle.propTypes = {
  seo: PropTypes.shape({
    title: PropTypes.string,
  }),
  title: PropTypes.string,
  tvStation: PropTypes.shape({
    title: PropTypes.string,
  }),
};

PageTitle.defaultProps = {
  seo: {},
  tvStation: {},
};

export default PageTitle;
