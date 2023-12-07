import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { hasKey, getKey } from '@univision/fe-commons/dist/utils/helpers';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import Store from '@univision/fe-commons/dist/store/store';
import { getBrandable } from '@univision/fe-commons/dist/store/storeHelpers';
import brandableTypes from '@univision/fe-commons/dist/utils/brandable/types.json';

import ShareButton from '@univision/fe-components-base/dist/components/ShareButton';
import Icon from '@univision/fe-icons/dist/components/Icon';

import localization from '../../../utils/localization';
import { getRadioStationProps } from '../../../utils/helpers';
import PlayStationButton from '../../connected/PlayStationButton/PlayStationButton';

import Styles from './Toolbar.scss';

/**
 * Track ShareButton event
 * @param {string} name the icon clicked name
 * @param {Object} pageData from API
 */
const trackShare = (name, pageData) => {
  const shareData = {
    name,
    ...pageData,
  };
  SocialTracker.track(SocialTracker.events.share, shareData);
};

/**
 * PerformanceView widget
 * @param {Object} props the component props
 * @returns {JSX}
 */
export const ToolbarComponent = (props) => {
  const {
    visible,
    isContentPage,
    theme,
    sharingOptions,
    device,
    pageData,
  } = props;
  const brandable = getBrandable(Store);
  const brandableType = getKey(brandable, 'type');
  if (!visible && !brandableType) return null;

  let background;
  let titleColor = theme.primary;
  if (!isContentPage) {
    background = theme.secondary;
    titleColor = undefined;
  }

  let title;

  if (hasKey(brandable, 'title')) {
    title = (
      <div className={`${Styles.title} uvs-font-a-bold`} style={{ color: titleColor }}>
        <Icon name="ripples" size="large" className={Styles.ripple} />
        {localization.get('listen')} {brandable.title}
        <Icon name="ripples" size="large" className={Styles.ripple} />
      </div>
    );
  }
  let contentClasses = [Styles.bar];
  const containerClasses = [Styles.container];
  const followMenuClasses = [];

  if (visible) contentClasses.push(Styles.visible);
  if (isContentPage) {
    contentClasses = contentClasses.concat([Styles.light, Styles.contentBar]);
    containerClasses.push(Styles.isContent);
    followMenuClasses.push(Styles.contentFollow);
  }

  const shareButtons = ['facebook', 'twitter', 'whatsapp'];
  const hasRadioStation = brandableType === brandableTypes.radio;

  return (
    <div className={contentClasses.join(' ')} style={{ background }}>
      <div className={containerClasses.join(' ')}>
        <div className={classnames(Styles.col, { [Styles.fullWidth]: !hasRadioStation })}>
          {isContentPage && (
            <div className={Styles.colorShareBar}>
              {shareButtons.map(shareButton => (
                <ShareButton
                  key={shareButton}
                  name={shareButton}
                  theme="light"
                  className={Styles[shareButton]}
                  sharingOptions={sharingOptions}
                  onClick={() => {
                    trackShare(shareButton, pageData);
                  }}
                  variant="light"
                />
              ))}
            </div>
          )}
        </div>
        <div className={`${Styles.col} ${Styles.centerCol}`}>{title}</div>
        {hasKey(brandable, 'data.abacast') && (
          <div className={`${Styles.col} ${Styles.rightCol}`}>
            {title}
            <PlayStationButton
              color={theme.primary}
              device={device}
              type="toolbar"
              {...getRadioStationProps(brandable.data)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

ToolbarComponent.propTypes = {
  visible: PropTypes.bool,
  sharingOptions: PropTypes.object.isRequired,
  isContentPage: PropTypes.bool,
  theme: PropTypes.object,
  device: PropTypes.string,
  pageData: PropTypes.object,
};

ToolbarComponent.defaultProps = {
  theme: {},
  pageData: {},
};

/**
 * get sharing.options from page data
 * @param   {Object} state the current redux state
 * @returns {Object} the props to be injected on the component
 */
export const stateToProps = state => ({
  sharingOptions: hasKey(state, 'page.data.sharing.options') ? state.page.data.sharing.options : {},
});

export default connect(stateToProps)(ToolbarComponent);
