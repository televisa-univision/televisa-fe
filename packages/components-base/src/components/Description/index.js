import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import hasKey from '@univision/fe-utilities/helpers/object/hasKey';

import RichText from '../RichText';
import Styles from './Description.styles';

const RichTextCmpStyled = styled(RichText)`${Styles.richTextCmp}`;
const RichTextStyled = styled.div`${Styles.richText}`;

/**
 * Description base component.
 * @param {Object} props React Props for this component
 * @param {Node} props.children Components to mount
 * @param {string} props.className class name modifier for the Component
 * @param {Array} props.rich text description to render
 * @param {string} props.strip indicates if the tag html will remove or not
 * @param {string} props.size of title Component
 * @returns {JSX}
 */
const Description = (props) => {
  const {
    children,
    className,
    richTextDescription,
    strip,
    size,
  } = props;

  /**
   *  Rich Text Description
   */
  if (isValidArray(richTextDescription)) {
    const richTextChildren = richTextDescription
      .filter(child => hasKey(child, 'value'))
      .map((validChild, i) => {
        const key = `description${i}`;
        return (
          <RichTextStyled
            key={key}
            className={`uvs-font-a-light ${className}`}
            dangerouslySetInnerHTML={{__html: validChild.value}} // eslint-disable-line
            size={size}
            itemProp="description"
          />
        );
      });
    if (richTextChildren.length) {
      return (
        <>
          { richTextChildren }
        </>
      );
    }
  }
  /**
   * Default Description
   */
  return (
    <RichTextCmpStyled
      strip={strip}
      html={children}
      className={`uvs-font-a-light ${className}`}
      size={size}
      itemProp="description"
    />
  );
};

Description.propTypes = {
  children: PropTypes.node.isRequired,
  strip: PropTypes.bool,
  className: PropTypes.string,
  richTextDescription: PropTypes.array,
  size: PropTypes.oneOf(['small', 'regular', 'large']),
};

/**
 * Default Prop Values
 */
Description.defaultProps = {
  strip: false,
  className: '',
  size: 'regular',
};

export default Description;
