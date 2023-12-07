import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from '../../Link';
import Title from '../../Title';

import Styles from './WidgetTitle.styles';

const TitleStyled = styled(Title)`
  ${Styles.title}
`;

/**
 * Carousel Widget
 * @param {Object} props - component props
 * @param {bool} props.hidden - hides this element when enableds
 * @param {bool} props.isDark - isDark version
 * @param {bool} props.listGrid - is a listGrid
 * @param {string} props.target - link target
 * @param {string} props.title - title to show
 * @param {string} props.onClickTitleHandler - func to be executed when title clicked
 * @param {Object} props.titleLink - link to redirect
 * @param {bool} [props.isTitleCase] - if true, it will render the title with capitalize
 * @returns {JSX}
 */
const WidgetTitle = ({
  hidden,
  isDark,
  listGrid,
  onClickTitleHandler,
  singleCard,
  target,
  title,
  titleLink,
  isTitleCase,
}) => (
  <TitleStyled
    element="h2"
    hidden={hidden}
    isDark={isDark}
    listGrid={listGrid}
    isTitleCase={isTitleCase}
    singleCard={singleCard}
  >
    {titleLink ? (
      <Link onClick={onClickTitleHandler} href={titleLink} target={target}>
        {title}
      </Link>
    ) : (
      title
    )}
  </TitleStyled>
);

WidgetTitle.propTypes = {
  hidden: PropTypes.bool,
  isDark: PropTypes.bool,
  isTitleCase: PropTypes.bool,
  listGrid: PropTypes.bool,
  onClickTitleHandler: PropTypes.func,
  singleCard: PropTypes.bool,
  target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top']),
  title: PropTypes.string,
  titleLink: PropTypes.string,
};

WidgetTitle.defaultProps = {
  target: '_self',
};

export default WidgetTitle;
