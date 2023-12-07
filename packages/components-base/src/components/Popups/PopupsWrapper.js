import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { isValidArray, isValidFunction } from '@univision/fe-commons/dist/utils/helpers';
import { closePopup } from '@univision/fe-commons/dist/store/actions/popups-actions';

import Overlay from './Overlay';

/**
 * Callback utility to update store when close popup
 * @param {string} id - ID for specific popoup to
 * @param {function} dispatch - Dispatch method to allow trigger actions
 * @param {function} onClose - Fire callback when popup is closed
 */
export const closeCallback = (id, dispatch, onClose) => {
  if (!isValidFunction(dispatch)) {
    return;
  }
  dispatch(closePopup(id));
  if (isValidFunction(onClose)) {
    onClose(id);
  }
};

/**
 * Popup wrapper to allow rendering multiple instance of popups
 * encapsulating overlay and close functionalities
 * @parame {Object} props - Component properties
 * @params {array} props.popups - List of popups registered
 * @params {function} props.dispatch - Dispatch method to allow trigger actions
 * @returns {JSX|null}
 */
const PopupsWrapper = ({ popups, dispatch }) => {
  if (isValidArray(popups)) {
    return popups.map((popup) => {
      /**
       * Callback to bind the close event
       * @returns {undefined}
       */
      const closeCallbackBind = () => closeCallback(popup.id, dispatch, popup.onClose);
      return popup.visible && popup.content ? (
        <Fragment key={popup.id}>
          {popup.useOverlay && (
            <Overlay close={popup.closeWithClick ? closeCallbackBind : null} />
          )}
          <popup.content key={popup.id} {...popup.props} close={closeCallbackBind} />
        </Fragment>
      ) : null;
    });
  }
  return null;
};

PopupsWrapper.propTypes = {
  popups: PropTypes.array,
  dispatch: PropTypes.func,
};

export default PopupsWrapper;
