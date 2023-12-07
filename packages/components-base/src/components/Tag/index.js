import features from '@univision/fe-commons/dist/config/features';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Link from '../Link';
import Styles from './Tag.scss';

/**
 * RelatedTags
 * @param {Object} props component props
 * @returns {JSX}
 */
const Tag = ({
  link, name, className, style, onClick,
}) => {
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  const tagName = <span style={style} className={classnames({ [Styles.isWorldCupMVP]: isWorldCupMVP }, Styles.text, 'uvs-font-c-bold', className)}>{name}</span>;
  if (link) {
    return (
      <Link href={link} onClick={onClick} className={Styles.link}>
        {tagName}
      </Link>
    );
  }
  return tagName;
};

/**
 * propTypes
 * @property {string} className css class for styling override
 * @property {array} contents Array of content items to be used by this component
 * @property {Object} style have theme of the tag
 */
Tag.propTypes = {
  className: PropTypes.string,
  link: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

/**
 * Default Prop Values
 */
Tag.defaultProps = {
  className: '',
};
export default Tag;
