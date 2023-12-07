import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import classnames from 'classnames';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import truncateString from '@univision/fe-utilities/helpers/string/truncateString';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import { SPRING_GREEN, TROPICAL_RAIN_FOREST } from '@univision/fe-utilities/styled/constants';
import getWidgetFlavorTheme from '@univision/fe-commons/dist/utils/helpers/widget/getWidgetFlavorTheme';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import widgetFlavor from '@univision/fe-commons/dist/constants/widgetFlavors';
import features from '@univision/fe-commons/dist/config/features';
import WidgetTitle from '../../WidgetTitle';
import ListContainer from './ListContainer';
import Styles from './ListEnhancement.styles';
import FullWidth from '../../../FullWidth';
import WidgetLogo from '../../WidgetLogo';

import Link from '../../../Link';

const StickyAdWrapper = styled.div`
  ${Styles.stickyAdWrapper}
`;
const AdBackground = styled.div`
  ${Styles.adBackground}
`;
const Wrapper = styled(FullWidth)`
  ${Styles.wrapper}
`;
export const ButtonLinkWidget = styled(Link).attrs({ className: 'uvs-font-c-bold' })`${Styles.buttonLink}`;

// Used as a security measure
const LIST_FALLBACK_CONTENT_LIMIT = 6;

/**
 * List Enhancement component
 * @param {Object} props of the component
 * @param {array} [props.content] - the widgets content
 * @param {string} [props.currentPageUri] -  the current page uri
 * @param {string} [props.device] - the device currently on
 * @param {Object} [props.settings] - the widgets settings
 * @param {Object} [props.theme] - the widget theme
 * @param {Object} [props.widgetContext] - the widgets context object
 * @returns {JSX}
 */
const ListEnhancement = ({
  content,
  contentLimit,
  currentPageUri,
  device,
  settings,
  theme,
  widgetContext,
}) => {
  const pageLimit = contentLimit > 0 ? contentLimit : LIST_FALLBACK_CONTENT_LIMIT;
  const isDesktop = device === 'desktop';
  const enhancedWidgetContext = {
    ...widgetContext,
    name: `${widgetContext?.name}2`,
  };
  const {
    buttonLabel,
    flavor,
    titleLink,
  } = settings;
  const uriTitle = titleLink?.href;
  const prendeTvTracking = useCallback(() => {
    const title = truncateString(widgetContext?.title, { maxChars: 50 });
    if (flavor === widgetFlavor?.FLAVOR_PRENDE_TV) {
      WidgetTracker.track(WidgetTracker.events.click, {
        widgetContext: {
          ...widgetContext,
          title,
        },
        target: 'prendetv_cta_external',
        contentTitle: title,
        contentUid: widgetContext?.uid || widgetContext?.id,
        extraData: {
          destination_url: uriTitle,
        },
        eventLabel: 'Widget_PosTitle',
      });
    }
  }, [flavor, widgetContext, uriTitle]);
  if (!isValidArray(content)) return null;
  const flavorTheme = getWidgetFlavorTheme(flavor);
  let widgetTheme = isValidObject(flavorTheme) ? flavorTheme : theme;
  widgetTheme = isValidObject(flavorTheme?.widgetTheme) ? flavorTheme?.widgetTheme : widgetTheme;
  widgetTheme = {
    ...widgetTheme,
    ...(widgetContext?.isWorldCupMVP && {
      gradient: { end: SPRING_GREEN, start: SPRING_GREEN },
    }),
  };
  const {
    widgetBackgroundImage,
    isDark,
    primary,
    widgetLogo,
    enablePadding,
    vixLogo,
  } = widgetTheme;
  // Makes the main column span all across the container when a flavor value is present
  const containerClassName = classnames({
    'col-12': true,
    'col-md-8': !flavor,
  });
  const isVix = features.widgets.isVixEnabled();
  let logo;
  if (flavor === widgetFlavor.FLAVOR_PRENDE_TV) {
    widgetTheme.isDark = isVix;
    logo = isVix ? vixLogo : widgetLogo;
  }
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  return (
    <ThemeProvider theme={widgetTheme}>
      <Wrapper
        backgroundImage={widgetBackgroundImage}
        flavor={flavor}
        isDark={isDark}
        primary={primary}
        enablePadding={enablePadding}
      >
        <div className="uvs-container">
          <WidgetLogo logo={logo} width={89} height={34} />
          <WidgetTitle
            title={truncateString(getKey(settings, 'title'), 35, '…', true, false)}
            titleLink={uriTitle}
            target={titleLink?.target}
            onClickTitleHandler={prendeTvTracking}
            isTitleCase={isWorldCupMVP}
          />
          <div className="row">
            <div className={containerClassName}>
              <ListContainer
                content={content}
                currentPageUri={currentPageUri}
                device={device}
                flavor={flavor}
                pageLimit={pageLimit}
                theme={widgetTheme}
                widgetContext={enhancedWidgetContext}
              />
            </div>
            {isVix && flavor === widgetFlavor?.FLAVOR_PRENDE_TV && (
              <div>
                <ButtonLinkWidget
                  href={uriTitle}
                  isWorldCupMVP={isWorldCupMVP}
                  onClick={prendeTvTracking}
                  target={titleLink?.target}
                >
                  {buttonLabel}
                </ButtonLinkWidget>
              </div>
            )}
            {(isDesktop && !flavor) && (
              <aside className="col-md-4">
                <AdBackground>
                  <StickyAdWrapper>
                    {adHelper.getAd(AdTypes.LIST_WIDGET_AD, { hasBg: false })}
                  </StickyAdWrapper>
                </AdBackground>
              </aside>
            )}
          </div>
        </div>
      </Wrapper>
    </ThemeProvider>
  );
};

ListEnhancement.propTypes = {
  content: PropTypes.array,
  contentLimit: PropTypes.number,
  currentPageUri: PropTypes.string,
  device: PropTypes.oneOf(['desktop', 'mobile', 'tablet']),
  settings: PropTypes.object,
  theme: PropTypes.object,
  widgetContext: PropTypes.object,
};

ListEnhancement.defaultProps = {
  content: [],
  contentLimit: LIST_FALLBACK_CONTENT_LIMIT,
  device: 'mobile',
  settings: {},
  theme: {
    primary: TROPICAL_RAIN_FOREST,
  },
};

export default ListEnhancement;
