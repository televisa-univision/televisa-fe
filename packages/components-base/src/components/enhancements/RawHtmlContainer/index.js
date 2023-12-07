import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactReduxContext } from 'react-redux';

import {
  getAdSettings,
  getTracking,
} from '@univision/fe-commons/dist/store/storeHelpers';
import { deviceSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import {
  hasKey,
  getKey,
  isValidFunction,
} from '@univision/fe-commons/dist/utils/helpers';

import GatsbyInjector from '../../widgets/GatsbyInjector';
import Styles from './RawHtmlContainer.styles';

const RawHtmlStyled = styled.div`${Styles.raw}`;
const IframeStyled = styled.iframe`${Styles.iframe}`;
const EmbedWrapperStyled = styled.div`${Styles.dangerouslySet}`;

/**
 * This timeout was set after testing the different embed load times. Apparently different browsers
 * have slightly different timings, and also depend on the type of iframe (fb, twitter, etc). 3500
 * was a good threshold.
 */
const AFTER_LOAD_TIMEOUT = 3500;
const EMBEDS_ALLOW_HTML = ['facebook', 'youtube'];

/**
 * RawHtml enhancement container, directly injects
 * content via dangerouslySetInnerHTML
 */
class RawHtmlContainer extends React.Component {
  /**
   * Set setting and values depending of rawhtml type
   * @constructor
   * @param {Object} props react props of the component
   * @param {Object} context react context data with ReactReduxContext
   */
  constructor(props, context) {
    super(props, context);

    const { html } = props;
    this.store = context?.store;
    this.device = deviceSelector(this.store);
    this.type = RawHtmlContainer.getEmbedType(html);
    this.isUnivisionStatic = !!props.headers?.find(({ value }) => value === 'univision-static');
    /** UX is better with a transition from 0 height to correct height, instead of going from
     * NON-ZERO-DEFAULT-VALUE height -> correct height.
     */
    this.state = { iframeHeight: 0 };

    if (this.isIframeBased()) {
      this.iframe = React.createRef();
      this.changeFrameHeight = this.changeFrameHeight.bind(this);
      this.changeMobileTwitterEmbedWidth = this.changeMobileTwitterEmbedWidth.bind(this);
      this.postLoad = this.executeAfterLoad.bind(
        this,
        this.changeFrameHeight,
        this.changeMobileTwitterEmbedWidth
      );
    }
  }

  /**
   * Set up component listeners
   */
  componentDidMount() {
    if (this.isIframeBased()) {
      this.executeSimulatedOnLoad(this.changeFrameHeight, this.changeMobileTwitterEmbedWidth);
      this.initializeResizeListener(this.changeFrameHeight);
    }
  }

  /**
   * Do component clean up
   */
  componentWillUnmount() {
    if (this.embedLoadedTimeout) {
      clearTimeout(this.embedLoadedTimeout);
      this.embedLoadedTimeout = null;
    }

    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = null;
    }

    if (this.embedSimulatedLoadedTimeout) {
      clearTimeout(this.embedSimulatedLoadedTimeout);
      this.embedSimulatedLoadedTimeout = null;
    }
    window.removeEventListener('resize', this.resizeThrottler);
  }

  /**
   * Determines the type of embed
   * @param {string} html of the fragment
   * @returns {string}
   */
  static getEmbedType(html) {
    if (!html) {
      return 'html';
    }

    let type = 'html';

    if (html.match(/twitter-(tweet|video)/i)) {
      type = 'twitter';
    }
    if (html.match(/fb-post/i)) {
      type = 'facebook';
    }
    if (html.match(/instagram-media/i)) {
      type = 'instagram';
    }
    if (html.match(/youtube/i)) {
      type = 'youtube';
    }

    return type;
  }

  /**
   * Creates a resize handler that's throttled to 15 FPS
   * @param {function} resizeHandler the callback to be called when resize event fires
   * @returns {function} the actual resize handler which will be throttled
   */
  createResizeThrottler(resizeHandler) {
    return function resizeThrottler() {
      // Ignore resize events as long as an actualResizeHandler execution is in the queue
      if (!this.resizeTimeout) {
        this.resizeTimeout = setTimeout(() => {
          clearTimeout(this.resizeTimeout);
          this.resizeTimeout = null;
          resizeHandler();

          // actualResizeHandler will execute at a rate of 15 FPS
        }, 66);
      }
    }.bind(this);
  }

  /**
   * Initialize throttled resize listener to fix iframe height whenever window is resized.
   * @param {function} resizeHandler the callback to be called when resize event fires
   */
  initializeResizeListener(resizeHandler) {
    this.resizeThrottler = this.createResizeThrottler(resizeHandler);
    window.addEventListener('resize', this.resizeThrottler);
  }

  /**
   * Logic to run after a specific timeout to fix up the iframe width and height accordingly.
   * @param {array} cbs array of callback functions to call after we know embed was loaded.
   */
  executeAfterLoad(...cbs) {
    this.onLoadFired = true;
    this.embedLoadedTimeout = setTimeout(() => {
      cbs.forEach(cb => isValidFunction(cb) && cb());
    }, AFTER_LOAD_TIMEOUT);
  }

  /**
   * Sometimes the onLoad event is not fired, we need to simulate it.
   * @param {array} cbs array of callback functions to call after we know embed was loaded.
   */
  executeSimulatedOnLoad(...cbs) {
    this.embedSimulatedLoadedTimeout = setTimeout(() => {
      if (!this.onLoadFired) {
        cbs.forEach(cb => isValidFunction(cb) && cb());
      }
    }, AFTER_LOAD_TIMEOUT);
  }

  /**
   * Adapt twitter embed width for mobile. Twitter embed comes with a fixed width of 500px and it
   * cuts off on mobile devices.
   */
  changeMobileTwitterEmbedWidth() {
    const twitterLoaded = getKey(
      this.iframe,
      'current.contentWindow.__twttr.widgets.loaded',
      false
    );

    if (this.type === 'twitter' && this.device === 'mobile' && twitterLoaded) {
      const iframeDocument = getKey(this.iframe, 'current.contentWindow.document', null);

      if (iframeDocument) {
        const [twitterWidget] = iframeDocument.getElementsByTagName('twitter-widget');
        twitterWidget.style.width = `${window.innerWidth * 0.8}px`;
      }
    }
  }

  /**
   * Correct iframe height when it's finally loaded
   */
  changeFrameHeight() {
    const iframeBody = getKey(this.iframe, 'current.contentWindow.document.body', null);

    if (iframeBody) {
      this.setState({ iframeHeight: iframeBody.clientHeight + 20 });
    }
  }

  /**
   * Determines if the HTML will require to be loaded on an iframe
   * @returns {boolean}
   */
  isIframeBased() {
    return this.type !== 'html';
  }

  /**
   * Renders the raw html inside an iframe
   * @returns {boolean}
   */
  renderIframe() {
    const {
      props: {
        html,
        className,
        settingsExternalContent,
      },
      state: { iframeHeight },
      type,
    } = this;
    const fullWidth = getKey(settingsExternalContent, 'fullWidth', false);

    return (
      <RawHtmlStyled
        isUnivisionStatic={this.isUnivisionStatic}
        className={className}
        fullWidth={fullWidth}
        data-type={type}
      >
        {EMBEDS_ALLOW_HTML.includes(type)
          // It's ok to inject this html
          // is coming from Facebook API or Youtube
          // that render in it's own iframe
          // eslint-disable-next-line react/no-danger
          ? (
            <div>
              <EmbedWrapperStyled
                isUnivisionStatic={this.isUnivisionStatic}
                dangerouslySetInnerHTML={{ __html: html }}
                data-type={type}
              />
            </div>
          )
          : (
            <div>
              <IframeStyled
                ref={this.iframe}
                onLoad={this.postLoad}
                height={iframeHeight}
                srcDoc={html}
                scrolling="no"
                title={`socialEmbed-${this.type}`}
              />
            </div>
          )
        }
      </RawHtmlStyled>
    );
  }

  /**
   * Renders the raw html inside the div
   * @returns {JSX}
   */
  renderHtml() {
    const {
      html,
      className,
      settingsExternalContent,
    } = this.props;
    const minHeight = getKey(settingsExternalContent, 'minHeight', null);
    const fullWidth = getKey(settingsExternalContent, 'fullWidth', false);
    let newlazyLoadUrl = null;
    let isIframe = false;
    const trackingData = { ...getTracking(this.store) };

    // filter the tracking object to redice the query string of the iframe
    const trackingDataFiltered = {
      content_id: trackingData.content_id, // CD 3
      section_level1: trackingData.section_level1, // CD 5
      title: trackingData.title, // CD 15
      content_type: trackingData.content_type, // CD 17
      permalink: trackingData.permalink, // CD 40
      section_full_hierarchy: trackingData.section_full_hierarchy, // CD 46,
      content_vertical: trackingData.content_vertical, // CD 64
      section_level2: trackingData.section_level2, // CD 71
      section_level3: trackingData.section_level3, // CD 72
      environment_name: trackingData.environment_name, // CD 60
    };

    if (hasKey(settingsExternalContent, 'lazyLoadUrl')) {
      newlazyLoadUrl = `${settingsExternalContent.lazyLoadUrl}&adSettings=${encodeURI(JSON.stringify(getAdSettings(this.store)))
      }&tracking=${encodeURI(JSON.stringify(trackingDataFiltered))}`.replace('https://static.univision.com/external-content/embed.js?', '');
    }

    if (hasKey(settingsExternalContent, 'display')) {
      isIframe = settingsExternalContent.display === 'iframe';
    }

    return (
      <Fragment>
        {isIframe
          // We can't inject a script in the client using dangerouslySetInnerHTML
          // so we need to use a ref
          ? <GatsbyInjector params={newlazyLoadUrl} minHeight={minHeight} />
          // It's ok to inject a script in the SSR
          // eslint-disable-next-line react/no-danger
          : (
            <RawHtmlStyled
              className={className}
              isUnivisionStatic={this.isUnivisionStatic}
              style={{ minHeight }}
              fullWidth={fullWidth}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )
        }
      </Fragment>
    );
  }

  /**
   * inject html via dangerouslySetInnerHTML or inside an iframe, and render
   * @returns {JSX}
   */
  render() {
    const { html } = this.props;
    if (!html) {
      return null;
    }

    return this.isIframeBased() ? this.renderIframe() : this.renderHtml();
  }
}

RawHtmlContainer.propTypes = {
  headers: PropTypes.array,
  html: PropTypes.string.isRequired,
  className: PropTypes.string,
  settingsExternalContent: PropTypes.object,
};

RawHtmlContainer.contextType = ReactReduxContext;

export default RawHtmlContainer;
