import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ResponsiveLoader from '@univision/fe-commons/dist/components/breakpoint/ResponsiveLoader';
import Store from '@univision/fe-commons/dist/store/store';
import { getSharingOptions, getPageData } from '@univision/fe-commons/dist/store/storeHelpers';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import { withRouterContext } from '@univision/fe-commons/dist/components/RouterContext';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { getKey, slugify } from '@univision/fe-commons/dist/utils/helpers';
import { shouldSkipSpa } from '@univision/fe-commons/dist/utils/helpers/spa';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';

import ShareBar from '../../ShareBar';
import TopicBar from '../../TopicBar';
import Link from '../../Link';

import configs from './configs';

import Styles from './Horoscope.scss';

const MIN_YEAR = 1897;
const MAX_YEAR = new Date().getFullYear();
/**
 * [Horoscope description]
 * @extends React
 */
class Horoscope extends React.Component {
  /**
   * define initial state;
   */
  constructor() {
    super();
    this.state = {
      year: '',
      index: null,
    };
    this.timeout = null;

    this.onSelectAnimal = this.onSelectAnimal.bind(this);
    this.onShare = this.onShare.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  /**
   * Component will unmount method
   */
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  /**
   * handle year input change and update state accordingly
   * @param   {Object} e event object
   */
  onChangeInput(e) {
    let year = parseInt(e.target.value, 10);
    const offset = 8;
    if (Number.isNaN(year)) year = '';
    let index;
    if (year >= MIN_YEAR && year <= MAX_YEAR) {
      index = year + offset - Math.floor((year + offset) / 12) * 12;
    }
    this.setState({
      year,
      index,
    });
    const { animals } = configs;
    if (animals[index]) {
      this.trackEvents(year.toString());
    }
  }

  /**
   * handle click on share button
   * @param {string} name social network name (facebook, twitter, mail, etc)
   */
  onShare = (name) => {
    const pageData = getPageData(Store);
    const { data: { uid, title, type } } = pageData;
    const shareData = { uid, title, type };
    SocialTracker.track(SocialTracker.events.share, { name, ...shareData });
  };

  /**
   * Hanlder for onClik on each animal
   * Fire the event
   * Navigate to provided uri
   * @param {string} name - Animal name
   * @param {string} path - Url to navigation
   */
  onSelectAnimal(name, path) {
    const { history } = this.props;
    if (getKey(global, 'window') && path) {
      this.trackEvents(name);
      if (history && !shouldSkipSpa({ url: path })) {
        history.push(path);
      } else {
        window.location.href = path;
      }
    }
  }

  /**
   * Tracking custom events
   * @param {string} actionName Name of the action to track.
   */
  trackEvents = (actionName) => {
    const utagData = {
      event: 'engagement_widget',
      event_action: 'horoscope_widget_chinese',
      event_label: slugify(actionName),
    };
    Tracker.fireEvent(utagData);
  };

  /**
   * return the view
   * @returns {JSX} the view
   */
  render() {
    const { year, index } = this.state;
    const { theme, widgetContext } = this.props;
    let share;
    let sharingOptions;
    let animal;
    const { animals, settings } = configs;
    const { title, description } = settings;

    if (animals[index]) {
      animal = animals[index];
      sharingOptions = getSharingOptions(Store);
      Object.keys(sharingOptions).forEach((name) => {
        sharingOptions[name].url = `${global.window.location.origin}${animal.path}`;
        sharingOptions[name].title = `${animal.name} del Horóscopo Chino`;
      });
      share = (
        <ShareBar className={Styles.share} onClick={this.onShare} sharingOptions={sharingOptions} />
      );
    }
    /* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */
    return (
      <div className={classnames('uvs-widget-lead', 'row', Styles.horoscopeContainer)}>
        <div className="col-12 col-md-5 col-lg-4">
          <TopicBar
            settings={{ title }}
            separator="top"
            theme={theme}
            widgetContext={widgetContext}
          />
          <p className={Styles.intro}>{description}</p>
          <div className="row">
            <form className="col-12 col-sm-8 col-md-12" onSubmit={e => e.preventDefault()}>
              <label htmlFor="year">¿En que año naciste?</label>
              <input
                id="year"
                name="year"
                className={Styles.year}
                onChange={this.onChangeInput}
                type="number"
                min={MIN_YEAR}
                max={MAX_YEAR}
                value={year}
                placeholder="Ej: 1990"
                autoComplete="off"
              />
            </form>
            <ResponsiveLoader breakpoints={['sm', 'md', 'lg', 'xl']}>
              <div className="col-sm-4 col-md-12">{share}</div>
            </ResponsiveLoader>
          </div>
        </div>
        <div className={classnames('col-12', 'col-md-7', 'col-lg-8', Styles.animals)}>
          {animal && (
          <Link
            className={classnames(Styles.assist, Styles.show)}
            href={`#horoscopo-chino-${animal.name}`}
          >
              Mira El Resultado
            <Icon name="arrowDown" size="xxsmall" />
          </Link>
          )}
          {animals.map(({ name, path, icon }, i) => (
            <div
              key={name}
              onClick={() => this.onSelectAnimal(name, path)}
              role="button"
              tabIndex={[i]}
              alt={name}
              id={`horoscopo-chino-${name}`}
              className={classnames(Styles.animalWrapper, {
                [Styles.active]: i === index,
                [Styles.inactive]: Number.isInteger(index) && i !== index,
              })}
            >
              <div className={classnames(Styles.animal, 'uvs-font-b-regular')}>
                {icon && <img className={Styles.icon} src={icon} alt={name} />}
                {name}
              </div>
              {i === index && <small className={Styles.assist}>Ver predicción</small>}
            </div>
          ))}
        </div>
        {share && <ResponsiveLoader breakpoints={['xs']}>{share}</ResponsiveLoader>}
      </div>
    );
  }
}

Horoscope.propTypes = {
  theme: PropTypes.object,
  widgetContext: PropTypes.object,
  history: PropTypes.object,
};

export default withRouterContext(Horoscope);
