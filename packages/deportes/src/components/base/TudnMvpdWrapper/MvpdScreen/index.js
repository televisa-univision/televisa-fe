import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactReduxContext } from 'react-redux';

import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import sessionStorage from '@univision/fe-utilities/storage/sessionStorage';
import * as languages from '@univision/fe-utilities/localization/languages';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import SportsTracker from '@univision/fe-commons/dist/utils/tracking/tealium/sports/SportsTracker';
import TudnPopupScreen from '@univision/shared-components/dist/components/v2/TudnPopupScreen';
import { languageSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import setCurrentLanguage from '@univision/fe-commons/dist/store/actions/page-actions';

import Styles from './MvpdScreen.styles';

const TRACK_UPSALE = 'mvpd_login_tudnxtra_upsale';
const TUDN_XTRA_CHANNEL = 'tudnxtra';

const MainWrapper = styled.div`${Styles.wrapper}`;

/**
 * TUDN MVPD Screen
 * @access public
 * @extends {React.Component}
 */
class MvpdScreen extends Component {
  /**
   * Set up component state and bind methods to instance
   * @param {Object} props - the component props
   * @param {Object} context - the component context
   */
  constructor(props, context) {
    super(props, context);

    const { providerName = 'Not Available' } = sessionStorage.getObject('mvpdData') || {};
    this.isMobile = props.device === 'mobile';
    this.store = context?.store;
    this.triggerClose = this.triggerClose.bind(this);
    this.getLanguage = this.getLanguage.bind(this);
    this.mvpd = providerName;
  }

  /**
   * Trigger close function
   * @param {Object} event - JS native click event
   */
  triggerClose(event) {
    const { close } = this.props;
    const dispatch = this.store?.dispatch;
    const lang = this.getLanguage();
    event.preventDefault();

    if (isValidFunction(close)) {
      SportsTracker.track(SportsTracker.events.mvpd, {
        event: TRACK_UPSALE,
        mvpdProvider: this.mvpd,
      });
      if (lang === languages.EN) {
        dispatch(setCurrentLanguage({ language: languages.ES }));
      }
      close();
    }
  }

  /**
   * Function for getting current language from context
   * @returns {string}
   */
  getLanguage() {
    const state = this.store?.getState();
    return languageSelector(state);
  }

  /**
   * Render the component
   * @access public
   * @returns {JSX}
   */
  render() {
    const { tudnXtraSettings, channels } = this.props;
    const {
      titleNoTudnXtra,
      titleNoTudn,
      descriptionNoTudnXtra,
      descriptionNoTudn,
      tudnXtraMainImage,
      tudnXtraFooterImage,
    } = tudnXtraSettings || {};
    const lang = this.getLanguage();
    const isXtra = isValidArray(channels?.[lang]) && channels[lang].includes(TUDN_XTRA_CHANNEL);
    const title = isXtra ? titleNoTudnXtra : titleNoTudn;
    const text = isXtra ? descriptionNoTudnXtra : descriptionNoTudn;
    const customMainImage = getKey(tudnXtraMainImage, 'renditions.original', {});
    const customFooterImage = getKey(tudnXtraFooterImage, 'renditions.original', {});
    return (
      <MainWrapper>
        <TudnPopupScreen
          closeFunc={this.triggerClose}
          isMobile={this.isMobile}
          isExtra={isXtra}
          title={isValidValue(title) ? title : null}
          text={isValidValue(text) ? text : null}
          mainImage={customMainImage}
          footerImage={customFooterImage}
        />
      </MainWrapper>
    );
  }
}

/**
 * propTypes
 * @property {function} close - callback to allow the popup to close
 * @property {string} device - current page device from TudnMvpdWrapper props
 * @property {object} tudnXtraSettings - custom copy settings object
 */
MvpdScreen.propTypes = {
  channels: PropTypes.object,
  close: PropTypes.func,
  device: PropTypes.string,
  tudnXtraSettings: PropTypes.object,
};

MvpdScreen.contextType = ReactReduxContext;

export default MvpdScreen;
