describe('LiveBlog', () => {
  let settings;

  before(() => {
    cy.fixture('liveBlog').then((fixture) => {
      settings = fixture;
      cy.server();
      cy.registerAdRoute(settings.ads.desktop.topAd, 'topAd');
      cy.visit(settings.uri, {
        failOnStatusCode: false,
      });
    });
  });

  context('ContentType context', () => {
    describe('Advertising', () => {
      it.skip('should render a TOP_AD bellow the widget lead.', () => {
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

      it('should track ComsCore', () => {
        cy.waitUntilRequest(/scorecardresearch.*c1=2.*c2=14222911.*/i);
      });

      it.skip('should track Nielsen', () => {
        cy.waitUntilRequest(/imrworldwide.com\/conf\/PDB44FE12-8611-4D9B-8C88-18023F94B474/i);
      });
    });

    describe('User Interface', () => {
      describe('LiveBlog', () => {
        it('should exist a LiveBlog opening', () => {
          cy.get(settings.selectors.opening)
            .should('exist');
        });

        it('should exist a LiveBlog feed', () => {
          cy.get(settings.selectors.feed)
            .should('exist');
        });

        it('should exist a LiveBlog pagination', () => {
          cy.get(settings.selectors.pagination)
            .should('exist');
        });

        it('should have a new request after clicks to go to next page', () => {
          cy.server();
          cy.route({ url: new RegExp(/web-api\/content\?url.*\/.*&pageNumber=2/) })
            .as('paginationRequest');
          // eslint-disable-next-line cypress/unsafe-to-chain-command
          cy.get(settings.selectors.nextPage)
            .scrollIntoView({ duration: 2000 })
            .click({ force: true });
            cy.wait('@paginationRequest').then(function() {
              expect(this.paginationRequest.status).to.eq(200);
            });
        });
      });
    });
  });
});
