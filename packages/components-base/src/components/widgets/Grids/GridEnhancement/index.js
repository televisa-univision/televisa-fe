import React, {
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import truncateString from '@univision/fe-utilities/helpers/string/truncateString';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import Button from '@univision/shared-components/dist/components/v3/Button';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';
import { SPRING_GREEN, TROPICAL_RAIN_FOREST } from '@univision/fe-utilities/styled/constants';
import features from '@univision/fe-commons/dist/config/features';

import Link from '../../../Link';

import WidgetTitle from '../../WidgetTitle';
import GridCardsContainer from './GridCardsContainer';
import Styles from './GridEnhancement.styles';

const GridContainer = styled.div`
  ${Styles.gridContainer}
`;
const DarkContainer = styled.div`
  ${Styles.darkContainer}
`;
const ButtonWrapperStyled = styled.div`
  ${Styles.buttonWrapper}
`;
const LinkStyled = styled(Link)`
  ${Styles.linkStyled}
`;

/**
 * Grid Enhancement widget
 * @param {Object} props - component props
 * @param {string} [props.breakpoint] - current breakpoint
 * @param {Object[]} props.content - card data
 * @param {string} props.device - device currently on
 * @param {Object} props.settings - widget settings
 * @param {Object} props.theme - the widget theme
 * @param {Object} [props.widgetContext] - widget context settings
 * @param {Array} [props.widgets] - widgets on page for ad injection
 * @returns {JSX}
 */
export const GridEnhancement = ({
  breakpoint,
  content,
  device,
  theme,
  settings,
  shouldInjectTopAd,
  widgetContext,
}) => {
  const {
    seeMoreLink, listTitle, listGrid, title,
  } = settings;
  const isMobile = device === 'mobile';
  const isDark = theme?.isDark || false;
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  const buttonType = isDark ? 'containedTextIcon' : 'containedText';
  const mainCardSize = isMobile ? MEDIUM : LARGE;
  const otherCardSize = device === 'tablet' && breakpoint === 'sm' ? MEDIUM : SMALL;
  const enhancedWidgetContext = Object.assign(widgetContext, {
    name: `${widgetContext?.name}2`,
  });

  /**
   * change gradient for button only flag MVP
   */
  const widgetTheme = {
    ...theme,
    ...(isWorldCupMVP && {
      gradient: { end: SPRING_GREEN, start: SPRING_GREEN },
    }),
  };

  /**
   * See more Tracking function
   */
  const seeMoreTracking = useCallback(() => {
    CardTracker.onClickHandler(
      { title: '', uid: '' },
      enhancedWidgetContext,
      'ver_mas'
    )();
  }, [enhancedWidgetContext]);

  return (
    <ThemeProvider theme={widgetTheme}>
      <GridContainer isDark={isDark}>
        {isDark && <DarkContainer />}
        {
          title && (
            <WidgetTitle
              titleLink={getKey(settings, 'titleLink.href', '')}
              title={truncateString(title, 35, '…', true)}
              isTitleCase={isWorldCupMVP}
            />
          )
        }
        <GridCardsContainer
          content={content}
          device={device}
          isDark={isDark}
          breakpoint={breakpoint}
          shouldRenderAd={shouldInjectTopAd}
          widgetContext={enhancedWidgetContext}
          listGrid={listGrid}
          listTitle={listTitle}
          mainCardSize={mainCardSize}
          otherCardSize={otherCardSize}
          theme={widgetTheme}
        />
        {isValidObject(seeMoreLink) && (
          <ButtonWrapperStyled isWorldCupMVP={isWorldCupMVP}>
            <LinkStyled
              useExplicitNavigation
              {...seeMoreLink}
            >
              <Button
                onPress={seeMoreTracking}
                type={buttonType}
                isOutlined={isDark}
                useIcon={false}
                theme={widgetTheme}
              >
                {localization.get('seeMore')}
              </Button>
            </LinkStyled>
          </ButtonWrapperStyled>
        )}
      </GridContainer>
    </ThemeProvider>
  );
};

GridEnhancement.propTypes = {
  breakpoint: PropTypes.string,
  commonRootSection: PropTypes.object,
  content: PropTypes.arrayOf(PropTypes.object),
  device: PropTypes.oneOf(['desktop', 'mobile', 'tablet']),
  settings: PropTypes.shape({
    seeMoreLink: PropTypes.object,
    title: PropTypes.string,
    listGrid: PropTypes.bool,
    listTitle: PropTypes.string,
  }),
  shouldInjectTopAd: PropTypes.bool,
  theme: PropTypes.object,
  widgetContext: PropTypes.object,
};

GridEnhancement.defaultProps = {
  device: 'mobile',
  widgetContext: {},
  theme: {
    primary: TROPICAL_RAIN_FOREST,
  },
};

export default GridEnhancement;
