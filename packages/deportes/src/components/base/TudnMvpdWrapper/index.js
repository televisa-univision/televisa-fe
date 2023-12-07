import React from 'react';

import PopupsProvider from '@univision/fe-components-base/dist/components/Popups/PopupsProvider';

import { TUDN_MVPD_POPUP, TUDN_MVPD_POPUP_FORM } from '../../../constants';
import MvpdScreen from './MvpdScreen';
import FormScreen from './FormScreen';

/**
 * Tudn Mvpd Popup wrapper
 * @access public
 * @param {Object} props - Component props
 * @extends {React.Component}
 * @returns {JSX}
 */
const TudnMvpdWrapper = (props) => {
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <PopupsProvider
      popups={[
        {
          id: TUDN_MVPD_POPUP,
          visible: false,
          useOverlay: true,
          closeWithClick: true,
          content: MvpdScreen,
          props,
        },
        {
          id: TUDN_MVPD_POPUP_FORM,
          visible: false,
          useOverlay: true,
          closeWithClick: true,
          content: FormScreen,
          props,
        },
      ]}
    />
  );
};

export default TudnMvpdWrapper;
