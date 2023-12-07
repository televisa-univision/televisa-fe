import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Fragment, useMemo } from 'react';
import { Provider } from 'react-redux';

import Store from '@univision/fe-commons/dist/store/store';
import { getTheme, getPageCategory } from '@univision/fe-commons/dist/store/storeHelpers';
import themes from '@univision/fe-commons/dist/utils/themes/themes.json';
import Header from '@univision/fe-components-base/dist/components/Header';
import Footer from '@univision/fe-components-base/dist/components/Footer/FooterLazyWrapper';
import WithWidgets from '@univision/fe-components-base/dist/components/widgets/WithWidgets';
import insertionPoints from '@univision/fe-components-base/dist/components/widgets/WithWidgets/insertionPoints.json';
import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';
import { DARK_VARIANT, LIGHT_VARIANT } from '@univision/fe-commons/dist/utils/styled/constants';
import { CROSS_VERTICAL_LIST } from '@univision/fe-commons/dist/constants/widgetTypes';
import { parseWidgets } from 'app/utils/factories/widgetFactory';

import GlobalWidget from '../../layout/GlobalWidget';
import MainWrapper from '../../layout/MainWrapper';
import Styles from './VideoPage.scss';

/**
 * Get theme props based on primaryTopic
 * @param {Object} variant theme variant
 * @param {string} primaryTopic section page
 * @returns {Object}
 */
const getThemeProps = (variant) => {
  const result = {
    variant,
  };
  if (variant === DARK_VARIANT) {
    result.theme = themes.themes.white;
  }

  return result;
};

/**
 * Container component representing a Video page
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const Video = (props) => {
  const { page } = { ...props };
  const widgets = useMemo(() => {
    if (Array.isArray(page?.widgets)) {
      return page.widgets.filter(widget => widget?.type === CROSS_VERTICAL_LIST);
    }
    return null;
  }, [page]);

  const theme = getTheme(Store) || {};
  const { isDark } = theme;
  const localProps = page || {};
  const {
    data: {
      adSettings: {
        disableVideoAds,
      } = {},
    } = {},
  } = localProps;

  localProps.variant = isDark ? DARK_VARIANT : LIGHT_VARIANT;
  localProps.fullWidth = true;

  const themeProps = getThemeProps(localProps.variant);
  const WidgetsBelowContent = WithWidgets(null, [insertionPoints.belowContentBody]);

  const widgetsBlock = WidgetsBelowContent() && (
    <WidgetsBelowContent />
  );

  const crossVerticalWidgets = useMemo(() => (
    widgets ? parseWidgets({ widgets }, true) : null), [widgets]);

  return (
    <Provider store={Store}>
      <Fragment>
        <MainWrapper state={Store.getState()} dfpSupport={false}>
          <Header
            pageCategory={getPageCategory(Store)}
            pageData={localProps}
            {...themeProps}
          />
          <GlobalWidget />
          <div className={classNames(Styles.videoWrapper, Styles[`videoWrapper_variant_${localProps.variant}`])}>
            <div className={Styles.mobileBackground} />
            <VideoPlayer
              {...localProps}
              disableVideoAds={disableVideoAds}
              widgetData={page}
            />
          </div>
          {widgetsBlock && (
            <div className={classNames('container', Styles.widgetsContainer)}>
              <div className="row">
                <div className="col-12 col-md-9 col-lg-8">
                  {widgetsBlock}
                </div>
              </div>
            </div>
          )}
          {Array.isArray(crossVerticalWidgets) && (
            <div className={classNames('container', Styles.widgetsContainer)}>
              <div className="row">
                <div className="col-12 col-md-9 col-lg-8">
                  {crossVerticalWidgets}
                </div>
              </div>
            </div>
          )}
          <div
            className={classNames('newsletterContainerVideo', Styles.newsletterContainerVideo, {
              [Styles.videoWrapper_variant_dark]: isDark,
              [Styles.videoWrapper_variant_light]: !isDark,
            })}
          />
          <Footer variant={themeProps && themeProps.variant} />
        </MainWrapper>
      </Fragment>
    </Provider>
  );
};

/**
 * propTypes
 * @property {Array} widgets - React widgets to be rendered in the page
 */
Video.propTypes = {
  page: PropTypes.shape({
    type: PropTypes.string,
    brandable: PropTypes.object,
    image: PropTypes.object,
  }).isRequired,
};

export default Video;
