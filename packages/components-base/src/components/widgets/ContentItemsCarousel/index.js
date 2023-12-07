import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';

import features from '@univision/fe-commons/dist/config/features';
import { asDeferrer } from '@univision/fe-commons/dist/utils/deferrer';
import Carousel from '../../Carousel';
import ContentCard from '../../ContentCard';
import TopicBar from '../../TopicBar';
import Styles from './ContentItemsCarousel.scss';

/**
 * Content Item Cards Carousel
 */
@asDeferrer
class ContentItemsCarousel extends Component {
  /**
   * Constructor
   * @param {Object} props Component properties
   */
  constructor(props) {
    super(props);
    this.onClickArrow = this.onClickArrow.bind(this);
    this.timeout = null;
    this.isShow = features.shows.showsRedesign();
  }

  /**
   * Force a resize event so slick sizes the slides correctly
   * See: https://github.com/akiran/react-slick/issues/809
   */
  componentDidMount() {
    this.defer(() => {
      window.dispatchEvent(new Event('resize'));
    });
  }

  /**
   * Track clicks on the slider arrows
   */
  onClickArrow() {
    const { widgetContext } = this.props;
    WidgetTracker.track(WidgetTracker.events.click, { widgetContext, target: 'nav_arrow' });
  }

  /**
   * Render method
   * @returns {JSX}
   */
  render() {
    const {
      settings,
      content,
      theme,
      widgetContext,
    } = this.props;
    const itemsToBeDisplayed = {
      xs: 1,
      sm: 2,
      md: 4,
      lg: 4,
      xl: 4,
    };
    const variant = this.isShow ? 'dark' : 'light';
    return (
      <div className={classnames('uvs-widget-lead', Styles.container, { [Styles.dark]: this.isShow })}>
        <TopicBar settings={settings} separator="top" theme={theme} variant={variant} widgetContext={widgetContext} />
        <div className={Styles.wrapper}>
          <Carousel
            usePagination
            itemsToBeDisplayed={itemsToBeDisplayed}
            mobilePeek={80}
            separator={0}
            maskWrapper={Styles.carouselMask}
            className={Styles.carousel}
            leftArrowClassName={Styles.leftArrow}
            rightArrowClassName={Styles.rightArrow}
            nextAction={this.onClickArrow}
            prevAction={this.onClickArrow}
          >
            {
              content.slice(0, settings.contentLimit).map(item => (
                <div key={item.uid} className={Styles.contentCardWrapper}>
                  <ContentCard
                    device="desktop"
                    image={item.image}
                    primaryTag={item.primaryTag}
                    showIcon
                    title={item.title}
                    type={item.type}
                    authors={item.authors}
                    className={Styles.card}
                    {...item}
                    theme={theme}
                    variant={variant}
                    widgetContext={widgetContext}
                  />
                </div>
              ))
            }
          </Carousel>
        </div>
      </div>
    );
  }
}

ContentItemsCarousel.propTypes = {
  settings: PropTypes.shape({
    title: PropTypes.string,
    contentLimit: PropTypes.number,
  }),
  content: PropTypes.array.isRequired,
  theme: PropTypes.object,
  widgetContext: PropTypes.object,
};

ContentItemsCarousel.defaultProps = {
  settings: {
    title: '',
    titleLink: '',
    contentLimit: 16,
  },
  theme: {},
  widgetContext: {},
};

export default ContentItemsCarousel;
