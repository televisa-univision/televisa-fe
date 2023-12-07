import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  deburrToLowerCase,
  locationRedirect,
  isValidFunction,
  getKey,
} from '@univision/fe-commons/dist/utils/helpers';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import marketCoordinates from '@univision/fe-commons/dist/constants/marketCoordinates.json';
import { useBreakPoint } from '@univision/fe-commons/dist/utils/hooks';
import AnimatedModalBackground from '@univision/fe-components-base/dist/components/AnimatedModalBackground';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { SILVER_CHALICE, WHITE } from '@univision/fe-commons/dist/utils/styled/constants';

import Styles from './SelectMarket.styles';

const ArrowIcon = styled(Icon)`${Styles.arrowIcon}`;
const ArrowIconWrapper = styled.div`${Styles.arrowIconWrapper}`;
const ArrowUp = styled.div`${Styles.arrowUp}`;
const Market = styled.div.attrs({ className: 'uvs-font-c-bold' })`${Styles.market}`;
const SelectMarketList = styled.div`${Styles.selectMarketList}`;
const SelectMarketWrapper = styled.div`${Styles.selectMarketWrapper}`;
const TextWrapper = styled.span``;
const Title = styled.div.attrs({ className: 'uvs-font-a-black' })`${Styles.title}`;

/**
 * SelectMarket Component
 * @param {Object} props - component props
 * @returns {JSX}
 */
const SelectMarket = ({
  localMarket,
  children,
  onChange,
  onSelect,
  fillArrowColor,
  relativePath,
  eventName,
}) => {
  const [open, setOpen] = useState(false);
  const breakPoint = useBreakPoint();
  const responsiveDevice = breakPoint === 'xxs' || breakPoint === 'xs' ? 'mobile' : 'desktop';

  const setOnChange = useCallback((obj) => {
    setOpen(getKey(obj, 'isOpen', false));
    if (isValidFunction(onChange)) {
      onChange(obj);
    }
  }, [onChange, setOpen]);

  const setOnSelect = useCallback((obj) => {
    setOnChange({ isOpen: false });
    const marketConfig = getKey(marketCoordinates, getKey(obj, 'market'), {});
    if (isValidFunction(onSelect)) {
      onSelect({ ...obj, ...marketConfig });
    } else {
      locationRedirect(`${getKey(marketConfig, 'uri', '')}${relativePath || ''}`)();
    }
    const eventAction = `${eventName || 'subnav'}-local-${deburrToLowerCase(marketConfig.name)}`;
    NavigationTracker.track(NavigationTracker.events.click, { eventAction });
  }, [setOnChange, onSelect, relativePath, eventName]);

  const onCLickArrow = useCallback(() => {
    NavigationTracker.track(NavigationTracker.events.click, { eventAction: 'subnav-local-list' });
  }, []);

  const changeMarket = useCallback(
    (market) => {
      setOnSelect({ market });
    },
    [setOnSelect]
  );

  const openModal = useCallback(() => {
    setOnChange({ isOpen: !open });
  }, [open, setOnChange]);

  const marketOptions = useMemo(() => {
    const allMarkets = Object.keys(marketCoordinates).map(market => ({
      call: market,
      name: marketCoordinates[market].name,
      sort: marketCoordinates[market].sort,
    })).sort((a, b) => (
      a.sort[`${responsiveDevice}Menu`] - b.sort[`${responsiveDevice}Menu`]
    ));
    return allMarkets.map(({ name: marketName, call }) => (
      <Market
        onClick={event => changeMarket(call, event)}
        key={`allMarket${call}`}
        isActive={call === localMarket}
      >
        {marketName}
      </Market>
    ));
  }, [responsiveDevice, localMarket, changeMarket]);
  return (
    <>
      <TextWrapper onClick={openModal} isOpen={open}>
        <Title isOpen={open}>
          {children}
          <ArrowIconWrapper isOpen={open} onClick={onCLickArrow}>
            <ArrowIcon
              name={open ? 'arrowUp' : 'arrowDown'}
              size={24}
              fill={fillArrowColor || (open ? WHITE : SILVER_CHALICE)}
            />
          </ArrowIconWrapper>
        </Title>
      </TextWrapper>
      <ArrowUp isOpen={open} />
      <SelectMarketWrapper isOpen={open}>
        <div className="row">
          <SelectMarketList>
            {marketOptions}
          </SelectMarketList>
        </div>
      </SelectMarketWrapper>
      <AnimatedModalBackground
        isVisible={open}
        onClick={() => setOnChange({ isOpen: false })}
      />
    </>
  );
};

SelectMarket.propTypes = {
  localMarket: PropTypes.string,
  children: PropTypes.object,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  fillArrowColor: PropTypes.string,
  relativePath: PropTypes.string,
  eventName: PropTypes.string,
};

export default SelectMarket;
