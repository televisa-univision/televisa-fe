import {
  brandedHeader,
  breadcrumb,
  exposedNav,
  globalNav,
  shortTitle,
} from '../../selectors';

describe('Home Page Navigation', () => {
  before(function() {
    cy.fixture('trackingEvents').as('trackingEvents');
    cy.fixture('navigation')
      .as('settings')
      .then(() => {
        cy.visit(this.settings.contentPageUri);
      });
  });

  describe('User Interface', () => {
    it('should render the Branded Header', () => {
      cy.get(brandedHeader).should('exist');
    });

    it('should render the Global Nav', () => {
      cy.get(globalNav).should('exist');
    });

    it('should not render the Exposed Nav', () => {
      cy.get(exposedNav).should('not.exist');
    });

    it('should render the Short Title', () => {
      cy.get(shortTitle).should('exist');
    });

    it('should render the Breadcrumb', () => {
      cy.get(breadcrumb).should('exist');
    });
  });
});
