let settings;
describe('Section', () => {
  before(() => {
    cy.fixture('section').then((fixture) => {
      settings = fixture;
      cy.server();
      cy.registerAdRoute(settings.ads.mobile.top, 'topAd');
      cy.visit(settings.uri).then(() => {
        cy.loadWidgets();
      });
    });
  });

  describe('Advertising', () => {
    it('should render a TOP_AD bellow the widget lead.', () => {
      cy.waitForRoute('topAd');
    });
  });

  describe('Tracking', () => {
    it.skip('should populate the Data Layer', () => {
      cy.waitUntilDataInDataLayer(settings.tracking.dataLayer.mobile);
    });

    it('should track the page performance', () => {
      cy.waitUntilEventInDataLayer(({ event }) => event === 'pageload_performance');
    });

    it.skip('should track the scrolling', () => {
      /* eslint-disable camelcase */
      cy.waitUntilEventInDataLayer(({ user_action }) => user_action === 'section_25_percent')
        .waitUntilEventInDataLayer(({ user_action }) => user_action === 'section_50_percent')
        .waitUntilEventInDataLayer(({ user_action }) => user_action === 'section_75_percent')
        .waitUntilEventInDataLayer(({ user_action }) => user_action === 'section_100_percent');
      /* eslint-enable camelcase */
    });

    it('should track ComsCore', () => {
      cy.waitUntilRequest(/scorecardresearch.*c1=2.*c2=14222911.*/i);
    });

    it.skip('should track Nielsen', () => {
      cy.waitUntilRequest(/imrworldwide.com\/conf\/PDB44FE12-8611-4D9B-8C88-18023F94B474/i);
    });
  });

  describe('User Interface', () => {
    describe('Layout', () => {
      it.skip('should have a white footer', () => {
        cy.get(settings.selectors.footer).should('have.css', 'background-color', 'rgb(255, 255, 255)');
      });
    });
    describe('Widgets', () => {
      it('Has a lead widget', () => {
        cy.window().then(win => win.scrollTo(0, 0));
        cy.get(settings.selectors.widgetLead).should('have.length.of.at.least', 1);
      });
    });
  });
});
