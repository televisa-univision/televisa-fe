import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Store from '@univision/fe-commons/dist/store/store';
import { getPageData, getBrandable } from '@univision/fe-commons/dist/store/storeHelpers';
import classnames from 'classnames';
import pascalcase from 'pascalcase';
import { exists, hasKey } from '@univision/fe-commons/dist/utils/helpers';

import TopicBar from '@univision/fe-components-base/dist/components/TopicBar';
import Clickable from '@univision/fe-components-base/dist/components/Clickable';
import Image from '@univision/fe-components-base/dist/components/Image';
import Sponsor from '@univision/fe-components-base/dist/components/Sponsor';
import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';
import LayerNavigation from '@univision/shared-components/dist/components/LayerNavigation';

import localization from '../../../utils/localization';

import Styles from './Weather.scss';

/**
 * Weather Widget
 * @returns {JSX}
 */
class Weather extends Component {
  /**
   * Sets initial state for widget
   * @constructor
   * @param {Object} props component props
   */
  constructor(props) {
    super(props);

    const { options } = props.type;
    const brandable = getBrandable(Store);
    const feedGeneratedAt = hasKey(getPageData(Store), 'data.feedGeneratedAt')
      ? getPageData(Store).data.feedGeneratedAt
      : new Date().toJSON().slice(0, 10);

    if (exists(options) && options.length) {
      const singleColumnLimit = 3;
      this.state = {
        activeOption: options[0],
        menuOpen: false,
        feedGeneratedAt,
        singleColumnList: options.length <= singleColumnLimit,
        uri: brandable.uri,
      };
    }
  }

  /**
   * Updates State with Selected Option
   * @param {Object} activeOption object containing option data
   */
  setActiveOption = (activeOption) => {
    this.setState({
      activeOption,
    });
  };

  /**
   * Handles menu opening and closing (only for layer navigation)
   * Event is fired for tracking purposes.
   */
  menuOpenAction = () => {
    this.setState(({ menuOpen }) => ({
      menuOpen: !menuOpen,
    }));
  };

  /**
   * Handles option click on layer nav. Sets the active option and closes the layer overlay.
   * @param {Object} selectedOption to set
   * @returns {Function} actual handler
   */
  handleLayerNavOptionPress = selectedOption => () => {
    const { activeOption } = this.state;
    const newState = { menuOpen: false };

    if (selectedOption !== activeOption) {
      newState.activeOption = selectedOption;
    }

    this.setState(newState);
  };

  /**
   * Parse `uri` from api for use as `City` in `url` schema
   * eg: /los-angeles/kmex
   * @param {string} uri The url received from  API
   * @returns {string} city The city to be used in image url
   */
  getLocalMarketFromUri = () => {
    // TEMPORARY List of Exceptions
    const exceptions = {
      NorthCarolina: 'Raleigh',
      Philadelphia: 'Philly',
      PuertoRico: 'PuertoRicoi',
      SanFrancisco: 'AreadelaBahia',
      WUVG: 'WUGV',
    };
    const { uri } = this.state;

    // `/los-angeles/kmex/` => `los-angeles/kmex`
    // `/local/los-angeles/kmex/` => `los-angeles/kmex`
    const LOCAL_PREFIX = '/local/';
    const hasLocalPrefix = uri.startsWith(LOCAL_PREFIX);
    const clearnUri = uri.substr(hasLocalPrefix ? LOCAL_PREFIX.length : 1);
    const uriSeparator = hasLocalPrefix ? '-' : '/';
    let city = '';
    let call = '';
    // City
    if (hasLocalPrefix) {
      const uriParts = clearnUri.split(uriSeparator);
      city = uriParts.slice(0, uriParts.length - 1).join(uriSeparator);
      call = uriParts[uriParts.length - 1].toUpperCase();
    } else {
      city = clearnUri.slice(0, clearnUri.indexOf(uriSeparator));
      call = clearnUri.slice(clearnUri.indexOf(uriSeparator) + 1, clearnUri.length).toUpperCase();
    }

    city = pascalcase(city);

    if (call.endsWith('/')) {
      call = call.slice(0, -1);
    }

    return {
      call: hasKey(exceptions, call) ? exceptions[call] : call,
      city: hasKey(exceptions, city) ? exceptions[city] : city,
    };
  };

  getImageFromActiveOption = () => {
    const {
      props: { type },
      state: {
        feedGeneratedAt,
        activeOption: { format, alt, name },
      },
    } = this;
    const { call, city } = this.getLocalMarketFromUri();

    // Default domain
    const domain = 'http://cdn1.uvnimg.com/weather-widget';

    // Tropical Weather Conditions is the only weather widget with a different url schema
    const tropical = type.type === 'noticiascardtropicalweatherconditions';

    // Weather image url constructor
    const url = tropical
      ? `${domain}/${name}_TROPICAL.jpg?ts=${feedGeneratedAt}`
      : `${domain}/${name}_${city}_${call}.${format}?ts=${feedGeneratedAt}`;

    // Alt text + city
    const altText = `${alt} ${city}`;

    return <Image alt={altText} className={Styles.graphic} src={url} />;
  };

  /**
   * Renders list of options for current weather widget
   * @returns {JSX}
   */
  renderOptions = () => {
    const {
      props: {
        type: { options },
      },
      state: { activeOption, singleColumnList },
    } = this;

    const optionsList = [];
    options.forEach((option) => {
      const weatherOptionEl = (
        <div
          className={classnames('col-4', Styles.optionCont, {
            'col-6': options.length <= 2,
            [Styles.singleCol]: singleColumnList,
            'col-md-12': singleColumnList,
            'col-md-6': !singleColumnList,
          })}
          key={`weather-option-${option.name}`}
        >
          <Clickable
            className={classnames(Styles.option, 'uvs-font-a-bold', {
              [Styles.active]: option === activeOption,
            })}
            icon={!singleColumnList ? option.icon : 'arrow'}
            iconSize={!singleColumnList ? 'small' : 'xsmall'}
            label={option.label}
            onClick={() => this.setActiveOption(option)}
            valign={!singleColumnList ? 'top' : ''}
          />
        </div>
      );
      optionsList.push(weatherOptionEl);
    });
    return <div className="row no-gutters">{optionsList}</div>;
  };

  /* eslint-disable react/destructuring-assignment */
  /**
   * Renders sponsor bar
   * @returns {JSX}
   */
  renderSponsor = () => hasKey(this.props.sponsor, 'link') && (
  <div className="row">
    <div className={`col ${Styles.sponsor}`}>
      <Sponsor {...this.props.sponsor} sponsorBy={localization.get('hostedBy')} />
    </div>
  </div>
  );

  renderTopicBar = () => (
    <div className={`row ${Styles.topicBarCont}`}>
      <div className="col-12">
        <TopicBar
          className={`${Styles.topicBar}`}
          separator="top"
          settings={{ title: this.props.type.title }}
          theme={this.props.theme}
          titleTagElement="h2"
        />
      </div>
    </div>
  );

  renderGraphic = () => {
    const {
      type: { options },
      withLayerNav,
    } = this.props;

    /**
     * Widgets with layer nav have an image that takes the whole width (no matter how many options
     * the nav menu has).
     * Widgets without the layer nav have an image that changes size depending on how many
     * options the nav menu has.
    */
    return (
      <div
        className={classnames('col-12', Styles.weatherGraphicCont, {
          'col-md-10': !withLayerNav && options.length <= 3,
          'col-md-9': !withLayerNav && options.length > 3,
        })}
      >
        {this.getImageFromActiveOption()}
      </div>
    );
  };

  /**
   * Renders weather widget with original navigation (no layer)
   * @param {array} options the weather options that are available to select
   * @returns {JSX}
   */
  renderWidget = () => {
    const { type: { options } } = this.props;

    return (
      <div className={`row ${Styles.weatherCont}`}>
        {this.renderGraphic()}

        {/* Options */}
        <div
          className={classnames('col-12', Styles.weatherOptionsCont, {
            'col-md-2': options.length <= 3,
            'col-md-3': options.length > 3,
          })}
        >
          {this.renderTopicBar()}
          {this.renderOptions()}
          {this.renderSponsor()}
        </div>
      </div>
    );
  }

  /**
   * Renders weather widget with layer navigation
   * @param {array} options the weather options that are available to select
   * @returns {JSX}
   */
  renderWidgetWithLayerNav = () => {
    const { type: { options } } = this.props;

    return (
      <LayerNavigation
        activeOption={this.state.activeOption}
        handleOptionPress={this.handleLayerNavOptionPress}
        menuOpen={this.state.menuOpen}
        menuOpenAction={this.menuOpenAction}
        options={options}
        twoColumn={options.length <= 2}
      >
        {this.renderGraphic()}
      </LayerNavigation>
    );
  }

  /**
   * Renders weather widget
   * @returns {JSX}
   */
  render() {
    // Type of weather information to display
    // e.g.: `NoticiasCardWeatherMaps`
    const { type, withLayerNav } = this.props;

    // Returns null if no weather options are present
    if (!hasKey(type, 'options') || !type.options.length || !this.state.uri) {
      return null;
    }

    const classes = classnames('uvs-widget', Styles.container, {
      [Styles.layerNavContainer]: withLayerNav,
    });

    return (
      <div className={classes}>
        {this.renderTopicBar()}
        <FullWidth breakpoints={['xxs', 'xs', 'sm']}>
          {withLayerNav ? this.renderWidgetWithLayerNav() : this.renderWidget()}
        </FullWidth>
      </div>
    );
  }
}

Weather.propTypes = {
  type: PropTypes.object,
  sponsor: PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string,
    logo: PropTypes.string,
  }),
  theme: PropTypes.object,
  withLayerNav: PropTypes.bool,
};

export default Weather;
