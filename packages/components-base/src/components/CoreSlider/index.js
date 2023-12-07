import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';

import Store from '@univision/fe-commons/dist/store/store';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import { exists } from '@univision/fe-commons/dist/utils/helpers';
import Icon from '@univision/fe-icons/dist/components/Icon';

import Styles from './CoreSlider.scss';

/**
 * Wrapper for autoplaying slick slider
 * that uses a custom timer function to override issues with
 * react-slick autoplay functionality. The component can be
 * changed configuration based on settings types
 * but it can be also overridden / extended using props
 * @param {number} idx the index returned from the timer
 */
class CoreSlider extends Component {
  /**
   * constructor
   * @param {Object} props Component properties
   */
  constructor(props) {
    super();

    this.clientInitialized = this.clientInitialized.bind(this);
    this.state = {};

    const { children } = props;
    let { placeholder } = props;

    if (!exists(placeholder)) {
      if (Array.isArray(props.children)) {
        const device = getDevice(Store);
        const isMobile = device === 'mobile';
        const numDesktopCards = children.length >= 4 ? 4 : children.length;
        const placeholderLimit = isMobile ? 1 : numDesktopCards;

        placeholder = (
          <div className="row no-gutters">
            {props.children.slice(0, placeholderLimit).map((card, i) => {
              const key = `sliderPlaceHolder${i}`;
              return (
                <div key={key} className={`${isMobile ? 'col-12' : 'col-md-3'}`}>
                  {card}
                </div>
              );
            })}
          </div>
        );
      } else {
        placeholder = null;
      }
    }

    // Slick is behind a Loadable component so in order to get the real slick reference
    // we need to obtain this from the render method
    this.slider = React.createRef();
    const reference = this;
    this.Slick = Loadable({
      loader: () => import(/* webpackChunkName: "reactSlick" */ 'react-slick'),
      loading: () => placeholder,
      render(loaded, loadProps) {
        const Slider = loaded.default;
        return (
          <Slider
            ref={reference.slider}
            {...loadProps}
          />
        );
      },
    });
  }

  /**
   * Initialize the timer for the component and adds tracking to the Slider
   */
  componentDidMount() {
    // eslint-disable-next-line
    import(/* webpackChunkName: "reactSlick" */ '@univision/fe-commons/dist/assets/styles/global/slick.global.scss');
    this.clientInitialized();
  }

  /**
   * In case there is no change on state or props with user interaction
   * consider this as {false} to avoid re-render using props.shouldUpdate
   * @returns {boolean}
   */
  shouldComponentUpdate() {
    const { shouldUpdate } = this.props;

    if (this.props && typeof shouldUpdate !== 'undefined' && !shouldUpdate) {
      return false;
    }
    return true;
  }

  /**
   * Imports a {Settings} object for this slider wrapper
   * to inject as props to the {Slick} component
   * @returns {Object} props for the {Slick} component
   */
  getSettings() {
    const {
      props: {
        settings, onChangeSlide, tooltip, className: classNameProp,
      },
      state: { clientInitialized },
    } = this;

    if (exists(onChangeSlide)) {
      settings.afterChange = onChangeSlide;
    }
    let className = classNameProp || '';
    if (clientInitialized) {
      className += ' slick-client-ready';
    }
    if (tooltip) {
      className += ' slick-tooltip';
    }
    return Object.assign(settings, { className, autoplay: false });
  }

  /**
   * Go to selected slide, right now slick is under a wrapper so external components can't access
   * the object directly. There's a props to send slick to a determined slide (slickGoTo) but this
   * prop is deprecated in favor to this method
   * @param {number} slide - slide to go
   */
  goToSlide(slide) {
    if (this.slider.current) {
      this.slider.current.slickGoTo(slide);
    }
  }

  /**
   * called in componentDidMount to indicate the
   * slider has been rendered on the client-side.
   */
  clientInitialized() {
    this.setState({ clientInitialized: true });
  }

  /**
   * Wraps children in {Slick} component
   * @returns {JSX}
   */
  render() {
    const { tooltip, tooltipClass, children } = this.props;

    if (exists(children) && children.length > 0) {
      return (
        <Fragment>
          {tooltip && (
            <div className={`${Styles.hand} ${tooltipClass || ''}`}>
              <Icon size="large" name="hand" />
            </div>
          )}
          <this.Slick {...this.getSettings()}>{children}</this.Slick>
        </Fragment>
      );
    }

    return null;
  }
}

/**
 * Default Prop Values
 * @see https://github.com/akiran/react-slick for default configuration
 * @type {{}}
 */
CoreSlider.defaultProps = {};

/**
 * propTypes
 * @property {Node} children Children of this component
 * @property {boolean} shouldUpdate True if {CoreSlider#shouldComponentUpdate} should execute
 * @property {string} type Type of Slider. Used to determine {Settings} object to use.
 */
CoreSlider.propTypes = {
  children: PropTypes.node,
  shouldUpdate: PropTypes.bool,
  settings: PropTypes.object,
  onChangeSlide: PropTypes.func,
  className: PropTypes.string,
  tooltip: PropTypes.bool,
  tooltipClass: PropTypes.string,
  placeholder: PropTypes.node,
};

CoreSlider.defaultProps = {
  settings: {},
};

export default CoreSlider;
