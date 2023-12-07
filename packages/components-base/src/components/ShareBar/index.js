import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { isValidFunction } from '@univision/fe-commons/dist/utils/helpers';
import Icon from '@univision/fe-icons/dist/components/Icon';
import classnames from 'classnames';
import features from '@univision/fe-commons/dist/config/features';
import config from '../../config';

import Button from '../Button';

import ShareButton from '../ShareButton';
import Styles from './ShareBar.scss';

/**
 * Basic building block for share bar component
 * @returns {jsx}
 */
class ShareBar extends React.PureComponent {
  /**
   * [constructor description]
   */
  constructor() {
    super();
    this.state = {};
  }

  /**
   * [toggle description]
   */
  toggle = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  /**
   * [render description]
   * @returns {[type]} [description]
   */
  render() {
    const {
      centerAll,
      className,
      compact,
      device,
      iconSize,
      iconSizeOverride,
      language,
      mobileCollapse,
      onClick,
      padLeft,
      separator,
      shareTextCss,
      sharingOptions,
      showComparte,
      showShareClue,
      stack,
      theme,
      themeIcon,
      shareOnTop,
    } = this.props;

    const { open } = this.state;

    let handleClick;
    if (isValidFunction(onClick)) {
      handleClick = name => e => onClick(name, e);
    }
    const isTelevisaSite = features.televisa.isTelevisaSite();
    const variant = { dark: 'dark', light: 'light', rounded: 'light' }[theme];
    const networks = ['facebook', 'twitter', 'mail'];
    if (device === 'mobile' && !isTelevisaSite) {
      networks.splice(2, 0, 'whatsapp');
    }

    return (
      <ErrorBoundary>
        <div
          className={classnames(Styles.wrapper, Styles[theme], className, {
            [Styles.stack]: stack,
            [Styles.mobileCollapse]: mobileCollapse && ['mobile', 'tablet'].indexOf(device) > -1,
            [Styles.compact]: compact,
            [Styles.open]: open,
            [Styles.iconSeparator]: separator === 'icon',
            [Styles.shareOnTop]: shareOnTop,
          })}
        >
          {showComparte && (
            <div
              className={classnames(
                'uvs-font-a-regular',
                Styles.comparte,
                {
                  [Styles.centerAll]: centerAll,
                  [Styles.padLeft]: padLeft,
                  [Styles.shareOnTop]: shareOnTop,
                },
                Styles[theme],
              )}
              css={shareTextCss}
            >
              {
                showShareClue
                  ? localization.get('shareGallery', { language })
                  : localization.get('share', { language })
              }
            </div>
          )}
          <div className={Styles.buttonWrapper}>
            {mobileCollapse && (
              <Button plain onClick={this.toggle} className={classnames([Styles.toggleButton, Styles[`toggleButton_variant_${variant}`]])}>
                <Icon name="shareSpider" fill={themeIcon.primary} size="xsmall" variant={variant} />
              </Button>
            )}
            <div className={classnames(Styles.shareButtons, Styles[theme])}>
              {networks.map(name => (
                <ShareButton
                  key={name}
                  name={name}
                  iconSize={iconSize}
                  iconSizeOverride={iconSizeOverride}
                  theme={theme}
                  sharingOptions={sharingOptions}
                  onClick={handleClick && handleClick(name)}
                  className={Styles.shareButton}
                  variant={variant}
                />
              ))}
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

ShareBar.propTypes = {
  className: PropTypes.string,
  compact: PropTypes.bool,
  shareTextCss: PropTypes.arrayOf(PropTypes.string),
  device: PropTypes.string,
  iconSize: PropTypes.string,
  iconSizeOverride: PropTypes.number,
  language: PropTypes.string,
  mobileCollapse: PropTypes.bool,
  onClick: PropTypes.func,
  padLeft: PropTypes.bool,
  centerAll: PropTypes.bool,
  separator: PropTypes.oneOf(['comparte', 'icons']),
  sharingOptions: PropTypes.object,
  showComparte: PropTypes.bool,
  showShareClue: PropTypes.bool,
  stack: PropTypes.bool,
  theme: PropTypes.oneOf(['dark', 'light', 'color', 'rounded']),
  themeIcon: PropTypes.object,
  shareOnTop: PropTypes.bool,
};

ShareBar.defaultProps = {
  compact: false,
  language: localization.getCurrentLanguage(),
  padLeft: true,
  centerAll: false,
  separator: 'comparte',
  showComparte: true,
  stack: false,
  theme: 'dark',
  themeIcon: config.defaultTheme,
};

export default ShareBar;
