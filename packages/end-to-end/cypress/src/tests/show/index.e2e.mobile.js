describe('Show', () => {
  let settings;

  before(() => {
    cy.fixture('show').then((fixture) => {
      settings = fixture;
      cy.server();
      cy.registerAdRoute(settings.ads.mobile.topAd, 'topAd');
      cy.visit(settings.uri).then(() => {
        cy.scrollFullPage();
      });
    });
  });

  describe('Advertising', () => {
    it('should render a vertical ad', () => {
      cy.waitForRoute('topAd');
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
    describe('Show Layout', () => {
      it('should exist a widget lead', () => {
        cy.elementShouldExist(settings.selectors.widgetLead);
      });

      it('should exist a footer', () => {
        cy.elementShouldExist(settings.selectors.footer);
      });
    });

    describe('Shows Tabs', () => {
      it('should have a selected tab', () => {
        cy.get(settings.selectors.tablists)
          .eq(settings.data.defaultTabSelected)
          .should('have.css', 'content');
      });

      it('should exist a Long Form Video List', () => {
        cy.get(settings.selectors.tablists)
          .eq(settings.data.unselectedTab)
          .click();
        cy.elementShouldExist(settings.selectors.longFormVideoContent);
      });

      it('should have at least 1 video', () => {
        cy.get(settings.selectors.longFormVideoContent)
          .find(settings.selectors.longFormVideoList)
          .should('have.length.greaterThan', '1');
      });
    });
  });
});
