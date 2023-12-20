import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchOneTrustLocationApi } from '@univision/fe-commons/dist/utils/api/fetchApi';
import { US } from '@univision/fe-commons/dist/constants/userLocation';
import {
  MULHER_SITE, DELICIOSO_SITE, ZAPPEANDO_SITE, TASAUDAVEL_SITE,
} from '@univision/fe-commons/dist/constants/sites';
import { ONETRUST_SCRIPT } from '@univision/fe-commons/dist/constants/oneTrust';

import styled from 'styled-components';

import Styled from './FooterLinkOneTrust.styles';

const OneTrustButton = styled.button`${Styled.oneTrustButton}`;

/**
 * Fetch the location of the user
 * @param {Function} setOneTrustData set the state for OneTrust
 * @returns {void}
 */
const OneTrustLocationAPI = async (setOneTrustData) => {
  const scripts = Array.from(document.querySelectorAll('script'), script => script.src);
  if (!scripts.includes(ONETRUST_SCRIPT)) return;
  const userLocationOneTrust = await fetchOneTrustLocationApi();
  setOneTrustData(userLocationOneTrust);
};

/**
 * Event for OneTrust Footer click
 * @returns {void}
 */
const openBannerAndTrack = () => {
  const { ToggleInfoDisplay } = window?.OneTrust;
  window.dataLayer.push({
    event: 'navigation_click',
    event_action: 'footer-cookie-settings',
  });
  ToggleInfoDisplay();
};

/**
 * Validate the logic depending on the state
 * @param {Function} OneTrustData Location Data
 * @param {string} site site data
 * @returns {string}
 */
const getOneTrustFooterText = (OneTrustData, site) => {
  const { country } = OneTrustData;
  const isBrasilPage = [MULHER_SITE, DELICIOSO_SITE, ZAPPEANDO_SITE, TASAUDAVEL_SITE]
    .includes(site);
  if (country === US) return !isBrasilPage ? 'Tus Opciones de Privacidad' : 'Suas Opções de Privacidade';
  return !isBrasilPage ? 'Configuración de Cookies' : 'Configurações de Cookies';
};

/**
 * A clickable item in the footer
 * @param {string} themeVariant type of theme
 * @param {string} site site
 * @returns {JSX}
 */
const FooterLinkOneTrust = ({ themeVariant, site }) => {
  const [OneTrustData, setOneTrustData] = useState();
  let oneTrustText;

  useEffect(() => {
    OneTrustLocationAPI(setOneTrustData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (OneTrustData) {
    oneTrustText = getOneTrustFooterText(OneTrustData, site);
  }

  return (
    <>
      {OneTrustData && oneTrustText && (
        <OneTrustButton
          themeVariant={themeVariant}
          onClick={openBannerAndTrack}
        >
          <button
            id="ot-sdk-btn"
            className="ot-sdk-show-settings"
          >
            {oneTrustText}
          </button>
        </OneTrustButton>
      )}
    </>
  );
};

/**
 * @property {string} themeVariant Color of the text
 */
FooterLinkOneTrust.propTypes = {
  themeVariant: PropTypes.string,
  site: PropTypes.string,
};

export default FooterLinkOneTrust;
