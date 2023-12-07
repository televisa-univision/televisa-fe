import {
  brandedHeader,
  breadcrumb,
  exposedNav,
  exposedNavLink,
  globalNav,
  shortTitle,
} from '../../selectors';

describe('Home Page Navigation', () => {
  before(function() {
    cy.fixture('trackingEvents').as('trackingEvents');
    cy.fixture('navigation')
      .as('settings')
      .then(() => {
        cy.visit(this.settings.sectionPageUri);
      });
  });

  describe('User Interface', () => {
    it('should render the Branded Header', () => {
      cy.get(brandedHeader).should('exist');
    });

    it('should render the Global Nav', () => {
      cy.get(globalNav).should('exist');
    });

    it('should render the Exposed Nav', () => {
      cy.get(exposedNav).should('exist');
    });

    it('should not render the Short Title', () => {
      cy.get(shortTitle).should('not.exist');
    });

    it('should not render the Breadcrumb', () => {
      cy.get(breadcrumb).should('not.exist');
    });
  });

  describe('Tracking', () => {
    describe('Exposed Nav', () => {
      it.skip('should track clicks on secondary links', function() {
        cy.wrap(
          [...Array(7).keys()].forEach((index) => {
            cy.get(exposedNavLink)
              .eq(index)
              .trigger('click');
          })
        ).then(() => {
          [
            'subnav-inmigracion',
            'subnav-estados unidos',
            'subnav-mexico',
            'subnav-politica',
            'subnav-america latina',
            'subnav-salud',
            'subnav-video',
          ].forEach(eventName => cy.waitUntilEventInDataLayer(({ event, eventAction }) => {
              return (
                event === this.trackingEvents.navigationClick
                && eventAction === eventName
              );
            }));
        });
      });
    });
  });
});
