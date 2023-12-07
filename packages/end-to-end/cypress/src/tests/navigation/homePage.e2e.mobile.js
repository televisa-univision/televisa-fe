import {
  brandedHeader,
  breadcrumb,
  exposedNav,
  globalNav,
  globalNavLink,
  shortTitle,
} from '../../selectors';

describe('Home Page Navigation', () => {
  before(function() {
    cy.fixture('trackingEvents').as('trackingEvents');
    cy.fixture('navigation')
      .as('settings')
      .then(() => {
        cy.visit(this.settings.homePageUri);
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

    it('should not render the Short Title', () => {
      cy.get(shortTitle).should('not.exist');
    });

    it('should not render the Breadcrumb', () => {
      cy.get(breadcrumb).should('not.exist');
    });
  });

  describe('Tracking', () => {
    describe('Global Nav', () => {
      it('should track clicks on all section links', function() {
        cy.wrap(
          [...Array(5).keys()].forEach((index) => {
            cy.get(globalNavLink)
              .eq(index)
              .trigger('click');
          })
        ).then(() => {
          [
            'topnav-tv shows',
            'topnav-noticias',
            'topnav-famosos',
            'topnav-deportes',
            'topnav-radio',
          ].forEach(eventAction => cy.waitUntilEventInDataLayer(({ event, eventAct }) => {
              return (
                event === this.trackingEvents.navigationClick
                && eventAct === eventAction
              );
            }));
        });
      });
    });
  });
});
