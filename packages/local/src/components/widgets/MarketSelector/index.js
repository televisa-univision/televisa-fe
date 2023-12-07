import React, { useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CURRENT_LOCAL_MARKET } from '@univision/fe-commons/dist/constants/personalization';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import LocalStorage from '@univision/fe-commons/dist/utils/helpers/LocalStorage';
import marketCoordinates from '@univision/fe-commons/dist/constants/marketCoordinates.json';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import TopicBar from '@univision/fe-components-base/dist/components/TopicBar';
import AnimatedModalBackground from '@univision/fe-components-base/dist/components/AnimatedModalBackground';
import Link from '@univision/fe-components-base/dist/components/Link';
import { trackNavigationClick } from '@univision/fe-components-base/dist/components/Navigation/MegaMenu/helpers';
import Styles from './MarketSelector.styles';

const Container = styled.div`${Styles.container}`;
const MarketTopicBar = styled(TopicBar)`${Styles.marketTopicBar}`;
const MarketButton = styled.div`${Styles.marketButton}`;
const LinksContainer = styled.div`${Styles.linksContainer}`;
const LinkMenu = styled(Link)`${Styles.linkMenu}`;
const LinksDescription = styled.div`${Styles.linkDescription}`;
const LinkList = styled.div`${Styles.LinkList}`;

/**
 * MarketSelector component for MegaMenu
 * @param {Object} props of the component
 * @returns {JSX}
 */
const MarketSelector = ({
  fetchLocalMarketContent,
  hasAdSkin,
  links,
  localMarket,
  isMarketSelectorOpen,
  setMarketSelectorClosed,
  setMarketSelectorOpen,
  setCurrentMarketByLocation,
  isDesktop,
}) => {
  const marketCurrentStorage = LocalStorage.get(CURRENT_LOCAL_MARKET);
  const marketCurrent = marketCurrentStorage || localMarket;

  useEffect(() => {
    if (!marketCurrent && isValidFunction(fetchLocalMarketContent)) {
      fetchLocalMarketContent();
    }
  }, [marketCurrent, fetchLocalMarketContent]);

  const marketToggle = isMarketSelectorOpen ? setMarketSelectorClosed : setMarketSelectorOpen;
  const handleClick = useCallback(() => {
    if (!marketCurrent) {
      marketToggle();
    }
    return false;
  }, [marketCurrent, marketToggle]);
  const settings = useMemo(() => ({
    title: LocalizationManager.get('yourLocalStation'),
    image: getKey(marketCoordinates, `${marketCurrent}.headerLogo`),
    imageLink: {
      href: getKey(marketCoordinates, `${marketCurrent}.uri`),
    },
  }), [marketCurrent]);
  const allMarkets = useMemo(() => Object.keys(marketCoordinates)
    .map(market => ({
      call: market,
      uri: marketCoordinates[market].uri,
    })), []);
  const textChange = isDesktop ? LocalizationManager.get('changeCity') : LocalizationManager.get('toChange');
  const renderLinks = useMemo(() => {
    return (
      <LinksContainer className="uvs-container">
        <LinksDescription>Elige tu ciudad: </LinksDescription>
        <LinkList>
          {isValidArray(links) && links.map((linkItem) => {
            const marketName = getKey(linkItem, 'name');
            const marketLink = getKey(linkItem, 'href');
            const linkMarket = allMarkets.find(market => market.uri === marketLink);

            return (
              <LinkMenu
                className="col-6 col-md-3"
                key={`megaMenuLink${marketName}`}
                onClick={() => {
                  trackNavigationClick(`local-${marketName}`);
                  setCurrentMarketByLocation(getKey(linkMarket, 'call'));
                  setMarketSelectorClosed();
                }}
                href={marketLink}
                site={linkItem.site}
              >
                {marketName}
              </LinkMenu>
            );
          })}
        </LinkList>
      </LinksContainer>
    );
  }, [links, allMarkets, setCurrentMarketByLocation, setMarketSelectorClosed]);

  return (
    <>
      {isDesktop
        && (
        <AnimatedModalBackground
          isVisible={isMarketSelectorOpen}
          onClick={marketToggle}
        />
        )
      }
      <Container hasAdSkin={hasAdSkin}>
        <MarketButton role="button" onClick={handleClick}>
          <MarketTopicBar
            settings={settings}
            cta={{ text: settings.image ? textChange : LocalizationManager.get('viewCitiesList') }}
            size="large"
            variant="dark"
            onClick={() => {
              trackNavigationClick(settings.image ? 'local-list-change' : 'local-list');
              marketToggle();
            }}
            open={isMarketSelectorOpen}
          />
        </MarketButton>
        {isMarketSelectorOpen && renderLinks}
      </Container>
    </>
  );
};

MarketSelector.propTypes = {
  fetchLocalMarketContent: PropTypes.func,
  hasAdSkin: PropTypes.bool,
  setCurrentMarketByLocation: PropTypes.func,
  links: PropTypes.array,
  localMarket: PropTypes.string,
  setMarketSelectorClosed: PropTypes.func,
  setMarketSelectorOpen: PropTypes.func,
  isMarketSelectorOpen: PropTypes.bool,
  isDesktop: PropTypes.bool,
};

export default MarketSelector;
