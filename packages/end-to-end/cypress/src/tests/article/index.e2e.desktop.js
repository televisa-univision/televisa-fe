/* eslint-disable cypress/unsafe-to-chain-command */
describe('Article', () => {
  let settings;
  const duration = 1000;

  before(() => {
    cy.fixture('article')
      .then((fixture) => {
        settings = fixture;
        cy.server();
        cy.registerAdRoute(settings.ads.desktop.topAd, 'topAd');
        cy.visit(settings.uri, {
          failOnStatusCode: false,
        });
      });
  });

  describe('Advertising', () => {
    it('should render a inline_teads in main article', () => {
      cy.get(settings.selectors.topAd).scrollIntoView();
      cy.waitForRoute('topAd');
    });
  });

  describe('Tracking', () => {
    it('should populate the Data Layer', () => {
      cy.waitUntilDataInDataLayer(settings.tracking.dataLayer.desktop);
    });

    it('should track the page performance', () => {
      cy.waitUntilEventInDataLayer(({ event }) => event === 'pageload_performance');
    });

    it.skip('should track the scrolling', () => {
      /* eslint-disable camelcase */
      // eslint-disable-next-line cypress/unsafe-to-chain-command
      cy.get(settings.selectors.main)
        .eq(0)
        .find(settings.selectors.bottom)
        .scrollIntoView({ duration })
        .waitUntilEventInDataLayer(({ user_action }) => user_action === 'article_50_percent')
        .waitUntilEventInDataLayer(({ user_action }) => user_action === 'article_complete');
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
    describe('Enhancement Layout', () => {
      it('Has a mean article', () => {
        cy.window()
          .then(win => win.scrollTo(0, 0));
        cy.get(settings.selectors.mainArticle)
          .should('have.length.of.at.least', 1);
      });
    });

    describe('Infinity Scroll', () => {
      it('should load three articles', () => {
        [...Array(3)
          .keys()].forEach((index) => {
            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.get(settings.selectors.main)
              .eq(index)
              .as('current')
              .find(settings.selectors.bottom)
              .scrollIntoView({ offset: { top: 50 } })
              .wait(1000)
              .should('exist')
              .waitUntil(() => cy.get('@current').next());
        });
      });

      it('should have at least three articles', () => {
        cy.get(settings.selectors.main)
          .should('to.have.length.greaterThan', 2);
      });

      it('should go to the first article', () => {
        // eslint-disable-next-line cypress/unsafe-to-chain-command
        cy.get(settings.selectors.main)
          .eq(0)
          .scrollIntoView({ duration })
          .should('exist');
      });

      it('should change the url when the scroll goes to the second article', () => {
        cy.scrollTo(0, 0);
        cy.url().then((url) => {
          cy.get(settings.selectors.main)
            .eq(1)
            .scrollIntoView({ duration, offset: { top: 100 } });
          cy.url().should('not.eq', url);
        });
      });
    });
  });
});
