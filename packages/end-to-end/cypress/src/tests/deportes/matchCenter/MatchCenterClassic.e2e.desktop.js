describe('Match Center Classic Page', () => {
  let settings;

  before(() => {
    cy.fixture('deportes/match_center_classic').then((fixture) => {
      settings = fixture;
      cy.server();
      cy.registerAdRoute(settings.ads.desktop.top, 'topAd');
      cy.visit(settings.uri).then(() => {
        cy.scrollFullPage({ legacy: true });
      });
    });
  });

  describe('Advertising', () => {
    it.skip('should render a TOP_AD bellow the widget lead.', () => {
      cy.get(settings.selectors.topAd).scrollIntoView();
      cy.waitForRoute('topAd');
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
    it.skip('should check that page widgets are present', () => {
      cy.elementShouldExist(settings.selectors);
    });
  });
});
