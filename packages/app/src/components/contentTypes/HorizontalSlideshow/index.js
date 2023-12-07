import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { hasKey, getKey } from '@univision/fe-commons/dist/utils/helpers';

import RelatedTags from '@univision/fe-components-base/dist/components/RelatedTagsLegacy';
import WithWidgets from '@univision/fe-components-base/dist/components/widgets/WithWidgets';
import insertionPoints from '@univision/fe-components-base/dist/components/widgets/WithWidgets/insertionPoints.json';

import WidgetsFactory from '../../../utils/factories/widgetsFactory';
import ConnectedGlobalWidget from '../../base/GlobalWidget';
import SlideshowMetadata from './SlideshowMetadata';
import ConnectedSlideshowWrapper from './SlideshowWrapper';
import Styles from './HorizontalSlideshow.scss';

/**
 * Horizontal Slideshow component
 */
class HorizontalSlideshow extends Component {
  /**
   * constructor
   * @param {Object} props component props
   */
  constructor(props) {
    super(props);

    const widgetsFactory = new WidgetsFactory(props.pageData);

    this.widgets = widgetsFactory.parseWidgets();
  }

  /**
   * Render a RelatedTags component if the prop is available as an array
   * @returns {JSX}
   */
  renderRelatedTags = () => {
    const { pageData } = this.props;
    const page = getKey(pageData, 'data');

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
    const { pageData } = this.props;
    const page = getKey(pageData, 'data');

    if (!page || !page.slides) return null;

    page.variant = 'dark';
    const WidgetsBelowContent = WithWidgets(null, [insertionPoints.belowContentBody]);

    return (
      <div className={Styles.slideshowBG}>
        <SlideshowMetadata page={page} />
        <ConnectedGlobalWidget isDark />
        <div className={`${Styles.main} ${Styles.mainHorizontal}`}>
          <ConnectedSlideshowWrapper initialPage={page} />
          <div className="uvs-container">{this.renderRelatedTags()}</div>
          <div className={classnames('uvs-container', Styles.widgetsContainer)}>
            <WidgetsBelowContent />
          </div>
          {this.widgets && (
            <div className="uvs-container">
              {this.widgets}
            </div>
          )}
        </div>
      </div>
    );
  }
}

/**
 * propTypes
 * @property {Object} page - The page object from content API
 */
HorizontalSlideshow.propTypes = {
  pageData: PropTypes.object,
};

export default HorizontalSlideshow;
