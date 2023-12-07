describe('Error', () => {
  let settings;

  before(() => {
    cy.fixture('error').then((fixture) => {
      settings = fixture;
      cy.visit(settings.uri, {
        failOnStatusCode: false,
      }).then(() => {
        cy.scrollFullPage();
      });
    });
  });

  describe('Tracking', () => {
    it.skip('should populate the Data Layer', () => {
      cy.waitUntilDataInDataLayer(settings.tracking.dataLayer);
    });

    it('should track the page performance', () => {
      cy.waitUntilEventInDataLayer(({ event }) => event === 'pageload_performance');
    });

    it('should track ComsCore', () => {
      cy.waitUntilRequest(/scorecardresearch.*c1=2.*c2=14222911.*/i);
    });
  });

  describe('User Interface', () => {
    describe('Error Request', () => {
      it('should request /status-404-error API', () => {
        cy.waitUntilRequest(/status-404-error/);
      });
    });

    describe('Error Layout', () => {
      it('should exist a widget lead', () => {
        cy.elementShouldExist(settings.selectors.widgetLead);
      });

      it('should exist a footer', () => {
        cy.elementShouldExist(settings.selectors.footer);
      });
    });
  });
});
