import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import localization, { LocalizationManager } from './LocalizationManagerLegacy';

const localizations = {
  default: localization,
  extended: new LocalizationManager().extend({
    spanishData: {
      advertisement: 'Custom Translation',
      customKey: 'Extended Translation',
    },
  }),
};
const requestKeys = ['advertisement', 'by', 'callTheStation', 'clickHere', 'close'];

/**
 * Localization demo component
 * @param {Object} props the component props
 * @returns {JSX}
 */
const LocalizationDemo = ({ localizationType }) => {
  return (
    <div>
      <p>Translations using default translation data from commons</p>
      <table>
        <thead>
          <th style={{ paddingRight: '50px' }}>Requested</th>
          <th>Translation</th>
        </thead>
        <tbody>
          {requestKeys.map(key => (
            <tr key={key} style={{ borderBottom: '1px solid #e4e4e4' }}>
              <td>{key}</td>
              <td>{localizations[localizationType].get(key)}</td>
            </tr>
          ))}
          {localizationType === 'extended' && (
            <tr style={{ borderBottom: '1px solid #e4e4e4' }}>
              <td>customKey</td>
              <td>{localizations.extended.get('customKey')}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

LocalizationDemo.propTypes = {
  localizationType: PropTypes.string.isRequired,
};

const Stories = storiesOf('Helpers/LocalizationManager', module);
Stories.add(
  'With common translation data',
  withInfo('Gets default localization data')(() => (
    <LocalizationDemo localizationType="default" />
  ))
);
Stories.add(
  'With extended translation data',
  withInfo('Gets custom localization data')(() => (
    <LocalizationDemo localizationType="extended" />
  ))
);
