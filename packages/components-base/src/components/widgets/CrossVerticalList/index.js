import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

import { ASTRONAUT } from '@univision/fe-utilities/styled/constants';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';

import localization from '@univision/fe-utilities/localization';
import ListCard from '../../cards/SquareCards/ListCard';
import Link from '../../Link';
import { CROSS_VERTICAL_PROMO } from './CrossVerticalConstants';
import Styles from './CrossVerticalList.styles';

const Title = styled.div.attrs({
  className: 'uvs-font-a-black',
})`${Styles.title}`;
const TitleWrapper = styled.div`${Styles.titleWrapper}`;
const VerticalCardWrapper = styled.div`${Styles.verticalCardWrapper}`;
const CrossVerticalListWrapper = styled.div`${Styles.crossVerticalListWrapper}`;
const Row = styled.div`${Styles.row}`;

/**
 * CrossVerticalList widget
 *
 * @param {Object} props - component props
 * @returns {JSX}
 */
const CrossVerticalList = ({
  content,
  settings,
  theme,
  widgetContext,
}) => {
  const title = settings?.title || localization.get('moreWatched');
  const { isDark, primary } = theme;
  const titleColor = primary || ASTRONAUT;
  const titleLink = settings?.titleLink?.href;
  const targetLink = settings?.titleLink?.target || '_self';
  const verticalCards = useMemo(() => {
    if (!isValidArray(content)) return null;
    return content.map((contentCard, index) => {
      const isPromo = contentCard?.type === CROSS_VERTICAL_PROMO;
      return (
        <VerticalCardWrapper
          key={contentCard?.uid}
          item={index}
        >
          <ListCard
            {...contentCard}
            widgetContext={widgetContext}
            isDark={isDark || isPromo}
            hideActionBar={isPromo}
            listGrid
          />
        </VerticalCardWrapper>
      );
    });
  }, [content, widgetContext, isDark]);
  const trackClick = CardTracker.onClickHandler(
    { uid: '', title: '' },
    widgetContext
  );

  return (
    <ThemeProvider theme={theme}>
      <CrossVerticalListWrapper>
        <TitleWrapper onClick={trackClick}>
          <Title color={titleColor} isDark={isDark}>
            <Link target={targetLink} href={titleLink}>{title}</Link>
          </Title>
        </TitleWrapper>
        <Row>
          {verticalCards}
        </Row>
      </CrossVerticalListWrapper>
    </ThemeProvider>
  );
};

CrossVerticalList.propTypes = {
  content: PropTypes.array,
  settings: PropTypes.object,
  theme: PropTypes.object,
  widgetContext: PropTypes.object,
};

CrossVerticalList.defaultProps = {
  theme: {},
};

export default CrossVerticalList;
