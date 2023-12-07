import React from 'react';
import PropTypes from 'prop-types';

import { getTwitterHandle } from '@univision/fe-commons/dist/utils/helpers';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';

import appConfig from '../../config/index';

import Button from '../Button';
import Styles from './TwitterFollow.scss';

/**
 * TwitterFollow button
 */
class TwitterFollow extends React.Component {
  /**
   * openFollowWindow opens a new window of 520x520 with twitter profile
   */
  openFollowWindow() {
    const { windowSize, twitterUrl } = this.props;
    const size = windowSize;
    /* eslint no-restricted-globals: ["error", { name: "error", message: "Use local
    parameter instead." }] */
    const left = screen.width / 2 - size / 2;
    const top = screen.height / 2 - size / 2;
    window.open(
      `${appConfig.twitter.follow}&screen_name=${getTwitterHandle(twitterUrl)}&tw_p=followbutton`,
      '_blank',
      `toolbar=no,
       location=no,
       directories=no,
       status=no,
       menubar=no,
       scrollbars=no,
       resizable=no,
       copyhistory=no,
       width=${size},
       height=${size},
       top=${top},
       left=${left}`
    );
  }

  /**
   * set button
   * @returns {jsx}
   */
  render() {
    const { buttonText } = this.props;
    return (
      <div>
        <Button plain className={Styles.twitterButton} onClick={() => this.openFollowWindow()}>
          <Icon name="twitterLegacy" size="xsmall" className={Styles.twitterIcon} fill={WHITE} />
          {' '}
          {buttonText}
        </Button>
      </div>
    );
  }
}

TwitterFollow.propTypes = {
  twitterUrl: PropTypes.string,
  windowSize: PropTypes.number,
  buttonText: PropTypes.string,
};

TwitterFollow.defaultProps = {
  twitterUrl: 'https://twitter.com/',
  windowSize: 400,
  buttonText: 'Follow',
};

export default TwitterFollow;
