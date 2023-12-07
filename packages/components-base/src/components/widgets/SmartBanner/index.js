/* eslint-disable react/no-unused-prop-types */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Store from '@univision/fe-commons/dist/store/store';
import {
  getDeviceType,
  isSafariMobile,
  isAmp,
  isSpa,
} from '@univision/fe-commons/dist/store/storeHelpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { asDeferrer } from '@univision/fe-commons/dist/utils/deferrer';
import { SMARTBANNER_COOKIE, SMARTBANNER_COOKIE_TIME } from '@univision/fe-commons/dist/constants/personalization';
import {
  setCookie,
  getCookie,
  locationRedirect,
  isValidObject,
  isEqual,
} from '@univision/fe-commons/dist/utils/helpers';

import Link from '../../Link';
import Button from '../../Button';
import SmartBannerMetadata from './SmartBannerMetadata';
import SmartIosTracking from './SmartIosTraking';
import Styles from './SmartBanner.scss';

/**
 * SmartBanner helper for promote a univision apps
 * @access public
 * @extends {React.Component}
 */
@asDeferrer
class SmartBanner extends React.Component {
  /**
   * Set if the application is already installed
   * @param {string} id - application ID
   * @access public
   */
  static async isInstalledApp(id) {
    if (id && typeof window !== 'undefined' && window.navigator.getInstalledRelatedApps) {
      // this still require a manifest
      const installed = await window.navigator.getInstalledRelatedApps().then((apps) => {
        return apps.find(app => app.id === id);
      }).catch(() => false);

      return installed;
    }
    return false;
  }

  /**
   * Get user language to redirect the user to the store in their language
   * @access public
   * @returns {string}
   */
  static getStoreLanguage() {
    const currentLanguage = localization.getCurrentLanguage();

    if (typeof window === 'undefined') {
      return currentLanguage;
    }

    const browserLanguage = window.navigator.language
      || window.navigator.userLanguage
      || currentLanguage;

    return browserLanguage.slice(0, 2).toLowerCase();
  }

  /**
   * Define state and events for smartbanner
   * @param {Object} props - the component props
   */
  constructor(props) {
    super(props);
    this.closeHandler = this.closeHandler.bind(this);
    this.linkHandler = this.linkHandler.bind(this);
    this.appInfo = this.getBannerInfo();
    this.isSpa = isSpa(Store);

    this.state = {
      installed: false,
      show: false,
    };
  }

  /**
   * When component start is mounted show the smartBanner
   * @access public
   */
  componentDidMount() {
    // ugly way to defered the did mount
    this.defer(() => {
      this.shouldShow();
    });
  }

  /**
   * lifecycle React Method
   * if SPA mode is enabled excecutes the `shouldShow` to validate
   *  if there is a valid related app installed
   * @access public
   */
  componentDidUpdate() {
    if (this.isSpa) {
      this.defer(() => {
        this.shouldShow();
      });
    }
  }

  /**
   * Check if the component should update when the props/state changed
   * @param {Object} nextProps - the new props data
   * @param {Object} nextState - the new state data
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    const appInfo = this.getBannerInfo(nextProps);
    const result = !isEqual(nextState, this.state, true) || !isEqual(this.appInfo, appInfo);
    if (result) this.appInfo = appInfo;
    return result;
  }

  /**
   * Get banner info per device
   * @param {Object} propsData React Props for this component
   * @access public
   * @returns {Object}
   */
  getBannerInfo(propsData) {
    const props = propsData || this.props;
    const { overwritePlatform } = props;
    const language = SmartBanner.getStoreLanguage();
    let platform = getDeviceType(Store);

    if (overwritePlatform) {
      platform = overwritePlatform.toLowerCase();
    }

    const {
      [platform]: appInfo,
      icon,
      title,
      author,
      theme,
      deepLink,
      actionText,
      storeLink: globalLink,
      storeText: globalText,
    } = props;
    const {
      [platform]: { storeLink, storeText } = {},
    } = {
      ios: {
        storeLink: `https://itunes.apple.com/${language}/app/id`,
        storeText: localization.get('onTheAppStore'),
      },
      android: {
        storeLink: `https://play.google.com/store/apps/details?hl=${language}&id=`,
        storeText: localization.get('inGooglePlay'),
      },
    };

    if (!appInfo || !storeLink) {
      return {};
    }

    return {
      icon,
      title,
      author,
      theme,
      deepLink,
      actionText,
      storeText: globalText || storeText,
      storeLink: globalLink || `${storeLink}${appInfo.id}`,
      ...appInfo, // overwrite the values per platform
      platform, // Shouldn't overwritten
    };
  }

  /**
   * Check if should show the smartBanner
   * @access public
   */
  async shouldShow() {
    // Don't show if has previous user actions is a webview
    if (typeof window === 'undefined' || window.navigator.standalone
      || getCookie(`${SMARTBANNER_COOKIE}_closed`) || getCookie(`${SMARTBANNER_COOKIE}_viewed`)) {
      return;
    }

    const { id: appId } = this.appInfo;
    let installed;
    try {
      /* use this.constructor because the decorator replace the class name
      and we are using this method like a mock function on unit test */
      installed = await this.constructor.isInstalledApp(appId);
    } catch (e) {
      installed = false;
    }

    this.setState({
      installed,
      show: true,
    });
  }

  /**
   * Hide smartBanner
   * @access public
   */
  hide() {
    this.setState({ show: false });
  }

  /**
   * When close is clicked set a cookie and hide the banner
   * @access public
   */
  closeHandler() {
    setCookie(`${SMARTBANNER_COOKIE}_closed`, 'true', SMARTBANNER_COOKIE_TIME);
    this.hide();
  }

  /**
   * When the store link is clicked set a cookie and redirect
   * @param {Object} event - native JS event
   * @access public
   */
  linkHandler(event) {
    const { storeLink } = this.appInfo;
    const { analyticsId } = this.props;
    const redirect = locationRedirect(storeLink);

    event.preventDefault();
    setCookie(`${SMARTBANNER_COOKIE}_viewed`, 'true', SMARTBANNER_COOKIE_TIME);

    if (analyticsId) {
      WidgetTracker.track(WidgetTracker.events.smartbanner, {
        event_label: window.location.href,
        event_action: analyticsId,
      }, () => {
        redirect();
        this.hide();
      });
    } else {
      redirect();
      this.hide();
    }
  }

  /**
   * Render SmartBanner component
   * @access public
   * @returns {?JSX}
   */
  render() {
    const { trackingId } = this.props;

    const { show, installed } = this.state;
    const {
      id: appId,
      author,
      icon,
      title,
      theme,
      platform,
      deepLink,
      storeLink,
      storeText,
      actionText,
      backgroundImage,
    } = this.appInfo;
    const isIos = platform === 'ios';

    if (isAmp(Store)) {
      return null;
    }

    if (isIos && isSafariMobile(Store) && !isSpa(Store)) {
      return (
        <ErrorBoundary>
          <SmartIosTracking appId={appId} trackingId={trackingId} />
          <SmartBannerMetadata appId={appId} trackingId={trackingId} deepLink={deepLink} />
        </ErrorBoundary>
      );
    }

    // Don't show banner if not has valid appId or is SSR
    if (!show || !appId || !icon) {
      return null;
    }

    const bottonText = localization.get(installed ? 'open' : 'view');
    const description = isIos ? `${actionText} - ${storeText}` : `${storeText}`;
    const wrapperStyle = {
      ...{ backgroundColor: isValidObject(theme) && theme.primary },
      ...{ backgroundImage: backgroundImage && `url(${backgroundImage})` },
    };

    return (
      <ErrorBoundary>
        <div
          className={`${Styles.smartbanner} ${Styles[platform]}`}
          data-element-name="SmartBanner"
          style={wrapperStyle}
        >
          <div className={Styles.container}>
            <div className={Styles.content}>
              <Button className={Styles.close} onClick={this.closeHandler}>
                <Icon name="close" size="xxsmall" />
              </Button>
              <Icon name={icon} size={67} className={Styles.icon} />
              <div className={Styles.info}>
                <div className={Styles.title}>{title}</div>
                {isIos ? (
                  <Fragment>
                    <div className={Styles.author}>{author}</div>
                    <div className={Styles.description}>{description}</div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className={Styles.description}>{description}</div>
                    <div className={Styles.author}>{author}</div>
                  </Fragment>
                )}

              </div>
            </div>
            <div className={Styles.actions}>
              <Link className={Styles.button} href={storeLink} onClick={this.linkHandler}>
                <span className={Styles.buttonText}>{bottonText}</span>
              </Link>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

/**
 * propTypes
 * @property {string} overwritePlatform - platform name to force bahavior
 * @property {Object} theme - univision theme to set background color
 * @property {string} icon - app icon to show in smartbanner
 * @property {string} [title='Univision App'] - the app title
 * @property {string} [author='Univision Interactive Media, Inc'] - the app author
 * @property {string} [actionText='get'] - call to action text (Only IOS)
 * @property {string} [storeText=per platform] - app desciption
 * @property {string} [storeLink=per platform] - app store link redirect
 * @property {string} [deepLink] - app deepLink to open (Only native IOS)
 * @property {string} trackingId - appsflyer tracking Id (Only native IOS)
 * @property {string} [analyticsId] - app analytics id
 * @property {Object} ios - configuration to IOS smartbanner,
   can overwrite (title, author, icon, storeText etc.)
 * @property {!string} ios.id - app ID to IOS
 * @property {Object} android - configuration to Android smartbanner,
   can overwrite (title, author, icon, storeText etc.)
 * @property {!string} android.id - app ID to Android
 * @property {!string} android.backgroundImage - image to set as background on Android
 */
SmartBanner.propTypes = {
  overwritePlatform: PropTypes.string,
  theme: PropTypes.object,
  icon: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  actionText: PropTypes.string,
  storeText: PropTypes.string,
  storeLink: PropTypes.string,
  deepLink: PropTypes.string,
  trackingId: PropTypes.string,
  analyticsId: PropTypes.string,
  ios: PropTypes.shape({
    id: PropTypes.string,
    storeText: PropTypes.string,
  }),
  android: PropTypes.shape({
    id: PropTypes.string,
    storeText: PropTypes.string,
    backgroundImage: PropTypes.string,
  }),
};

SmartBanner.defaultProps = {
  title: 'Univision App',
  author: 'Univision Interactive Media, Inc',
  actionText: localization.get('get'),
};

export default SmartBanner;
