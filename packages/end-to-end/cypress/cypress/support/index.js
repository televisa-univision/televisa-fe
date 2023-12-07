// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-plugin-retries';

Cypress.on('window:before:load', (win) => {
  // Cypress can't intercept requests using the `fetch` API,
  // let's remove it and then the webapp will fallback to XHR (supported by cypress).
  // eslint-disable-next-line no-param-reassign
  win.fetch = null;
});

Cypress.on('uncaught:exception', () => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
