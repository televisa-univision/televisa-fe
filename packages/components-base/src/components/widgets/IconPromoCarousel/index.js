import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';
import debounce from 'lodash.debounce';

import { withRouterContext } from '@univision/fe-commons/dist/components/RouterContext';
import Store from '@univision/fe-commons/dist/store/store';
import { getPageData } from '@univision/fe-commons/dist/store/storeHelpers';
import {
  isValidArray, getKey, slugify, toRelativeUrl,
} from '@univision/fe-commons/dist/utils/helpers';
import { shouldSkipSpa } from '@univision/fe-commons/dist/utils/helpers/spa';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import { asDeferrer } from '@univision/fe-commons/dist/utils/deferrer';
import config from '@univision/fe-commons/dist/config';
import features from '@univision/fe-commons/dist/config/features';
import WidgetTitle from '../WidgetTitle';
import Carousel from '../../Carousel';
import Item from './Item';
import Styles from './IconPromoCarousel.styles';

const Container = styled.div`
  ${Styles.container}
`;
const Wrapper = styled.div`
  ${Styles.wrapper}
`;
const PromoList = styled.div`
  ${Styles.promoList}
`;
const CarouselWrapper = styled.div`
  ${Styles.carouselWrapper}
`;

/**
 * Icon Promo Carousel
 */
@asDeferrer
class IconPromoCarousel extends Component {
  /**
   * Constructor
   * @param {Object} props Component properties
   */
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
    this.detectDimensions = this.detectDimensions.bind(this);
    this.onPressHandler = this.onPressHandler.bind(this);
    this.state = {
      printSlider: false,
    };
    this.timeout = null;
    this.isShow = features.shows.showsRedesign();
    this.debounceResize = debounce(this.detectDimensions, 100).bind(this);
  }

  /**
   * Listen resize window event and detects if the component
   * should render slider or list.
   */
  componentDidMount() {
    window.addEventListener('resize', this.debounceResize);
    this.defer(this.detectDimensions);
  }

  /**
   * Cleanup resize event
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.debounceResize);
    clearTimeout(this.timeout);
  }

  /**
   * Hanlder for onClik on each item
   * Fire the event
   * Navigate to privided uri
   * @param {string} uri - Url to redirect the user
   * @param {string} title - To get the label
   */
  onPressHandler(uri, title) {
    const { history } = this.props;
    if (typeof window !== 'undefined' && uri) {
      const pageData = getPageData(Store) || {};
      const { pageCategory } = pageData;
      const label = slugify(title);
      const utagData = {
        event: 'engagement_widget',
        event_action: `icon_promo_carousel_${pageCategory}`,
        event_label: label,
      };
      const path = toRelativeUrl(uri);
      Tracker.fireEvent(utagData);
      if (history && !shouldSkipSpa({ url: uri })) {
        history.push(path);
      } else {
        window.location.href = uri;
      }
    }
  }

  /**
   * Initialize the state to determine when print slider or list
   */
  detectDimensions() {
    const { itemWidth, content } = this.props;
    const { current: wrapper } = this.wrapper;

    if (wrapper && content.length > 0) {
      const { offsetWidth: maxWidth } = wrapper;
      this.setState({
        printSlider: content.length * itemWidth > maxWidth,
      });
    }
  }

  /**
   * Render the content (slider or list)
   * @returns {JSX}
   */
  renderContent() {
    const { content } = this.props;
    const { printSlider } = this.state;

    if (!isValidArray(content)) {
      return null;
    }
    const contentPromo = content.map(item => this.renderItemPromo(item));

    if (printSlider) {
      const innerWidth = getKey(global, 'window.innerWidth');
      const settings = {
        componentClass: classnames('carousel', { bigSize: this.isShow }),
        leftArrowClassName: classnames('arrow', 'arrowPrev'),
        rightArrowClassName: classnames('arrow', 'arrowNext'),
        arrowTheme: 'light',
        usePagination: false,
        partialShowing: true,
        separatorDefaultValue: 0,
        itemsToBeDisplayedDefault: 12,
        itemsToBeDisplayed: {
          xs: innerWidth && innerWidth <= 320 ? 3 : 5,
          sm: 7,
          md: 9,
        },
      };
      return (
        <CarouselWrapper>
          <Carousel {...settings}>
            {contentPromo}
          </Carousel>
        </CarouselWrapper>
      );
    }
    return (
      <PromoList isShow={this.isShow}>
        {contentPromo}
      </PromoList>
    );
  }

  /**
   * Render the individual promo bassed on Item component
   * @param {Oject} item object with the data
   * @returns {JSX}
   */
  renderItemPromo(item) {
    const { theme } = this.props;

    if (!item) {
      return null;
    }
    return (
      <Item
        key={item.uid}
        bigSize={this.isShow}
        uid={item.uid}
        uri={item.uri}
        image={item.image}
        onPressHandler={this.onPressHandler}
        theme={theme}
        title={item.title}
        variant={theme.isDark ? 'dark' : 'light'}
      />
    );
  }

  /**
   * Render method
   * @returns {JSX}
   */
  render() {
    const {
      theme, settings,
    } = this.props;
    return (
      <Container
        isShow={this.isShow}
        className="uvs-widget-lead"
      >
        {!this.isShow && (
          <WidgetTitle
            hidden
            titleLink={settings?.titleLink}
            title={settings?.title}
          />
        )}
        {(this.isShow || theme?.showIconPromoTitle) && (
          <WidgetTitle
            titleLink={settings?.titleLink}
            title={settings?.title}
          />
        )}
        <Wrapper
          ref={this.wrapper}
        >
          {this.renderContent()}
        </Wrapper>
      </Container>
    );
  }
}

/**
 * propTypes
 * @property {Object[]} content - the carousel tiems content
 * @property {number} [itemWidth=92] - default item with
 * @property {Object} [theme] - the theme object with primary color
 */
IconPromoCarousel.propTypes = {
  content: PropTypes.array.isRequired,
  itemWidth: PropTypes.number,
  theme: PropTypes.object,
  history: PropTypes.object,
  settings: PropTypes.object,
  widgetContext: PropTypes.object,
};

IconPromoCarousel.defaultProps = {
  itemWidth: 92,
  theme: config.defaultTheme,
};

export default withRouterContext(IconPromoCarousel);
