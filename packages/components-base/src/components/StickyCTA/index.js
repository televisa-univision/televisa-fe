import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import isClientSide from '@univision/fe-utilities/helpers/common/isClientSide';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import setCookie from '@univision/fe-utilities/helpers/content/setCookie';
import getCookie from '@univision/fe-utilities/helpers/content/getCookie';
import {
  siteSelector,
  configSelector,
  requestParamsSelector,
  pageUriSelector,
} from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { userLocationSelector } from '@univision/fe-commons/dist/store/selectors/user-selectors';
import { getUserLocation } from '@univision/fe-commons/dist/store/slices/user/user-slice';
import features from '@univision/fe-commons/dist/config/features';
import { themes } from '@univision/fe-commons/dist/utils/themes/themes.json';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import Icon from '@univision/fe-icons/dist/components/Icon';

import Button from '../Button';
import Clickable from '../Clickable';
import Styles from './StickyCTA.styles';

const FullWidthStyled = styled.div`${Styles.fullWidth}`;
const WrapperStyled = styled.div`${Styles.wrapper}`;
const CtaClickableStyled = styled(Clickable)`${Styles.ctaBtn}`;
const CloseButtonStyled = styled(Button)`${Styles.closeBtn}`;
const TextStyled = styled.span`${Styles.text}`;

/**
 * Check if the user location is allowed
 * @param {string[]} allowCodes - ISO country codes allowed
 * @param {Object} options.pageData - current page data from state
 * @param {Object} options.userLocation - user geo location data
 * @param {Object} options.dispatch - redux dispatch function
 * @returns {boolean} true if is allowed
 */
function isUserLocationAllowed(allowCodes, { pageData, userLocation, dispatch }) {
  if (!allowCodes) {
    return true;
  }
  try {
    const { config, requestParams } = pageData;
    if (config?.deploy?.env !== 'production' && requestParams?.countryCode) {
      return allowCodes.includes(requestParams.countryCode);
    }
    if (!userLocation?.CountryData) {
      dispatch(getUserLocation());
    }

    const { country_code: countryCode } = userLocation.CountryData;
    return allowCodes.includes(countryCode);
  } catch (err) {
    return false;
  }
}

/**
 * Collect and filter CTA data by 'active' property from config, by cookie and
 * from location if has `countryCodes` from the config.
 * @param {Object[]} ctaData - available CTA banner data
 * @param {Object} ctaConfig - cta config required to process and filter the list
 * @returns {Object[]} cta active list
 */
function collectActiveCtaData(ctaData, { pageData, userLocation, dispatch }) {
  return ctaData.reduce((result, data) => {
    if (!isValidObject(data) || getCookie(data.cookieName)) {
      return result;
    }
    const active = data.active?.(pageData);
    const allowed = active && isUserLocationAllowed(data.countryCodes, {
      pageData,
      userLocation,
      dispatch,
    });
    if (allowed) {
      result.push(data);
    }
    return result;
  }, []);
}

/**
 * Get lazy function that return list of CTA allowed
 * @param {Object} ctaConfig - cta config required such `pageData`,
 * `userLocation` and `dispatch` redux function
 * @returns {Function<Object[]>} lazy function that returns cta list data
 */
function getCtaListLazy(ctaConfig) {
  let { stickyCTA: stickyCtaData } = features.widgets;

  if (!isValidArray(stickyCtaData)) {
    stickyCtaData = [stickyCtaData];
  }

  let ctaList;
  return () => {
    // we don't need the cta banner on SSR
    if (!ctaList && isClientSide()) {
      ctaList = collectActiveCtaData(stickyCtaData, ctaConfig);
    }
    return ctaList || [];
  };
}

/**
 * Get CTA data by priority, default the CTA from props and
 * as fallback from features config with 'priority' property
 * where a high number is more priority.
 * @param {Object} ctaOptions - cta options to get banner data
 * @param {Function<Promise>} ctaOptions.getCtaList - get available cta banners list
 * @param {number} ctaOptions.bannerIndex - next cta banner index
 * @param {Object} ctaDefault - cta data from component props
 * @returns {Object} cta data
 */
function getCtaByPriority (ctaOptions, ctaDefault) {
  // If the component has data from props take relevance
  // otherwise get global configuration from features config
  if (ctaDefault?.cta && ctaDefault?.text) {
    return ctaDefault;
  }

  const stickyCtaList = ctaOptions.getCtaList();
  const stickyCtaSorted = stickyCtaList.sort((dataA, dataB) => (
    dataA?.priority - dataB?.priority
  ));
  const stickyCtaData = stickyCtaSorted[ctaOptions.bannerIndex];

  if (!stickyCtaData || !stickyCtaData.text) {
    return {
      active: false,
    };
  }

  return {
    active: true,
    cta: stickyCtaData.cta,
    backgroundColor: stickyCtaData.backgroundColor,
    text: stickyCtaData.text,
    allowClose: stickyCtaData.allowClose,
    cookieName: stickyCtaData.cookieName,
    trackingId: stickyCtaData.trackingId,
    onClick: stickyCtaData.onClick,
    listener: stickyCtaData.listener,
  };
}

/**
 * Call to Action sticky banner,
 * it takes the configuration from component props by default, of are not
 * defined take the configuration from `features.widgets` with similar props properties.
 * the properties from features are:
 *  {function} active - should return true if is active and should be render,
 * we send page data as a parameter
 *  {string} cta - button call to action text
 *  {string} text - description banner text
 *  {boolean} allowClose - true if the user can close/skip the banner
 *  {string} cookieName - if is defined show the banner and after click to the cta save a
 *  cookie for one year and show the CTA again after that time,
 *  if is not defined show the banner forever
 *  {string[]} countryCodes - ISO country codes allowed to show the CTA
 *  {string} trackingId - track namespace if is defined send the traking
 *  {function} onClick - callback fired after the user click on the CTA button
 *  {function} listener - object with type and callBack to set event listeners in window object
 *  {backgroundColor} - set CTA background color when color from the theme is not desired
 *
 * @param {Object} props - react component props
 * @param {boolean} [props.active=false] - true if is active and should be render
 * @param {boolean} [props.allowClose=false] - true if the user can close/skip the banner
 * @param {string} [props.cta] - default button call to action text
 * @param {string} [props.text] - default description banner text
 * @param {Object} [props.theme=blue.primary] - theme definition
 * @returns {JSX}
 */
function StickyCTA({
  active,
  allowClose,
  cta,
  text,
  theme,
}) {
  const backgroundColor = theme?.primary || themes.blue.primary;
  const site = useSelector(siteSelector);
  const requestParams = useSelector(requestParamsSelector);
  const config = useSelector(configSelector);
  const uri = useSelector(pageUriSelector);
  const pageData = {
    config,
    site,
    requestParams,
    uri,
  };
  const userLocation = useSelector(userLocationSelector);
  const dispatch = useDispatch();
  const ref = useRef({
    bannerIndex: 0,
    ctaActive: {},
    ctaDefault: {
      active,
      allowClose,
      cta,
      text,
    },
  });
  const [hide, setHide] = useState(true);

  /**
   * Get CTA available banners list from lazy evaluation
   */
  const getCtaList = useMemo(() => {
    return getCtaListLazy({ pageData, userLocation, dispatch });
  }, [pageData, userLocation, dispatch]);

  /**
   * Show the CTA
   */
  const showCta = useCallback(() => {
    setHide(false);
  }, []);

  /**
   * Hide current banner and increase
   * banner index to maybe show next CTA banner
   */
  const maybeShowNextCta = () => {
    const { bannerIndex } = ref.current;
    ref.current.bannerIndex = bannerIndex + 1;
    setHide(true);
  };

  /**
   * Handler when the user close/skip the CTA
   * @param {Object} event - React click event
   */
  const onCloseHandler = (event) => {
    const { ctaActive } = ref.current;

    event.preventDefault();
    maybeShowNextCta();

    if (ctaActive?.trackingId) {
      WidgetTracker.track(
        WidgetTracker.events.engagement, {
          eventName: `${ctaActive.trackingId}_close`,
        }
      );
    }
  };

  /**
   * Handler on user click the CTA,
   * hide the CTA, save the cookie and call the callback
   * @param {Object} event - React click event
   */
  const onClickHandler = (event) => {
    const { ctaActive } = ref.current;
    let onClick;

    if (isValidFunction(ctaActive?.onClick)) {
      onClick = ctaActive.onClick;
    }

    event.preventDefault();
    maybeShowNextCta();

    if (ctaActive?.cookieName) {
      setCookie(ctaActive.cookieName, true, 356);
    }

    if (ctaActive?.trackingId) {
      WidgetTracker.track(
        WidgetTracker.events.engagement, {
          eventName: `${ctaActive.trackingId}_click`,
        }, () => {
          // eslint-disable-next-line babel/no-unused-expressions
          onClick?.();
        }
      );
    } else {
      // eslint-disable-next-line babel/no-unused-expressions
      onClick?.();
    }
  };

  /**
   * Check if should show CTA on mount
   */
  const maybeShowCta = useCallback(() => {
    const { current } = ref;
    if (!hide) {
      return;
    }
    current.ctaActive = getCtaByPriority({
      bannerIndex: current.bannerIndex,
      getCtaList,
    }, current.ctaDefault);

    if (current.ctaActive?.listener) {
      const { type, callBack } = current.ctaActive.listener;
      window.addEventListener(type, callBack);
    }

    if (current.ctaActive?.active) {
      showCta();
    }
  }, [getCtaList, showCta, hide]);

  /**
   * Remove any event listener inserted by the cta widget objects
   * @returns {null|void}
   */
  const removeEventListener = useCallback(() => {
    const { current } = ref;
    window.removeEventListener(
      current?.ctaActive?.listener?.type,
      current?.ctaActive?.listener?.callBack
    );
  }, []);

  /**
   * Call cta definition on mount
   */
  useEffect(() => {
    maybeShowCta();
  }, [maybeShowCta]);

  /**
   * Remove any event listener set by cta
   */
  useEffect(() => {
    return removeEventListener;
  }, [removeEventListener]);

  /**
   * Render
   */
  const { ctaActive } = ref.current;
  if (!ctaActive.active) {
    return null;
  }
  return (
    <FullWidthStyled
      hide={hide}
      backgroundColor={ctaActive.backgroundColor || backgroundColor}
    >
      <WrapperStyled className={'uvs-container'} hasClose={ctaActive.allowClose}>
        <TextStyled
          dangerouslySetInnerHTML={{ __html: ctaActive.text }} // eslint-disable-line
        />
        <CtaClickableStyled
          appearance="plain"
          label={ctaActive.cta}
          onClick={onClickHandler}
          size="small"
          theme={theme}
          type="button"
        />
        {ctaActive.allowClose && (
          <CloseButtonStyled onClick={onCloseHandler}>
            <Icon
              name="close"
              size="xsmall"
              fill={WHITE}
            />
          </CloseButtonStyled>
        )}
      </WrapperStyled>
    </FullWidthStyled>
  );
}

StickyCTA.propTypes = {
  active: PropTypes.bool,
  cta: PropTypes.string,
  text: PropTypes.string,
  allowClose: PropTypes.bool,
  theme: PropTypes.object,
};

StickyCTA.defaultProps = {
  active: false,
  theme: themes.blue,
  allowClose: false,
};

export default React.memo(StickyCTA);
