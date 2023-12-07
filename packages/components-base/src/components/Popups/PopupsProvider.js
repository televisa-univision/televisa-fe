import React from 'react';
import PropTypes from 'prop-types';

import Store from '@univision/fe-commons/dist/store/store';
import { asDeferrer } from '@univision/fe-commons/dist/utils/deferrer';
import { registerPopups } from '@univision/fe-commons/dist/store/actions/popups-actions';

import PopupsConnector from './PopupsConnector';

/**
 * Popup provider just to register the popups on the client with didMount
 */
@asDeferrer
class PopupWrapper extends React.PureComponent {
  state = { popupsReady: false }

  /**
   * Using didMount to register the popups only in the client
   */
  componentDidMount() {
    this.registerPopups();
  }

  /**
   * Helper to setup the state after registering the popups
   */
  registerPopups() {
    this.defer(() => {
      const { popups } = this.props;
      Store.dispatch(registerPopups(popups));
      this.setState({
        popupsReady: true,
      });
    });
  }

  /**
   * Main render function
   * @returns {JSX}
   */
  render() {
    const { popupsReady } = this.state;

    if (popupsReady) {
      return <PopupsConnector />;
    }

    return null;
  }
}

/**
 * PropTypes
 * @property {array} popups - List of popups registered
 * Array of objects like:
   `{
     id: 'myPopup',
     content: {...react component 'reference' to be displayed},
     onClose: (id) => {} function fired when is closed
     visible: false,
     // To allow closing the popup by clicking outside
     closeWithClick: true,
     useOverlay: true,
   }`
 */
PopupWrapper.propTypes = {
  popups: PropTypes.arrayOf(PropTypes.object),
};

export default PopupWrapper;
