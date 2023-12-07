import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import classnames from 'classnames';

import Features from '@univision/fe-commons/dist/config/features';
import { exists, hasKey } from '@univision/fe-commons/dist/utils/helpers';
import Store from '@univision/fe-commons/dist/store/store';
import { getPageCategory } from '@univision/fe-commons/dist/store/storeHelpers';
import * as horizontalSlideshowActions from '@univision/fe-commons/dist/store/actions/slideshow/horizontal-slideshow-actions';
import RelatedTags from '@univision/fe-components-base/dist/components/RelatedTagsLegacy';
import Header from '@univision/fe-components-base/dist/components/Header';
import WithWidgets from '@univision/fe-components-base/dist/components/widgets/WithWidgets';
import insertionPoints from '@univision/fe-components-base/dist/components/widgets/WithWidgets/insertionPoints.json';
import themes from '@univision/fe-commons/dist/utils/themes/themes.json';
import Footer from '@univision/fe-components-base/dist/components/Footer/FooterLazyWrapper';
import { parseWidgets } from 'app/utils/factories/widgetFactory';

import GlobalWidget from '../../layout/GlobalWidget';
import MainWrapper from '../../layout/MainWrapper';
import WithHorizontalSlideshowInfo from './WithHorizontalSlideshowInfo/WithHorizontalSlideshowInfo';
import SlideshowMetadata from './SlideshowMetadata/SlideshowMetadata';
import SlideshowWrapper from './SlideshowWrapper';
import Styles from './HorizontalSlideshow.scss';

/**
 * Horizontal Slideshow component
 */
class HorizontalSlideshow extends Component {
  /**
   * Set horizontal slideshows in the redux store after page mounts
   * @returns {void}
   */
  componentDidMount() {
    if (Features.slideshows.horizontal.stitchingEnabled()) {
      Store.dispatch(horizontalSlideshowActions.setInitialSlideshows());
    }
  }

  /**
   * Render a RelatedTags component if the prop is available as an array
   * @returns {JSX}
   */
  renderRelatedTags = () => {
    const { page } = this.props;

    if (
      hasKey(page, 'secondaryTags')
      && Array.isArray(page.secondaryTags)
      && page.secondaryTags.length > 0
    ) {
      return <RelatedTags contents={page.secondaryTags} className={Styles.relatedTags} />;
    }

    return null;
  };

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const { page } = this.props;
    if (exists(page) && page.slides) {
      page.variant = 'dark';
      const HorizontalSlideshowWrapper = Features.slideshows.horizontal.stitchingEnabled()
        ? WithHorizontalSlideshowInfo(SlideshowWrapper)
        : SlideshowWrapper;
      const WidgetsBelowContent = WithWidgets(null, [insertionPoints.belowContentBody]);

      return (
        <Provider store={Store}>
          <div className={Styles.slideshowBG}>
            <MainWrapper
              connectTracking
              state={Store.getState()}
            >
              <SlideshowMetadata {...this.props} />
              <Header
                pageData={page}
                pageCategory={getPageCategory(Store)}
                theme={themes.themes.black}
                variant="dark"
                showWhiteLogo
              />
              <GlobalWidget isDark />
              <div className={`${Styles.main} ${Styles.mainHorizontal}`}>
                <HorizontalSlideshowWrapper initialPage={page} />
                <div className="uvs-container">{this.renderRelatedTags()}</div>
                <div className={classnames('uvs-container', Styles.widgetsContainer)}>
                  <WidgetsBelowContent />
                </div>
                <div className="uvs-container">{parseWidgets(page, true)}</div>
              </div>
              <Footer variant="dark" />
            </MainWrapper>
          </div>
        </Provider>
      );
    }

    return null;
  }
}

/**
 * propTypes
 * @property {Object} page - The page object from content API
 */
HorizontalSlideshow.propTypes = {
  page: PropTypes.object,
};

export default HorizontalSlideshow;
