import settings from '../../../cypress/fixtures/spa.json';
import { brandedHeaderMainLogo, globalNavLink } from '../../selectors';

describe('spa', () => {
  before(() => {
    cy.server();
    cy.registerAdRoute(settings.ads.desktop.topAd, 'topAd');
    cy.visit(settings.uri);
  });

  describe('hard nav', () => {
    describe('Advertising', () => {
      it.skip('should render a TOP_AD', () => {
        cy.waitForRoute('topAd');
      });
    });

    describe('Tracking', () => {
      it.skip('should populate the Data Layer', () => {
        cy.waitUntilDataInDataLayer(settings.tracking.dataLayer.desktop);
      });

      it('should track the page performance', () => {
        cy.waitUntilEventInDataLayer(
          ({ event }) => event === 'pageload_performance'
        );
      });

      it('should track ComsCore', () => {
        cy.waitUntilRequest(/scorecardresearch.*c1=2.*c2=14222911.*/i);
      });

      it.skip('should track Nielsen', () => {
        cy.waitUntilRequest(
          /imrworldwide.com\/conf\/PDB44FE12-8611-4D9B-8C88-18023F94B474/i
        );
      });
    });
  });

  describe('soft nav', () => {
    const { pages } = settings.data.spa;

    pages.forEach((page) => {
      describe.skip(`page transition ${page.label}`, () => {
        before(() => {
          cy.server();
          cy.registerRoute(
            new RegExp(`web-api/content.url=.*${page.uri}`),
            page.label
          );
          cy.registerRoute(new RegExp(page.ad.desktop), `${page.label}Ad`);

          if (page.uri === '/') {
            cy.get(brandedHeaderMainLogo).click({ force: true });
          } else {
            cy.get(globalNavLink)
              .eq(page.index.mobile)
              .click({ force: true });
          }
          // Time to load all the resources on SPA
          // cy.wait(3000);
        });

        it(`should have the ${page.label} uri`, () => {
          cy.url().should('include', `${page.uri}`);
        });

        it(`should check the title for ${page.label} page`, () => {
          cy.title().should('eq', page.title);
        });

        // TODO: robert will take a look at why dataLayer does not exist on
        // window in this test as per our conversation on 08/28/2019.
        // it(`should tracking ${page.label} page`, function() {
        //   cy.waitUntilDataInDataLayer(page.tracking);
        // });

        it(`should element exist on ${page.label} page`, () => {
          cy.elementShouldExist(page.selectors);
        });

        it(`should render ${page.label} ads`, () => {
          cy.waitForRoute(`${page.label}Ad`);
        });

        it(`should have a CMS request on ${page.label} page`, () => {
          cy.waitForRoute(page.label);
        });
      });
    });
  });
});
