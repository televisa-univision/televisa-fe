import 'cypress-wait-until';
import '@testing-library/cypress/add-commands';
import ampValidator from 'amphtml-validator';

import { brandedHeader, smartBannerCloseButton } from '../../src/selectors';

/**
 * Helper to determine if array is valid and not valid
 * @param {array} array to be checked
 * @returns {boolean}
 */
function isValidArray(array) {
  return Array.isArray(array) && array.length > 0;
}

/**
 * Helper to determine if object is valid and not valid
 * @param {Object} obj object to be checked
 * @returns {boolean}
 */
function isValidObject(obj) {
  return obj && typeof obj === 'object' && Object.keys(obj).length > 0;
}

/**
 * Determines if passed value is a stirng.
 * @param {any} maybeString - value that needs to be validated
 * @returns {boolean} - returns true if value is a string, false otherwise
 */
function isValidString (maybeString) {
  return typeof maybeString === 'string';
}

/**
 * Retry function over the window object
 * @param {Function} fn - callback result
 * @param {Object} options - options
 * @returns {Function}
 */
function upcomingAssertion(fn, options) {
  const defaultOptions = { timeout: 20000, ...options };
  let retries = 0;

  /**
   * retry
   * @returns {Object}
  */
  const retry = () => cy.window().then(($window) => {
    const result = fn.call($window);
    return cy.verifyUpcomingAssertions(result, defaultOptions, {
      onRetry: retry,
      // eslint-disable-next-line no-plusplus
      onFail: () => cy.log(`retries ${++retries}`),
    });
  });

  return retry();
}

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('waitUntilDataInDataLayer', (expected) => {
  upcomingAssertion(function() {
    return this.dataLayer[0];
  }).should('deep.include', expected);
});

Cypress.Commands.add('waitUntilEventInDataLayer', (fn, options = null) => {
  upcomingAssertion(function() {
    return !!this.dataLayer.find(fn);
  }, options).should('true');
});

Cypress.Commands.add('hasRequest', (regex) => {
  return cy.window()
    .its('performance')
    .then(performance => !!performance.getEntries().find(({ name }) => regex.test(name)));
});

Cypress.Commands.add('waitUntilRequest', (regex, options) => {
  upcomingAssertion(function() {
    return !!this.performance
      .getEntriesByType('resource').find(({ name }) => regex.test(name));
  }, options).should('true');
});

Cypress.Commands.add('waitUntilAdRequest', (prevScp, param = 'prev_scp', options) => {
  return cy.waitUntilRequest(new RegExp(`gampad.*${param}=.*${encodeURIComponent(prevScp)}.*`),
    options);
});

Cypress.Commands.add('scrollFullPage', ({ duration = 3000, legacy = false } = {}) => {
  cy.window().then(win => win.scrollTo(0, 999999));
  const headerSelector = legacy
    ? '[data-element-name="GlobalNav"]:first'
    : `${brandedHeader}:first`;
  cy.get(headerSelector).scrollIntoView({ duration });
  cy.get('footer:last').scrollIntoView({ duration: 3000 });
});

Cypress.Commands.add('loadWidgets', (duration = 3000) => {
  const selector = '.uvs-container:first > div > div';
  const { length } = Cypress.$(selector);
  if (length) {
    for (let i = 0; i < length; i += 1) {
      cy.get(`${selector}:nth(${i})`)
        .scrollIntoView({ duration });
    }
  }
});

Cypress.Commands.add('getRequestsByFilter', (fn) => {
  return cy.window()
    .its('performance')
    .then(performance => performance.getEntries().filter(fn));
});

Cypress.Commands.add('elementShouldExist', (elements) => {
  if (!elements) {
    throw new Error('A valid element is required');
  }

  const isString = isValidString(elements);

  if (isString) {
    cy.get(elements).should('exist');
    return;
  }

  const checkElements = isValidObject(elements)
    ? Object.values(elements)
    : elements;

  const isArray = isValidArray(checkElements);

  if (isArray) {
    checkElements.forEach((element) => {
      cy.get(element).should('exist');
    });

    return;
  }

  throw new Error('Elements is not a valid string, object or array');
});

Cypress.Commands.add('requestInstance', (defaultOptions) => {
  return {
    get: (options) => {
      let retries = 0;
      const internalOptions = {
        failOnStatusCode: false,
        timeout: 20000,
        ...defaultOptions,
        ...options,
      };
      /**
       * DmakeRequest
       * @returns {Promise} - return a promise
      */
      const makeRequest = () => cy.request(internalOptions)
        .then(res => cy.verifyUpcomingAssertions(res, internalOptions, {
          onRetry: makeRequest,
          // eslint-disable-next-line no-plusplus
          onFail: () => cy.log(`retries ${++retries}`),
        }));

      return makeRequest();
    },
  };
});

Cypress.Commands.add('validateAmpPage', (pageUrl, callback) => {
  cy.request('https://cdn.ampproject.org/v0/validator.js')
    .its('body')
    .then((ampJs) => {
      cy.request(pageUrl)
        .its('body')
        .then((html) => {
          const result = ampValidator.newInstance(ampJs).validateString(html);
          callback(result.status);
        });
    });
});

Cypress.Commands.add('registerAdRoute', (param, routeName) => {
  const url = new RegExp(`securepubads\\.g\\.doubleclick\\.net\\/gampad\\/ads\\?(.)*?(${param})`);
  return cy.registerRoute(url, routeName);
});

Cypress.Commands.add('registerRoute', (url, routeName) => {
  return cy.route({
    url,
    onResponse() {
      cy.routes = cy.routes || {};
      cy.routes[routeName] = true;
    },
  }).as(routeName);
});

Cypress.Commands.add('waitForRoute', (routeName, options = {}) => {
  return cy.waitUntil(() => !!(cy.routes && cy.routes[routeName]), options);
});

/**
 * Useful for when we want to scroll until a specific element appears on the page. Maybe the
 * component we are looking for is lazy loaded and will not be in the DOM until we scroll to a
 * certain point. Knowing this point in advance is virtually impossible. This helper helps us in
 * that scenario. The check function must return true when we wish to stop scrolling.
 * @param {Object} options available configuration for the command.
 * @param {Function} options.checkFn function that must return true when the scrolling should stop,
 * and false otherwise.
 * @param {number} options.step the amount of pixels to scroll by on each step.
 * @param {number} options.timeout the amount of time we want to wait until we fail the test.
 * @param {number} options.waitPerStep the amount of time we want to wait before scrolling again.
 * @returns {Promise} - return a promise
 */
const scrollUntil = ({
  checkFn = () => true,
  step = 500,
  timeout = 20000,
  waitPerStep = 0,
}) => {
  let scrollTo;

  cy.window()
    .then(($window) => {
      scrollTo = $window.scrollY + step;
    });

  return cy.waitUntil(() => {
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.scrollTo(0, scrollTo).wait(waitPerStep);
    scrollTo += step;
    return checkFn();
  }, { timeout });
};

Cypress.Commands.add('scrollUntil', scrollUntil);

Cypress.Commands.add('closeSmartBanner', () => {
  return cy.get('body').then(($body) => {
    const $smartBannerCloseButton = $body.find(smartBannerCloseButton);

    if ($smartBannerCloseButton) {
      cy.wrap($smartBannerCloseButton).click();
    }
  });
});

Cypress.Commands.add('mapRequest', ({ url, alias }) => {
  return cy.route({
    method: 'GET',
    url,
    onResponse(xhr) {
      // eslint-disable-next-line no-param-reassign
      xhr.alias = alias;
    },
  }).as(alias);
});

Cypress.Commands.add('markRequest', function({ alias }) {
  return cy.wait(`@${alias}`, { timeout: 20000 })
    // eslint-disable-next-line no-return-assign
    .then(xhr => this[xhr.alias].result = xhr.status);
});
