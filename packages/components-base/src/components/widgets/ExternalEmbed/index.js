import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Store from '@univision/fe-commons/dist/store/store';
import { getAdSettings, getTracking } from '@univision/fe-commons/dist/store/storeHelpers';
import { hasKey } from '@univision/fe-commons/dist/utils/helpers';

import GatsbyInjector from '../GatsbyInjector';
import FullWidth from '../../FullWidth';
import Styles from './ExternalEmbed.scss';

/**
 * Renders the HTML in settings.html using the React dangerouslySetInnerHTML
 * @param {Object} settings Widget settings
 * @returns {JSX}
 * @constructor
 */
const ExternalEmbed = ({ settings }) => {
  let externalEmbed = null;
  if (hasKey(settings, 'html')) {
    const newlazyLoadUrl = `${settings.lazyLoadUrl}&adSettings=${encodeURI(JSON.stringify(getAdSettings(Store)))}&tracking=${encodeURI(JSON.stringify(getTracking(Store)))}`;
    externalEmbed = (
      <FullWidth className={classnames('uvs-widget', Styles.widgetContainer)} breakpoints={['xxs', 'xs', 'sm', 'md', 'lg', 'xl']}>
        <GatsbyInjector minHeight={settings.minHeight || '100px'} params={newlazyLoadUrl.replace('https://static.univision.com/external-content/embed.js?', '')} />
      </FullWidth>
    );
  }
  return externalEmbed;
};

ExternalEmbed.propTypes = {
  settings: PropTypes.object.isRequired,
};

export default ExternalEmbed;
