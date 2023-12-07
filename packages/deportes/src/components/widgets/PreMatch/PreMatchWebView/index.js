import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import preMatchExtractor from '@univision/shared-components/dist/extractors/preMatchExtractor';

import SportApiProvider from '../../../utils/SportApiProvider';
import Styles from './PreMatchWebView.scss';
import PreMatchLayout from '../PreMatchLayout';

/**
 * A Widget displaying PreMatch for web view
 */
class PreMatchWebView extends Component {
  /**
   * Setup the state
   *  @param {Object} props for this component
   */
  state = { visible: false };

  /**
   * Update component to show when is mounted
   */
  componentDidMount() {
    this.setVisible();
  }

  /**
   * Toggle opacity
   */
  setVisible() {
    this.setState({
      visible: true,
    });
  }

  /**
   * Callback after fetch api
   * @param {Object} data from api
   * @returns {JSX}
   */
  renderPreMatch = (data) => {
    const { match, previous, scorers } = this.props;
    const preMatch = preMatchExtractor(data);
    return (
      <PreMatchLayout
        {...preMatch}
        matchCard={match === 'true'}
        previousCard={previous === 'true'}
        scorersCard={scorers === 'true'}
      />
    );
  };

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const { eventId } = this.props;
    const { visible } = this.state;
    if (eventId) {
      return (
        <div className={classnames('uvs-widget', { [Styles.invisible]: !visible })}>
          <SportApiProvider
            path={`/v1/schedule-results/soccer/${eventId}`}
            render={this.renderPreMatch}
          />
        </div>
      );
    }
    return null;
  }
}

/**
 * propTypes
 * @property {string} eventID -  the event id
 * @property {string} partido -  to show partido card
 * @property {string} previous - to show previous encounters card
 * @property {string} scorers -  to show scorers card
 */
PreMatchWebView.propTypes = {
  eventId: PropTypes.string,
  match: PropTypes.string,
  previous: PropTypes.string,
  scorers: PropTypes.string,
};

PreMatchWebView.defaultProps = {
  match: 'false',
  previous: 'false',
  scorers: 'false',
};
export default PreMatchWebView;
