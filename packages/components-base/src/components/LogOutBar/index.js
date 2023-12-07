import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  hasKey, getKey, loadExternalScript, isValidValue, isValidFunction,
} from '@univision/fe-commons/dist/utils/helpers';
import SessionStorage from '@univision/fe-commons/dist/utils/helpers/SessionStorage';
import LocalStorage from '@univision/fe-commons/dist/utils/helpers/LocalStorage';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import { SOFTWARE_STATEMENT } from '@univision/fe-commons/dist/constants/video';

import Image from '../Image';
import Link from '../Link';

import Styles from './LogOutBar.styles';

const WrapperStyled = styled.div`${Styles.wrapper}`;
const ButtonStyled = styled.button`${Styles.logOutBar}`;
const ImageStyled = styled(Image)`${Styles.providerLogo}`;
const SpanStyled = styled.span`${Styles.copyText}`;
const DivStyled = styled.div`${Styles.logOutBar}`;
const DivImage = styled.div`${Styles.providerLogo}`;

/**
 * LogOutBar class component
 */
class LogOutBar extends PureComponent {
  /**
   * Set state and bind methods
   * @param {Object} props - component props
   * @constructor
   */
  constructor(props) {
    super(props);

    this.onLoginCompleted = this.onLoginCompleted.bind(this);
    this.state = {
      loggedIn: false,
    };
  }

  /**
   * Adds listener for mvpd
   */
  componentDidMount() {
    this.onLoggedIn();
    window.addEventListener('mvpdLoginCompleted', this.onLoginCompleted, { once: true });
  }

  /**
   * Removes mvpd listener
   */
  componentWillUnmount() {
    window.removeEventListener('mvpdLoginCompleted', this.onLoginCompleted);
  }

  /**
   * Callback for mvpdLoginCompleted
   * @param {Object} mvpd - MVPD data from video SDK
   */
  onLoginCompleted(mvpd) {
    const { setUserLogIn } = this.props;
    const detail = getKey(mvpd, 'detail', {});
    const apiData = getKey(detail, 'apiData', {});
    const editorialData = getKey(detail, 'editorialData', {});
    const data = {
      loggedIn: true,
      logo: editorialData.brandingLogo || apiData.logo,
      logoWhite: editorialData.brandingLogoWhite || apiData.logo,
      providerId: apiData.providerId,
      providerName: apiData.displayName,
      link: editorialData.link,
    };

    this.setState(data);
    SessionStorage.setObject('mvpdData', data);

    if (isValidFunction(setUserLogIn)) {
      setUserLogIn();
    }
  }

  /**
   * Updates state if user already logged in
   */
  onLoggedIn() {
    const { setUserLogIn } = this.props;
    const mvpdData = SessionStorage.getObject('mvpdData');
    if (hasKey(mvpdData, 'loggedIn')) {
      this.setState(mvpdData);

      if (isValidFunction(setUserLogIn)) {
        setUserLogIn();
      }
    }
  }

  /**
   * Removes info from SessionStorage and logs out
   */
  onLogout = () => {
    const { setUserLogOut } = this.props;
    const mvpdData = SessionStorage.getObject('mvpdData');
    const provider = getKey(mvpdData, 'providerId');
    SessionStorage.remove('mvpdData');
    this.setState({ loggedIn: false });

    if (provider === 'izzi') {
      LocalStorage.remove('acTkn');
      LocalStorage.remove('rfTkn');
      window.location.reload();
    }

    if (isValidFunction(setUserLogOut)) {
      setUserLogOut();
    }

    if (hasKey(window, 'ae')) {
      window.ae.logout();
    } else {
      loadExternalScript({
        id: 'adobepass',
        src: '//entitlement.auth.adobe.com/entitlement/v4/AccessEnabler.js',
        onLoad: () => {
          const defaultFn = window.setAuthenticationStatus || null;

          // Adobe Pass requires these functions to be defined on the global scope
          window.sendTrackingData = () => { };
          window.entitlementLoaded = () => {
            const requestor = 'univision';
            if (global?.window?.Adobe?.AccessEnabler) {
              window.ae = new window.Adobe.AccessEnabler(SOFTWARE_STATEMENT);
              window.ae.setRequestor(requestor);
              window.ae.checkAuthentication();
            }
          };

          /**
           * Triggered by Adobe pass after we call checkAuthentication
           * @param {bool} auth 0 or 1 depending if user is logged in or not
           */
          window.setAuthenticationStatus = (auth) => {
            if (auth === 1) {
              if (defaultFn) {
                window.setAuthenticationStatus = defaultFn;
              }

              if (hasKey(window, 'ae')) {
                window.ae.logout();
              }
            }
          };
        },
      });
    }
  }

  /**
   * Render method
   * @returns {?JSX}
   */
  render() {
    const {
      state: {
        loggedIn, logo, logoWhite, providerName, link,
      },
      props: { className, variant },
      onLogout,
    } = this;
    if (!loggedIn) return null;
    const notDefault = variant !== 'default';
    const mvpdLogo = variant === 'light' ? logo : logoWhite;
    const hasValidLink = isValidValue(link);
    const LinkOrDiv = hasValidLink ? Link : DivImage;
    const ButtonOrDiv = notDefault ? DivStyled : ButtonStyled;
    const linkOrDivProps = hasValidLink ? {
      href: link,
      target: '_blank',
    } : {};
    return (
      <WrapperStyled className={className} variant={variant}>
        <ButtonOrDiv
          plain
          onClick={!notDefault && onLogout}
          className="uvs-container"
          variant={variant}
        >
          {variant === 'light' && (
            <SpanStyled variant={variant} underline onClick={notDefault && onLogout}>
              {localization.get('closeSession')}
            </SpanStyled>
          )}
          {notDefault
            ? (
              <LinkOrDiv {...linkOrDivProps}>
                <ImageStyled src={mvpdLogo} alt={providerName} />
              </LinkOrDiv>
            ) : <Icon name="user" size="xsmall" fill={WHITE} />
          }
          <SpanStyled variant={variant}>
            {`${localization.get(notDefault ? 'loggedWith' : 'logoutBar')}${notDefault ? ':' : ''}`}
          </SpanStyled>
        </ButtonOrDiv>
      </WrapperStyled>
    );
  }
}

/**
 * propTypes
 * @property {string} className - the style modifier class
 * @property {boolean} variant - enable or disabled variant look & feel
 * @property {function} setUserLogIn - callback when logIn is fired
 * @property {function} setUserLogOut - callback when logOut is fired
 */
LogOutBar.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'dark', 'light']),
  setUserLogIn: PropTypes.func,
  setUserLogOut: PropTypes.func,
};

LogOutBar.defaultProps = {
  variant: 'default',
};

export default LogOutBar;
