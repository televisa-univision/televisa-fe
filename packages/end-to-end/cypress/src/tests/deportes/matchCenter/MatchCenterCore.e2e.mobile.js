describe('Match Center Core Page', () => {
  let settings;

  before(() => {
    cy.fixture('deportes/match_center_core').then((fixture) => {
      settings = fixture;
      cy.server();
      cy.registerAdRoute(settings.ads.mobile.midAd, 'midAd');
      cy.visit(settings.uri).then(() => {
        cy.scrollFullPage({ legacy: true });
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

    it.skip('should track Nielsen', () => {
      cy.waitUntilRequest(/imrworldwide.com\/conf\/PDB44FE12-8611-4D9B-8C88-18023F94B474/i);
    });
  });

  describe('User Interface', () => {
    it('should check that page widgets are present', () => {
      cy.elementShouldExist(settings.selectors);
    });
  });
});
