describe('Match Center Performance Page', () => {
  let settings;

  before(() => {
    cy.fixture('deportes/match_center_performance').then((fixture) => {
      settings = fixture;
      cy.server();
      cy.registerAdRoute(settings.ads.desktop.mid, 'midAd');
      cy.visit(settings.uri).then(() => {
        cy.scrollFullPage({ legacy: true });
      });
    });
  });

  describe('Advertising', () => {
    it('should render MID_AD inside list headlines', () => {
      cy.waitForRoute('midAd');
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

    it('should check that header is fixed when the user scrolls', () => {
      cy.window().then(win => win.scrollTo(0, 1000));
      cy.get(settings.selectors.MatchCenterStickyHeader)
        .parent()
        .should('have.css', 'position', 'fixed');
    });
  });
});
