describe('Locales', () => {
  let settings;

  before(() => {
    cy.fixture('locales').then((fixture) => {
      settings = fixture;
      cy.server();
      cy.registerAdRoute(settings.ads.desktop.top, 'topAd');
      cy.registerAdRoute(settings.ads.desktop.mid1, 'midAd1');
      cy.registerAdRoute(settings.ads.desktop.mid2, 'midAd2');
      cy.visit(settings.uri).then(() => {
        cy.loadWidgets();
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
    it('should populate the Data Layer', () => {
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
    beforeEach(() => {
      cy.window().then(win => win.scrollTo(0, 0));
    });

    describe('Widgets', () => {
      it('should have widgets', () => {
        cy.get(settings.selectors.widgets).its('length').should('be.gte', 7);
      });
    });
  });
});
