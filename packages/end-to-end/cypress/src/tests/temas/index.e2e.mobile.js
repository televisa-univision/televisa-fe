let settings;
describe('Temas', () => {
  before(() => {
    cy.fixture('temas').then((fixture) => {
      settings = fixture;
      cy.server();
      cy.registerAdRoute(settings.ads.mobile.top, 'topAd');
      cy.visit(settings.uri).then(() => {
        cy.loadWidgets();
      });
    });
  });

  describe('Advertising', () => {
    it('should render a TOP_AD.', () => {
      cy.waitForRoute('topAd');
    });

    it('should render 3 ads on the page.', () => {
      cy.get(settings.selectors.adReady).should('have.length', 3);
    });
  });

  describe('Tracking', () => {
    it('should populate the Data Layer', () => {
      cy.waitUntilDataInDataLayer(settings.tracking.dataLayer.mobile);
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
    describe('Widgets', () => {
      it('Has a BioCard widget', () => {
        // eslint-disable-next-line cypress/unsafe-to-chain-command
        cy.get(settings.selectors.BioCard).scrollIntoView().should('exist');
      });
    });
  });
});
