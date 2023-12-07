import React from 'react';

import SoccerLiveEvent from '@univision/shared-components/dist/components/v2/SoccerLiveEvent';
import { getUniqKey, locationRedirect } from '@univision/fe-commons/dist/utils/helpers';
import Store from '@univision/fe-commons/dist/store/store';
import features from '@univision/fe-commons/dist/config/features';
import { deviceSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';

import { getTudnUrl, renamePrendeChannelToVix } from '../../../../utils/helpers';

/**
 * Handler on event click to redirect with SPA support
 * @param {Object} event - native JS event
 * @access private
 */
function eventClickHandler(event) {
  const { currentTarget } = event;
  const href = currentTarget && currentTarget.getAttribute('href');
  const uri = getTudnUrl(href);

  event.preventDefault();
  locationRedirect(uri)();
}

/**
 * Render live events
 * @param {Object} props - component props
 * @param {Object[]} props.events - soccer match events
 * @returns {JSX}
 */
const SoccerLiveEvents = ({ events = [] }) => {
  const isMobile = deviceSelector(Store.getState()) === 'mobile';
  const isVixEnabled = features.widgets.isVixEnabled();

  return events.map((event) => {
    const { url, channels, ...soccerEventProps } = event;
    const link = { href: url, target: '_self' };
    return (
      <div key={getUniqKey('soccer-live-')}>
        <SoccerLiveEvent
          {...soccerEventProps}
          channels={renamePrendeChannelToVix(channels, isVixEnabled)}
          link={link}
          size={isMobile ? 'small' : 'medium'}
          onPress={eventClickHandler}
          isTudn
        />
      </div>
    );
  });
};

export default SoccerLiveEvents;
