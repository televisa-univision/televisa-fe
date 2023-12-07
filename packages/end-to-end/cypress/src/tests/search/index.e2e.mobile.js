import { hamburgerMenuButton, megaMenuSearchFrom } from '../../selectors';

describe('Search', () => {
  let settings;
  const duration = 2000;

  before(() => {
    cy.fixture('search').then((fixture) => {
      settings = fixture;
      cy.visit(fixture.uri, {
        failOnStatusCode: false,
      });
    });
  });

  describe('User Interface', () => {
    describe('Search Layout', () => {
      it('should go to the search page with `mexico` query', () => {
        cy.get(hamburgerMenuButton).click();
        cy.get(megaMenuSearchFrom).find('input').type('mexico');
        cy.get(megaMenuSearchFrom).submit();
        cy.url().should('contains', '/search?q=mexico');
      });

      it('should render a hidden search container', () => {
        cy.get(settings.selectors.searchPageContainer).should('exist');
      });

      it('should exist a search paginator', () => {
        const { selectors } = settings;
        cy.get(selectors.searchPageContainer)
          .find(selectors.searchPagePagination)
          .should('exist');
      });

      it('should exist a footer', () => {
        cy.get(settings.selectors.footer).should('exist');
      });
    });

    describe('Search Result', () => {
      it('should have at least 1 result', () => {
        const { selectors } = settings;
        cy.get(selectors.searchPageContainer)
          .find(selectors.searchPageResult)
          .should('to.have.length.greaterThan', 1);
      });

      it('should go to next page', () => {
        const { selectors } = settings;
        cy.server();
        cy.route(/web-api\/search/).as('paginationRequest');
        // eslint-disable-next-line cypress/unsafe-to-chain-command
        cy.get(selectors.searchPageContainer)
          .find(selectors.searchPagePaginationNext)
          .scrollIntoView({ duration })
          .click();
        cy.wait('@paginationRequest');
      });
    });
  });

  describe('Tracking', () => {
    it('should populate the Data Layer', () => {
      cy.waitUntilDataInDataLayer(settings.tracking.dataLayer);
    });

    it('should track the page performance', () => {
      cy.waitUntilEventInDataLayer(
        ({ event }) => event === 'pageload_performance'
      );
    });

    it('should track the page change', () => {
      cy.waitUntilEventInDataLayer(({ event }) => event === 'engagement');
    });

    it('should track the user search', () => {
      cy.waitUntilEventInDataLayer(({ event }) => event === 'user search');
    });

    it('should track ComsCore', () => {
      cy.waitUntilRequest(/scorecardresearch.*c1=2.*c2=14222911.*/i);
    });

    it.skip('should track Nielsen', () => {
      cy.waitUntilRequest(/imrworldwide.com\/conf\/PDB44FE12-8611-4D9B-8C88-18023F94B474/i);
    });
  });
});
