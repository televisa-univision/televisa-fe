describe('Deportes Team - Plantel Page', () => {
  let settings;

  before(() => {
    cy.task('fixture', 'deportes/team').then((fixture) => {
      settings = fixture.plantel;
      cy.server();
      cy.registerAdRoute(settings.ads.mobile.top, 'topAd1');
      cy.registerAdRoute(settings.ads.mobile.top1, 'topAd2');
      cy.registerAdRoute(settings.ads.mobile.mid, 'midAd');
      cy.registerAdRoute(settings.ads.mobile.bottom, 'bottomAd');
      cy.visit(settings.uri).then(() => {
        cy.loadWidgets();
      });
    });
  });

  describe('Advertising', () => {
    it('should render a TOP_AD before to the team squad.', () => {
      cy.waitForRoute('topAd1');
    });

    it('should render a TOP_AD in the five items widget', () => {
      cy.waitForRoute('topAd2');
    });

    it('should render a MID_AD after the five items widget', () => {
      cy.waitForRoute('midAd');
    });

    it('should render BOTTOM_AD at the headlines widget', () => {
      cy.waitForRoute('bottomAd');
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
