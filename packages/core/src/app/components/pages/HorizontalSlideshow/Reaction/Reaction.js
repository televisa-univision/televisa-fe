import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import appConfig from 'app/config';
import request from '@univision/fe-commons/dist/utils/api/request';
import PollTracker from '@univision/fe-commons/dist/utils/tracking/tealium/poll/PollTracker';
import LocalStorage from '@univision/fe-commons/dist/utils/helpers/LocalStorage';
import Store from '@univision/fe-commons/dist/store/store';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { isValidArray, hasKey, getKey } from '@univision/fe-commons/dist/utils/helpers';
import Styles from './Reaction.scss';
import reactionIconMapping from './reactionIconMapping';

/**
 * Reaction component for reaction slideshows
 */
class Reaction extends Component {
  /**
   * Constructor
   * @param {Object} props React Props for this component
   */
  constructor(props) {
    super(props);
    this.storageKey = 'reactionSlides';
    this.maxStorageEntries = 5000;
    this.state = {
      voteResponse: null,
    };
    this.requestPreviousVote = this.requestPreviousVote.bind(this);
    this.countVote = this.countVote.bind(this);
    const { webAppPollOptions } = props;

    this.isWebAppPoll = isValidArray(webAppPollOptions);
  }

  /**
   * Request previous vote
   */
  componentDidMount() {
    const { slideId } = this.props;
    this.requestPreviousVote(slideId);
    // Clear localStorage
    const localData = LocalStorage.getObject(this.storageKey);
    if (localData && Object.keys(localData).length >= this.maxStorageEntries) {
      LocalStorage.remove(this.storageKey);
    }
  }

  /* eslint camelcase: "off" */
  /* eslint-disable react/sort-comp */
  /**
   * Request previous vote if new slide
   * @param {Object} nextProps the next props
   */
  UNSAFE_componentWillUpdate(nextProps) {
    const { slideId } = this.props;
    if (nextProps.slideId !== slideId) {
      clearTimeout(this.timeout);
      this.requestPreviousVote(nextProps.slideId);
    }
  }

  /**
   * Clear timeout on unmount
   */
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  /**
   * Check if user already voted
   * @returns {bool}
   */
  getUserVote = () => {
    const { voteResponse } = this.state;
    const localData = LocalStorage.getObject(this.storageKey);
    if (localData && voteResponse) {
      return localData[voteResponse?.id];
    }
    return null;
  };

  /**
   * Go to next slide
   */
  goToNextSlide = () => {
    const { goToNext } = this.props;
    goToNext();
    this.setState({ voteResponse: null });
  };

  /**
   * Request the previous vote
   * @param {string} slideId the slide id
   */
  async requestPreviousVote(slideId) {
    const { slideshowId } = this.props;

    this.setState({ voteResponse: null });

    const voteResponse = await request({
      uri: `${appConfig.routes.proxy.uncached}/poll-api`,
      params: {
        slideshowId,
        slideId,
        readOnly: true,
        webAppPoll: this.isWebAppPoll,
      },
    });

    this.setState({ voteResponse: voteResponse?.data });
  }

  /**
   * Advance the slideshow after timeout
   */
  advanceSlideshow = () => {
    const { autoSlideChangeTime, goToNext } = this.props;
    this.timeout = setTimeout(() => {
      goToNext();
      this.setState({ voteResponse: null });
    }, autoSlideChangeTime * 1000);
  };

  /**
   * Tracks the submission of a reaction
   * @param {bool} userVote user vote status
   */
  trackReaction = (userVote) => {
    const { slideId } = this.props;
    if (!userVote && slideId) {
      PollTracker.track(PollTracker.events.submission, { type: 'reaction slide' });
    }
  };

  /**
   * Saves the vote to the localStorage
   * @param {string} id Vote id
   * @param {string} value Vote value
   * @returns {boolean}
   */
  saveVote(id, value) {
    return LocalStorage.setObject(
      this.storageKey,
      Object.assign(LocalStorage.getObject(this.storageKey) || {}, { [id]: value })
    );
  }

  /**
   * Count the vote
   * @param {Object} pollOption the pollOption the user chose
   * @param {bool} userVote user vote status
   */
  async countVote(pollOption, userVote) {
    const { slideshowId, slideId } = this.props;

    if (!userVote && slideId) {
      this.setState({ voteResponse: null });

      const voteResponse = await request({
        uri: `${appConfig.routes.proxy.uncached}/poll-api`,
        params: {
          slideshowId,
          slideId,
          option: pollOption.internalName,
          webAppPoll: this.isWebAppPoll,
        },
      });
      if (hasKey(voteResponse, 'status') && voteResponse?.status === 'success') {
        this.saveVote(voteResponse?.data.id, pollOption?.internalName);
        this.setState({ voteResponse: voteResponse?.data });
      }
      this.advanceSlideshow();
    } else if (getDevice(Store) !== 'desktop') {
      this.goToNextSlide();
    }
  }

  /**
   * TODO remove filter when BE adjust the new icons
   * Render method
   * @returns {JSX}
   */
  render() {
    const { voteResponse } = this.state;
    const {
      modifierClass, pollOptions, closedDate, slideId, webAppPollOptions,
    } = this.props;
    const isClosed = closedDate && new Date().getTime() >= new Date(closedDate).getTime();
    const reactionOptions = isValidArray(webAppPollOptions) ? webAppPollOptions : pollOptions;
    return (
      <div className={classnames(modifierClass)}>
        <div className={Styles.pollOptions}>
          {reactionOptions.map((pollOption) => {
            let isSelectedOption = false;
            const userVote = this.getUserVote();
            const localData = LocalStorage.getObject(this.storageKey);
            const iconName = getKey(pollOption, 'icon.name', '').toUpperCase();

            if (localData && voteResponse) {
              isSelectedOption = userVote === pollOption.internalName;
            }

            return (
              <button
                key={pollOption.uid}
                className={classnames(
                  {
                    [Styles.active]: userVote && isSelectedOption,
                    [Styles.inactive]: (userVote && !isSelectedOption) || !slideId,
                  },
                  Styles.pollOption
                )}
                style={
                  isSelectedOption
                    ? {
                      backgroundColor: '#000',
                    }
                    : {}
                }
                onClick={() => {
                  if (!userVote && (slideId && !userVote)) {
                    this.countVote(pollOption, userVote);
                    this.trackReaction(userVote);
                  }
                }}
                disabled={isClosed}
              >
                <Icon {...getKey(reactionIconMapping, iconName, {})} />
                {(userVote || isClosed)
                  && voteResponse && hasKey(voteResponse, `results.${pollOption.internalName}`)
                  && voteResponse?.results[pollOption.internalName].percent
                  && voteResponse?.results[pollOption.internalName].percent}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

Reaction.propTypes = {
  slideshowId: PropTypes.string.isRequired,
  slideId: PropTypes.string.isRequired,
  pollOptions: PropTypes.arrayOf(
    PropTypes.shape({
      internalName: PropTypes.string.isRequired,
      icon: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ),
  webAppPollOptions: PropTypes.arrayOf(
    PropTypes.shape({
      internalName: PropTypes.string.isRequired,
      icon: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ),
  autoSlideChangeTime: PropTypes.number.isRequired,
  goToNext: PropTypes.func.isRequired,
  modifierClass: PropTypes.string,
  closedDate: PropTypes.string,
};

export default Reaction;
