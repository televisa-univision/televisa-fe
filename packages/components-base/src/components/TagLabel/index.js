import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import Icon from '@univision/fe-icons/dist/components/Icon';
import features from '@univision/fe-commons/dist/config/features';

import Link from '../Link';

import Styles from './TagLabel.styles';

const LabelStyled = styled.div`${Styles.label}`;
const IconStyled = styled(Icon)`${Styles.icon}`;

/**
 * Basic primary tag element component
 * e.g. used on {@link ArticleBody}
 * @param {Object} props - react Props for this component
 * @returns {JSX}
 * @constructor
 */
const TagLabel = ({
  tag, style, className, icon, onClick, fontClass,
}) => {
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  if (isValidObject(tag)) {
    const tagLink = tag.link || tag.uri || '#';
    const tagName = tag.title || tag.name;
    return (
      <Link href={tagLink} onClick={onClick} className="uvs-text-hover" checkUserLocation>
        <LabelStyled className={`${className} ${fontClass || 'uvs-font-c-bold'}`} style={style} isWorldCupMVP={isWorldCupMVP}>
          {icon && <IconStyled name={icon} size="xsmall" key={icon} />}
          {tagName}
        </LabelStyled>
      </Link>
    );
  }
  return null;
};

TagLabel.propTypes = {
  className: PropTypes.string,
  fontClass: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  tag: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    link: PropTypes.string,
    uri: PropTypes.string,
  }).isRequired,
};

export default TagLabel;
