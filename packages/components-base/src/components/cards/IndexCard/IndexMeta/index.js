import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '@univision/fe-icons/dist/components/Icon';
import {
  GREY_BLACK,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';

import getMetaOptions from './helpers/getMetaOptions';
import Styles from './IndexMeta.styles';

const Container = styled.div`
  ${Styles.container}
`;
const Label = styled.span`
  ${Styles.label}
`;

/**
 * Index card Meta content component
 * The content string and icon are handled by the getMetaOptions helper
 * @param {Object} props - props of the component
 * @property {string} props.durationString - video duration string
 * @property {boolean} props.isDark - flag to enable dark mode in the component
 * @property {int} props.readTime - article read time
 * @property {string} props.slideCount - slideshow number of slides
 * @property {string} props.type - content type
 * @returns {JSX}
 */
const IndexMeta = ({
  durationString,
  isDark,
  readTime,
  slideCount,
  type,
}) => {
  const metaOptions = getMetaOptions({
    type,
    readTime,
    durationString,
    slideCount,
  });

  if (!isValidObject(metaOptions)) {
    return null;
  }

  return (
    <Container className="uvs-font-c-regular">
      <Icon
        name={metaOptions.icon.name}
        size={metaOptions.icon.size}
        fill={isDark ? WHITE : GREY_BLACK}
      />
      <Label isDark={isDark}>
        {metaOptions.content}
      </Label>
    </Container>
  );
};

IndexMeta.propTypes = {
  durationString: PropTypes.string,
  isDark: PropTypes.bool,
  readTime: PropTypes.number,
  slideCount: PropTypes.number,
  type: PropTypes.string,
};

export default IndexMeta;
