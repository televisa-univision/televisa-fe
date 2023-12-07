import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Store from '@univision/fe-commons/dist/store/store';
import { getPageData } from '@univision/fe-commons/dist/store/storeHelpers';

import { exists, isValidArray, getKey } from '@univision/fe-commons/dist/utils/helpers';

import Link from '../../../Link';
import Styles from './Breadcrumb.scss';

/**
 * Breadcrumb component
 * @param {Object} props of the component
 * @returns {JSX}
 */
const Breadcrumb = ({ variant, links }) => {
  const list = isValidArray(links) && links.map((element, idx) => {
    const key = idx + 1;
    return exists(element.link) && exists(element.name) && (
      <Link
        key={`breadcrumb-link-${key}`}
        href={element.link}
        className={`${Styles.link} ${Styles[`link-variant-${variant}`]} uvs-font-a-bold`}
      >
        {element.name}
      </Link>
    );
  });

  return (
    <div className={`${Styles.wrapper} ${Styles[`wrapper-${variant}`]}`}>
      <div className="uvs-container">
        <div className="row">
          <div className={
            classnames(
              Styles.container,
              'col',
              { [Styles.offset]: getKey(getPageData(Store), 'data.type') !== 'video' }
            )}
          >
            {list}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Breadcrumb prop types
 */
Breadcrumb.propTypes = {
  links: PropTypes.array,
  variant: PropTypes.oneOf([
    'light',
    'dark',
  ]),
};

Breadcrumb.defaultProps = {
  variant: 'dark',
  links: [],
};

export default Breadcrumb;
