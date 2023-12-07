import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactReduxContext } from 'react-redux';

import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import sessionStorage from '@univision/fe-utilities/storage/sessionStorage';
import localStorage from '@univision/fe-utilities/storage/localStorage';
import * as languages from '@univision/fe-utilities/localization/languages';
import fetch from '@univision/fe-commons/dist/utils/fetch';
import clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';
import SportsTracker from '@univision/fe-commons/dist/utils/tracking/tealium/sports/SportsTracker';
import SubscriptionForm from '@univision/shared-components/dist/components/v2/SubscriptionForm';
import { isValidEmail, isValidName } from '@univision/shared-components/dist/utils/helpers';
import { languageSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import setCurrentLanguage from '@univision/fe-commons/dist/store/actions/page-actions';

import Styles from './FormScreen.styles';

const FORM_PLATFORM = 'web';
const TRACK_FORM_FILLED = 'mvpd_login_tudnxtra_contactform_filled';
const TRACK_FORM = 'mvpd_login_tudnxtra_contactform';

const MainWrapper = styled.div`${Styles.wrapper}`;
/**
 * TUDNxtra Form Screen
 * @access public
 * @extends {React.Component}
 */
class FormScreen extends Component {
  /**
   * Set up component state and bind methods to instance
   * @param {Object} props - the component props
   * @param {Object} context - the component context
   */
  constructor(props, context) {
    super(props, context);
    const { providerName = 'Not Available' } = sessionStorage.getObject('mvpdData') || {};
    const nextScreen = localStorage.get('hasFormSubmitted') || false;

    this.isMobile = props.device === 'mobile';
    this.store = context?.store;
    this.triggerClose = this.triggerClose.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
    this.requestSubmit = this.requestSubmit.bind(this);
    this.state = {
      name: '',
      email: '',
      agree: false,
      success: nextScreen,
      nameError: false,
      emailError: false,
      policyError: false,
      hasErrorForm: false,
    };
    this.submitTries = 0;
    this.mvpd = providerName;
    this.hasFormSubmitted = nextScreen;
  }

  /**
   * Trigger close function
   * @param {Object} event - JS native click event
   */
  triggerClose(event) {
    const { close } = this.props;
    const state = this.store?.getState();
    const dispatch = this.store?.dispatch;
    const lang = languageSelector(state);
    event.preventDefault();

    if (isValidFunction(close)) {
      SportsTracker.track(SportsTracker.events.mvpd, {
        event: this.hasFormSubmitted ? TRACK_FORM_FILLED : TRACK_FORM,
        mvpdProvider: this.mvpd,
      });
      if (lang === languages.EN) {
        dispatch(setCurrentLanguage({ language: languages.ES }));
      }
      close();
    }
  }

  /**
   * Handle Input Change
   * @param {event} event - the event change
   */
  handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    }, this.submitTries > 0 ? this.handleError : () => {});
  }

  /**
   * Handle Submit
   * @param {event} event - the event for pressing submit button
   */
  handleSubmit(event) {
    event.preventDefault();
    this.submitTries += 1;
    if (this.handleError()) {
      this.requestSubmit();
      localStorage.set('hasFormSubmitted', true);
    }
  }

  /**
   * Handle error
   * @returns {boolean}
   */
  handleError() {
    const {
      name, email, agree, nameError, emailError, policyError,
    } = this.state;

    this.setState({
      nameError: !(isValidName(name)),
      emailError: !(isValidEmail(email)),
      policyError: !agree,
    });

    return (!nameError && !emailError && !policyError) && agree;
  }

  /**
   * Request the submit/Post
   */
  async requestSubmit() {
    const { device } = this.props;
    const { name, email } = this.state;
    const uri = 'https://pub.s7.exacttarget.com/3yni3byng01';
    try {
      await fetch(uri, {
        method: 'POST',
        body: {
          nombre: name,
          correo: email,
          mvpd: this.mvpd,
          platform: `${FORM_PLATFORM}-${device || 'na'}`,
        },
      });
      this.setState({
        success: true,
      });
    } catch (error) {
      error.message = `Error submitting mvpd form: ${error.message}`;
      clientLogging(error);
      this.setState({
        hasErrorForm: true,
      });
    }
  }

  /**
   * Render the component
   * @access public
   * @returns {JSX}
   */
  render() {
    const {
      nameError, emailError, policyError, success, agree, hasErrorForm,
    } = this.state;
    const { tudnXtraSettings } = this.props;
    const {
      titleProviderNoTudnXtra, descriptionProviderNoTudnXtra,
    } = tudnXtraSettings || {};
    const customText = isValidValue(titleProviderNoTudnXtra)
      ? titleProviderNoTudnXtra : null;
    const customThankYouText = isValidValue(descriptionProviderNoTudnXtra)
      ? descriptionProviderNoTudnXtra : null;
    return (
      <MainWrapper>
        <SubscriptionForm
          closeFunc={this.triggerClose}
          isMobile={this.isMobile}
          onPress={this.handleSubmit}
          onChange={this.handleInputChange}
          nameError={nameError}
          emailError={emailError}
          policyError={policyError}
          successfulSubmit={success}
          agreeToTerms={agree}
          cableProvider={this.mvpd}
          hasErrorForm={hasErrorForm}
          customText={customText}
          customThankYouText={customThankYouText}
        />
      </MainWrapper>
    );
  }
}

/**
 * propTypes
 * @property {function} close - Callback to allow the popup to close
 * @property {string} device - current page device from TudnMvpdWrapper props
 * @property {object} tudnXtraSettings - custom copy settings object
 */
FormScreen.propTypes = {
  close: PropTypes.func,
  device: PropTypes.string,
  tudnXtraSettings: PropTypes.object,
};

FormScreen.contextType = ReactReduxContext;

export default FormScreen;
